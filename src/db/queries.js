const { Client } = require('pg');
const db = require('./index.js') 


async function getAllNotes() {
    const { rows } = await db.query('SELECT * FROM notes;')
    return rows
}

async function addNote(note) {
    const date = new Date();

    const query = {
        text: 'INSERT INTO notes(title, description) VALUES($1, $2) RETURNING *;',
        values: [note.title, note.description],
      }

      const { rows } = await db.query(query)
      return rows[0]
}

async function removeNote({id}) {
    const date = new Date();

    const query = {
        text: 'DELETE FROM notes WHERE id = $1 RETURNING *;',
        values: [id],
      }

      const { rows } = await db.query(query)
      return rows[0]
}

async function updateNode({id, title, description}) {
    const date = new Date();

    const query = {
        text: 'UPDATE notes SET title = $2, description = $3 WHERE id = $1 RETURNING *;',
        values: [id, title, description],
      }

      const { rows } = await db.query(query)
      return rows[0]
}

module.exports = {
    getAllNotes,
    addNote,
    removeNote,
    updateNode
  }