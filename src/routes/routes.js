
const queries = require("../db/queries.js");

async function getAllNotes(req, res) {
  const rows = await queries.getAllNotes().catch(err => formResponse(res, null, err));
  console.log("rows", rows);
  formResponse(res, rows);
}

async function getNote(req, res) {
  const rows = await queries.getNote(req.params.id).catch(err => formResponse(res, null, err));
  console.log("rows", rows);
  formResponse(res, rows);
}

async function updateNote(req, res) {
  const row = await queries.updateNode({...req.body, ...req.params}).catch(err => formResponse(res, null, err));
  console.log("rows", row);
  formResponse(res, row, null);
}

async function addNote(req, res) {
  const row = await queries.addNote(req.body).catch(err => formResponse(res, null, err));
  console.log("rows", row);
  formResponse(res, row, null);
}

async function removeNote(req, res) {
  const row = await queries.removeNote(req.params.id).catch(err => formResponse(res, null, err));
  console.log("rows", row);
  formResponse(res, row, null);
}


function formResponse(res, data, err) {
  if (err) {
    res.status(500).send({
      error: err.message,
      status: 500
    });
  } else if (data) {
    res.status(200).send({
      data: data,
      status: 200
    });
  } else {
    res.status(500).send({
      error: "Server error",
      status: 500
    });
  }
}

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  removeNote
};