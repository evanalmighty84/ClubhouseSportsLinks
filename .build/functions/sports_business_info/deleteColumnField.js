const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./teamstream-413801-284cb6b0d287.json');
try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://winnovativeappshomepage.firebaseio.com"
    });
    console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
    console.error('Error initializing Firebase Admin SDK:', error);
}

const db = admin.firestore();
const deleteIsTeamMeetingStartedField = async () => {
    try {
        const parentsRef = db.collection('Parents');  // change based upon need ie. Parents or Organizers
        const snapshot = await parentsRef.get();

        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.update(doc.ref, {isMeetingStarted: admin.firestore.FieldValue.delete()});
        });

        // Commit the batch update
        await batch.commit();

        console.log('Successfully deleted "isMeetingStarted" field from all documents.');
    } catch (error) {
        console.error('Error deleting field from documents:', error);
        throw error;
    }
};

// Usage example
deleteIsTeamMeetingStartedField()
    .then(() => {
        console.log('Field deletion complete.');
        process.exit(0); // Exit the script after successful execution
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1); // Exit the script with an error code
    });
