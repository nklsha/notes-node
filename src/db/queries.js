const db = require('./index.js');


async function getAllNotes(uid) {
  const query = {
    text: 'SELECT * FROM note WHERE "userId" = $1;',
    values: [uid],
  };
  const { rows } = await db.query(query);
  return rows;
}

async function getNote(id, uid) {
  const query = {
    text: 'SELECT * FROM note WHERE id = $1 AND "userId" = $2;',
    values: [id, uid],
  };

  const { rows } = await db.query(query);
  return rows;
}

async function addNote(note, uid) {

  const query = {
    text: 'INSERT INTO note(title, description, "userId") VALUES($1, $2, $3) RETURNING *;',
    values: [note.title, note.description, uid],
  };

  const { rows } = await db.query(query);
  return rows[0];
}

async function removeNote(id, uid) {

  const query = {
    text: 'DELETE FROM note WHERE id = $1 AND "userId" = $2 RETURNING *;',
    values: [id, uid],
  };

  const { rows } = await db.query(query);
  return rows[0];
}

async function updateNode({ id, title, description }, uid) {

  const query = {
    text: 'UPDATE note SET title = $2, description = $3 WHERE id = $1 AND "userId" = $4RETURNING *;',
    values: [id, title, description, uid],
  };

  const { rows } = await db.query(query);
  return rows[0];
}

async function getUserFromFirebaseId(firebaseId) {
  const query = {
    text: 'SELECT * from profile where "firebaseId" = $1;',
    values: [firebaseId]
  };

  const { rows } = await db.query(query);
  return rows[0];
}

async function getUser(uid) {
  const query = {
    text: 'SELECT * from profile where "id" = $1;',
    values: [uid]
  };

  const { rows } = await db.query(query);
  return rows[0];
}

async function insertUser(user) {
  const query = {
    text: 'INSERT INTO profile(name, email, "firebaseId") VALUES($1, $2, $3) RETURNING *;',
    values: [user.name, user.email, user.firebaseId],
  };

  const { rows } = await db.query(query);
  return rows[0];
}

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  removeNote,
  updateNode,
  getUser,
  insertUser,
  getUserFromFirebaseId
};