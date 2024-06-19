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
const organizersRef = db.collection('Organizers');

// Collection reference
const newEmail = 'sfung211@gmail.com';

// Example data to find the document
const organizerEmail = 'andrewdexter@yahoo.com';
const teamName = 'Ambassadors';

// Find the document based on organizer's email and team name
organizersRef.where('organizerEmail', '==', organizerEmail)
    .where('teamName', '==', teamName)
    .get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.error('Error: Organizer\'s email and team name not found');
        } else {
            // Assuming there is only one matching document
            snapshot.forEach(doc => {
                // Update the invitedEmails array
                doc.ref.update({
                    invitedEmails: admin.firestore.FieldValue.arrayUnion(newEmail)
                })
                    .then(() => {
                        console.log('invitedEmails array updated successfully');
                    })
                    .catch(error => {
                        console.error('Error updating invitedEmails array:', error);
                    });
            });
        }
    })
    .catch(error => {
        console.error('Error finding document:', error);
    });