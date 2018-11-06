exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('posts', {
    id: 'id',
    extern_id: { type: 'integer', notNull: true },
    service: { type: 'text', notNull: true },
    tags: { type: 'text[]' },
    created_at: {type: 'timestamp with time zone', notNUll: true, default: pgm.func('CURRENT_TIMESTAMP(0)') },
    updated_at: {type: 'timestamp with time zone', notNUll: true, default: pgm.func('CURRENT_TIMESTAMP(0)') }
  });
};

exports.down = (pgm) => {
  pgm.dropTable('posts');
};
