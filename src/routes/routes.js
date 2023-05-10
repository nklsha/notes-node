
const queries = require("../db/queries.js");

async function getAllNotes(req, res) {
  try {
    const rows = await queries.getAllNotes();
    console.log("rows", rows);
    formResponse(res, rows);
  } catch (err) {
    formResponse(res, null, err);
  }
}

async function getNote(req, res) {
  try {
    const rows = await queries.getNote(req.params.id);
    console.log("rows", rows);
    formResponse(res, rows);
  }  catch (err) {
    formResponse(res, null, err);
  }
}

async function updateNote(req, res) {
  try {
    const rows = await queries.updateNode({ ...req.body, ...req.params });
    console.log("rows", rows);
    formResponse(res, rows);
  }  catch (err) {
    formResponse(res, null, err);
  }
}

async function addNote(req, res) {
  try {
    const rows = await queries.addNote(req.body);
    console.log("rows", rows);
    formResponse(res, rows);
  }  catch (err) {
    formResponse(res, null, err);
  }
}

async function removeNote(req, res) {
  try {
    const rows = await queries.removeNote(req.params.id);
    console.log("rows", rows);
    formResponse(res, rows);
  }  catch (err) {
    formResponse(res, null, err);
  }
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