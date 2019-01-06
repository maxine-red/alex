/*
 *  Copyright 2018 Maxine Michalski <maxine@furfind.net>
 *
 *  This file is part of Alex.
 *
 *  Alex is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Alex is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Alex.  If not, see <http://www.gnu.org/licenses/>.
 */
#include <node_api.h>
#include "../include/matrix.hpp"

class MatrixWrapper {
	public:
		static napi_value Init(napi_env env, napi_value exports);
		static void Destructor(napi_env env, void *nativeObject, void *finalize_hint);
	private:
		explicit MatrixWrapper(unsigned int r, unsigned int c);
		~MatrixWrapper();

		static napi_value New(napi_env env, napi_callback_info info);
		static napi_value Randomize(napi_env env, napi_callback_info info);
		static napi_value GetRows(napi_env env, napi_callback_info info);
		static napi_value GetCols(napi_env env, napi_callback_info info);
		static napi_value GetValue(napi_env env, napi_callback_info info);
		static napi_value SetValue(napi_env env, napi_callback_info info);
		static napi_value Update(napi_env env, napi_callback_info info);
		static napi_ref constructor;
		Matrix *mat;
		napi_env env_;
		napi_ref wrapper_;
};

napi_ref MatrixWrapper::constructor;

MatrixWrapper::MatrixWrapper(unsigned int r, unsigned int c)
	: mat(new Matrix(r,c)), env_(nullptr), wrapper_(nullptr) {}

MatrixWrapper::~MatrixWrapper() {
	napi_delete_reference(env_, wrapper_);
}

void MatrixWrapper::Destructor(napi_env env, void* nativeObject,
	   	void* /*finalize_hit*/) {
	reinterpret_cast<MatrixWrapper*>(nativeObject)->~MatrixWrapper();
}

napi_value MatrixWrapper::Init(napi_env env, napi_value exports) {
	napi_status status;
	napi_value class_proto;
	napi_property_descriptor props[] = {
		{ "rows", 0, GetRows, 0, 0, 0, napi_default, 0 },
		{ "columns", 0, GetCols, 0, 0, 0, napi_default, 0 },
		{ "randomize", 0, Randomize, 0, 0, 0, napi_default, 0 },
		{ "get", 0, GetValue, 0, 0, 0, napi_default, 0 },
		{ "set", 0, SetValue, 0, 0, 0, napi_default, 0 },
		{ "update", 0, Update, 0, 0, 0, napi_default, 0 }
	};
	status = napi_define_class(env, "Matrix", 6, New, nullptr,
			6, props, &class_proto);
	if (status != napi_ok) return NULL;
	status = napi_create_reference(env, class_proto, 1, &constructor);
	if (status != napi_ok) return NULL;

	return class_proto;
}

napi_value MatrixWrapper::New(napi_env env, napi_callback_info info) {
	napi_status status;
	napi_value target;
	status = napi_get_new_target(env, info, &target);
	if (status != napi_ok) return NULL;
	bool is_constructor = target != nullptr;

	if (is_constructor) {
		size_t argc = 2;
		napi_value args[2];
		napi_value jsthis;
		status = napi_get_cb_info(env, info, &argc, args, &jsthis, nullptr);
		if (status != napi_ok) return NULL;
		
		double rd, cd;

		status = napi_get_value_double(env, args[0], &rd);
		if (status != napi_ok) return NULL;
		status = napi_get_value_double(env, args[1], &cd);
		if (status != napi_ok) return NULL;

		MatrixWrapper *obj = new MatrixWrapper(static_cast<unsigned int>(rd),
				static_cast<unsigned int>(cd));
		obj->env_ = env;
		status = napi_wrap(env, jsthis, reinterpret_cast<void*>(obj),
				MatrixWrapper::Destructor, nullptr, &obj->wrapper_);
		if (status != napi_ok) return NULL;
		
		return jsthis;
	}
	else {
		size_t argc_ = 2;
		napi_value args[2];
		status = napi_get_cb_info(env, info, &argc_, args, nullptr, nullptr);
		if (status != napi_ok) return NULL;

		const size_t argc = 2;
		napi_value argv[argc] = {args[0], args[1]};

		napi_value class_proto;
		status = napi_get_reference_value(env, constructor, &class_proto);
		if (status != napi_ok) return NULL;

		napi_value instance;
		status = napi_new_instance(env, class_proto, argc, argv, &instance);
		if (status != napi_ok) return NULL;
		
		return instance;
	}
}

