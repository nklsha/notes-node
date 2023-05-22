
const queries = require('../db/queries.js');
const tokenManager = require('../middleware/token.js');

const { authorizeToken } = require('../middleware/authorization.js');
const { formResponse } = require('./response-formatter.js');

async function autherizeRequest(req, res, authorizedAction) {
  try {
    await authorizeToken(req, async (uid) => { onAuthorization(req, res, uid, authorizedAction); });
  } catch (err) {
    formResponse(res, null, err);
  }
}

async function onAuthorization(req, res, uid, authorizedAction) {
  try {
    const payload = await authorizedAction(req, uid);
    if (payload) {
      formResponse(res, payload);
    } else {
      throw {
        status: 400,
        message: 'Bad request. Please check your input.'
      };
    }
  } catch (err) {
    formResponse(res, null, err);
  }
}

async function getAllNotes(req, uid) {
  const rows = await queries.getAllNotes(uid);
  return rows;
}

async function getNote(req, uid) {
  const rows = await queries.getNote(req.params.id, uid);
  return rows;

}

async function updateNote(req, uid) {
  const rows = await queries.updateNode({ ...req.body, ...req.params }, uid);
  return rows;
}

async function addNote(req, uid) {
  const rows = await queries.addNote(req.body, uid);
  return rows;
}

async function removeNote(req, uid) {
  const rows = await queries.removeNote(req.params.id, uid);
  return rows;
}

async function loginUser(req, res, firebase) {
  const idToken = req.body.idToken;
  try {

    const decodedToken = await firebase.auth().verifyIdToken(idToken).catch((_) => {
      throw { status: 400, message: 'Invalid token' };
    });

    const uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name;
    const responeBody = await checkAndInsertUser(uid, email, name);

    formResponse(res, responeBody);

  } catch (error) {
    formResponse(res, null, error);
  }
}


async function checkAndInsertUser(uid, email, name) {
  let user = await queries.getUserFromFirebaseId(uid);

  if (!user) {
    user = await queries.insertUser({
      name: name, email: email, firebaseId: uid
    });
  }

  if (!user) {
    throw { status: 500, message: 'Failed to add user' };
  }

  return {
    ...user,
    accessToken: tokenManager.generateAccessToken(user.id)
  };
}


module.exports = {
  autherizeRequest,
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  removeNote,
  loginUser
};