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

// Function to add the "OrganizerEmail" field to all documents in the "Parents" collection
const addParentorOrganizerFieldField = async () => {
    try {
        const parentsRef = db.collection('Parents');
        const snapshot = await parentsRef.get();

        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.update(doc.ref, {meetingId: ''}); // Set a default value for the new field
        });

        // Commit the batch update
        await batch.commit();

        console.log('Successfully added "new field" field to all documents.');
    } catch (error) {
        console.error('Error adding field to documents:', error);
        throw error;
        e
    }
};

// Usage example
addParentorOrganizerFieldField()
    .then(() => {
        console.log('Field addition complete.');
        process.exit(0); // Exit the script after successful execution
    })
    .catch(error => {
        console.error('Error:', error);
        process.exit(1); // Exit the script with an error code
    });
