const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { LINKS_PER_PAGE } = require("../src/utils");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://hooks-news-app-daffe-default-rtdb.firebaseio.com/"
})

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.linksPagination = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', '*');
    let linkRef = db.collection('Links');
    const offset = Number(request.query.offset);

    linkRef
        .orderBy('created', 'desc')
        .limit(LINKS_PER_PAGE)
        .offset(offset)
        .get()
        .then(snapshot => {
            const links = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            })
            response.json(links);
        })
});
