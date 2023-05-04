
const queries = require('../db/queries.js')

async function handleRoutes(req, res, route) {
  switch (route) {
    case "get/allNotes":
      const rows = await queries.getAllNotes().catch(err => formResponse(res, null, err))
      console.log("rows", rows)
      formResponse(res, rows);
      break
    case "post/addNote": {
      const row = await queries.addNote(req.body).catch(err => formResponse(res, null, err))
      console.log("rows", row)
      formResponse(res, row, null);
      break
    }
    case "put/updateNote": {
      const row = await queries.updateNode(req.body).catch(err => formResponse(res, null, err))
      console.log("rows", row)
      formResponse(res, row, null);
      break
    }

    case "delete/removeNote": {
      const row = await queries.removeNote(req.body).catch(err => formResponse(res, null, err))
      console.log("rows", row)
      formResponse(res, row, null);
      break;
    }
  }
}

function formResponse(res, data, err) {
  if (err) {
    res.status(500).send({
      error: err.message,
      status: 500
    })
  } else if (data) {
    res.status(200).send({
      data: data,
      status: 200
    })
  } else {
    res.status(500).send({
      error: "Server error",
      status: 500
    })
  }
}

module.exports = {
  handleRoutes
}