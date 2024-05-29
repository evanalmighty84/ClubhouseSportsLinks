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

// Add data to the "Organizers" collection
const organizersRef = admin.firestore().collection('Parents');

// Example data to add
const parentsData = {
    teamName: 'Ambassadors',
    leagueName: 'PrestonwoodSoccer',
    name: 'Emily Ligon',
    email:'evanemilywedding@gmail.com',
    meetingId:'',
    isTeamMeetingFinished:'false',
    isTeamMeetingStarted:'false',
};

// Add the data to Firestore
organizersRef.add(parentsData)
    .then(docRef => {
        console.log('Document written with ID:', docRef.id);
    })
    .catch(error => {
        console.error('Error adding document:', error);
    });
