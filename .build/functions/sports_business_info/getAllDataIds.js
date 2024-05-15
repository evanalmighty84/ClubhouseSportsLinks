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

// Function to fetch all document IDs from the "Parents" collection
const getAllParentIds = async () => {
    try {
        const parentsRef = db.collection('Organizers'); //change based upone need ie. Organizers, or Parents
        const snapshot = await parentsRef.get();

        const ids = [];
        snapshot.forEach(doc => {
            ids.push(doc.id); // Push each document ID to the array
        });

        return ids;
    } catch (error) {
        console.error('Error fetching document IDs from Firestore:', error);
        throw error;
    }
};

// Usage example
getAllParentIds()
    .then(ids => {
        console.log('All Parent or Organizer IDs:', ids);
    })
    .catch(error => {
        console.error('Error:', error);
    });
