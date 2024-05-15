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

// Firestore reference
const db = admin.firestore();

// Collection reference
const organizersRef = db.collection('Organizers');

// Example data to add
const organizerData = {
    name: 'Coach Dexter',
    leagueName: 'PrestonwoodSoccer',
    organizerEmail: "andrewdexter@yahoo.com",
    teamName: 'Ambassadors',
    invitedEmails: ['evanalmighty84@gmail.com','evanemilywedding@gmail.com']
};

// Check if organizer's email and team name are duplicates
organizersRef.where('organizerEmail', '==', organizerData.organizerEmail)
    .where('teamName', '==', organizerData.teamName)
    .get()
    .then(snapshot => {
        if (!snapshot.empty) {
            // Organizer's email and team name already exist
            console.error('Error: Organizer\'s email and team name are duplicates');
        } else {
            // Add the data to Firestore
            organizersRef.add(organizerData)
                .then(docRef => {
                    console.log('Document written with ID:', docRef.id);
                })
                .catch(error => {
                    console.error('Error adding document:', error);
                });
        }
    })
    .catch(error => {
        console.error('Error checking duplicates:', error);
    });
