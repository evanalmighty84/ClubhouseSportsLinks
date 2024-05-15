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


// Get a reference to the Firestore database
const db = admin.firestore();

// Function to fetch all documents from the "Parents" collection
const getAllParents = async () => {
    try {
        const parentsRef = db.collection('Parents'); //change collection name based on need ie. Parents or Organizers
        const snapshot = await parentsRef.get();

        const allParents = [];
        snapshot.forEach(doc => {
            allParents.push(doc.data()); // Push each document's data to the array
        });

        return allParents;
    } catch (error) {
        console.error('Error fetching documents from Firestore:', error);
        throw error;
    }
};

// Usage example
getAllParents()
    .then(allParents => {
        console.log('All Parents or Organizers:', allParents);
    })
    .catch(error => {
        console.error('Error:', error);
    });
