exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'text', notNUll: true, unique: true },
    key: { type: 'text', notNull: true, unique: true },
    active: { type: 'boolean', notNull: true, default: false },
    admin: { type: 'boolean', notNull: true, default: false },
    created_at: {type: 'timestamp with time zone', notNUll: true, default: pgm.func('CURRENT_TIMESTAMP(0)') },
    updated_at: {type: 'timestamp with time zone', notNUll: true, default: pgm.func('CURRENT_TIMESTAMP(0)') }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
