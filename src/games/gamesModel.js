const db = require('../../data/dbConfig.js');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(game) {
  const [id] = await db('game').insert(game, 'id')
  return db('game').where({id}).first()
}

async function update(id, changes) {
  return null;
}

function remove(id) {
  return null;
}

function getAll() {
  return db('game');
}

function findById(id) {
  return null;
}
