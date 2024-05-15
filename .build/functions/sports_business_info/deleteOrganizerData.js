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
// Function to delete a document by ID from the "Parents" collection
// Function to delete a document by ID from the "Parents" collection
const deleteDocumentById = async (docId) => {
    try {
        const docRef = db.collection('Organizers').doc(docId); // change based upon need ie. Parents or Organizers
        const docSnapshot = await docRef.get();

        if (!docSnapshot.exists) {
            throw new Error(`Document with ID ${docId} does not exist.`);
        }

        const deletedData = docSnapshot.data(); // Save document data before deleting
        await docRef.delete();

        console.log(`Document with ID ${docId} successfully deleted.`);
        return {id: docId, data: deletedData}; // Return document ID and data
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

// Usage example
deleteDocumentById('aAhnEKQv5Anaq8hAi6FJ')
    .then(({id, data}) => {
        console.log('Document with ID', id, 'has been deleted.');
        console.log('Deleted data:', data);

    })
    .catch(error => {
        console.error('Error:', error);
    });

