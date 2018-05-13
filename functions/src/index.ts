import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.updateName = functions.firestore
  .document('users/{userid}/pile/{pileId}')
  .onCreate(event => {
    let name = event.data().name;
    return event.ref.set({
      nameFaas: name + ', yo!'
    }, {merge: true});
});