napi_value MatrixWrapper::GetRows(napi_env env, napi_callback_info info) {
	napi_status status;
	napi_value jsthis;
	status = napi_get_cb_info(env, info, nullptr, nullptr, &jsthis, nullptr);
	if (status != napi_ok) return NULL;
	MatrixWrapper *obj;
	status = napi_unwrap(env, jsthis, reinterpret_cast<void**>(&obj));
	if (status != napi_ok) return NULL;
	
	napi_value r;
	status = napi_create_uint32(env, obj->mat->rows, &r);
	if (status != napi_ok) return NULL;
	
	return r;
}

napi_value MatrixWrapper::GetCols(napi_env env, napi_callback_info info) {
	napi_status status;
	napi_value jsthis;
	status = napi_get_cb_info(env, info, nullptr, nullptr, &jsthis, nullptr);
	if (status != napi_ok) return NULL;
	MatrixWrapper *obj;
	status = napi_unwrap(env, jsthis, reinterpret_cast<void**>(&obj));
	if (status != napi_ok) return NULL;
	
	napi_value c;
	status = napi_create_uint32(env, obj->mat->columns, &c);
	if (status != napi_ok) return NULL;
	
	return c;
}

napi_value MatrixWrapper::Randomize(napi_env env, napi_callback_info info) {
	napi_status status;

	size_t argc = 2;

	napi_value jsthis;
	napi_value args[2];
	status = napi_get_cb_info(env, info, &argc, args, &jsthis, nullptr);
	if (status != napi_ok) return NULL;
	
	MatrixWrapper *obj;

	status = napi_unwrap(env, jsthis, reinterpret_cast<void**>(&obj));
	if (status != napi_ok) return NULL;

	double mu, std;
	status = napi_get_value_double(env, args[0], &mu);
	if (status != napi_ok) return NULL;
	status = napi_get_value_double(env, args[1], &std);
	if (status != napi_ok) return NULL;
	
	obj->mat->randomize(mu, std);

	return nullptr;
}

napi_value MatrixWrapper::GetValue(napi_env env, napi_callback_info info) {
	napi_status status;

	size_t argc = 2;

	napi_value jsthis;
	napi_value args[2];
	status = napi_get_cb_info(env, info, &argc, args, &jsthis, nullptr);
	if (status != napi_ok) return NULL;
	
	MatrixWrapper *obj;

	status = napi_unwrap(env, jsthis, reinterpret_cast<void**>(&obj));
	if (status != napi_ok) return NULL;

	double row, col;
	status = napi_get_value_double(env, args[0], &row);
	if (status != napi_ok) return NULL;
	status = napi_get_value_double(env, args[1], &col);
	if (status != napi_ok) return NULL;
	
	napi_value num;

	status = napi_create_double(env, obj->mat->get(static_cast<int>(row),
				static_cast<int>(col)), &num);
	if (status != napi_ok) return NULL;

	return num;
}

napi_value MatrixWrapper::SetValue(napi_env env, napi_callback_info info) {
	napi_status status;

	size_t argc = 3;

	napi_value jsthis;
	napi_value args[3];
	status = napi_get_cb_info(env, info, &argc, args, &jsthis, nullptr);
	if (status != napi_ok) return NULL;
	
	MatrixWrapper *obj;

	status = napi_unwrap(env, jsthis, reinterpret_cast<void**>(&obj));
	if (status != napi_ok) return NULL;

	double row, col, val;
	status = napi_get_value_double(env, args[0], &row);
	if (status != napi_ok) return NULL;
	status = napi_get_value_double(env, args[1], &col);
	if (status != napi_ok) return NULL;
	status = napi_get_value_double(env, args[2], &val);
	if (status != napi_ok) return NULL;
	
	obj->mat->set(static_cast<int>(row), static_cast<int>(col), val);

	return nullptr;
}

napi_value MatrixWrapper::Update(napi_env env, napi_callback_info info) {
	napi_status status;

	size_t argc = 1;

	napi_value jsthis;
	napi_value alpha;
	status = napi_get_cb_info(env, info, &argc, &alpha, &jsthis, nullptr);
	if (status != napi_ok) return NULL;
	
	MatrixWrapper *obj;

	status = napi_unwrap(env, jsthis, reinterpret_cast<void**>(&obj));
	if (status != napi_ok) return NULL;

	double a;
	status = napi_get_value_double(env, alpha, &a);
	if (status != napi_ok) return NULL;
	
	obj->mat->update(a);

	return nullptr;
}


napi_value Initialize(napi_env env, napi_value exports) {
	return MatrixWrapper::Init(env, exports);
}
NAPI_MODULE(NODE_GYP_MODULE_NAME, Initialize)
