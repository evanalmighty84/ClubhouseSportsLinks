'use strict';
var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
app.use(express.json());
const cors = require ('cors')
app.use(cors({
	origin: 'http://localhost:3000',  // This allows only http://localhost:3000 to access your server
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
	allowedHeaders: ['Content-Type', 'Authorization']  // Allowed HTTP headers
}));
const axios = require("axios");
const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("674d023b72e91fcdf3da14c730387dcbdb611f548e094bfeab2fff5bd86493fe");
const tableName = 'AlienCity'; // The table created in the Data Store
const tableName2 = 'Articles'; // The table created in the Data Store
const tableName3 = 'SportsOwnership'; // The table created in the Data Store
const tableName3B = 'SportsOwnershipNoGif'; // The table created in the Data Store
const tableName4 = 'SportsTechnology'; // The table created in the Data Store
const tableName4B = 'SportsTechnologyNoGif'; // The table created in the Data Store
const tableName5 = 'BannerImages'; // The table created in the Data Store
const columnName = 'CityName'; // The column created in the table
const admin = require('firebase-admin');
const {OAuth2Client} = require('google-auth-library');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const cloudinary = require('cloudinary').v2;
const os = require('os');
const path = require('path');
const fs = require('fs');
// Middleware to parse JSON bodies
app.use(bodyParser.json());

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
console.log('Firestore initialized successfully');

// Google OAuth client
const client = new OAuth2Client('179478627002-th39iebli3b17dg5mkj4vu32sneo8mt9.apps.googleusercontent.com');

// Route to handle Google OAuth callback and store user in Firestore

cloudinary.config({
	cloud_name: 'duz4vhtcn',
	api_key: '922468697412882',
	api_secret: 'K-CAP3rlMC-ADlYo093CXaT_Jcc'
});
app.post('/api/TeamStreamRecordings', async (req, res) => {
	const { teamName, leagueName } = req.body;
	const folderName = `${leagueName}_${teamName}`;

	try {
		// Use Cloudinary's search API to fetch videos from the specified folder
		let result = await cloudinary.search.expression(`folder:${folderName}`)
			.sort_by('created_at', 'desc') // Sorting by creation date
			.max_results(30) // You can adjust this value
			.execute();

		const videos = result.resources.map(video => ({
			public_id: video.public_id,
			url: cloudinary.url(video.public_id, {
				resource_type: 'video',
				flags: 'attachment' // This flag prompts the download
			}),
			//url: video.secure_url,        regular links no downloadable links
			created_at: video.created_at
		}));

		res.json(videos);
	} catch (error) {
		console.error('Error fetching videos from Cloudinary:', error);
		res.status(500).send('Failed to retrieve videos');
	}
});


app.post('/api/login', async (req, res) => {
	try {
		const {idToken} = req.body; // Extract the Google ID token from the request body

		// Verify Google ID token using the provided Google Client
		const ticket = await client.verifyIdToken({
			idToken,
			audience: '179478627002-th39iebli3b17dg5mkj4vu32sneo8mt9.apps.googleusercontent.com',
		});

		// Extract user information (payload) from the verified token
		const payload = ticket.getPayload();
		const email = payload['email']; // Extract the email from the payload

		// Query Firestore to check if the email exists in the "Organizers" collection
		const organizersRef = admin.firestore().collection('Organizers');
		const organizersSnapshot = await organizersRef.where('organizerEmail', '==', email).get();

		// If the email exists in the Organizers collection
		if (!organizersSnapshot.empty) {
			// Extract teamName from the first document (assuming one email can only belong to one team)
			const teamName = organizersSnapshot.docs[0].data().teamName;
			const leagueName = organizersSnapshot.docs[0].data().leagueName;

			// Generate access token using jsonwebtoken sign method
			const accessToken = jwt.sign({email}, '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', {expiresIn: '1h'});

			// Return the access token, permission true, teamName, and message
			res.json({
				accessToken,
				permission: true,
				email,
				teamName,
				leagueName,
				message: 'able to authenticate Organizer'
			});
		} else {
			// If the email is not found in the Organizers collection, check the Parents collection
			const parentsRef = admin.firestore().collection('Parents');
			const parentsSnapshot = await parentsRef.where('email', '==', email).get();

			// If the email exists in the Parents collection
			if (!parentsSnapshot.empty) {
				// Extract teamName and name from the first document
				const teamName = parentsSnapshot.docs[0].data().teamName;
				const name = parentsSnapshot.docs[0].data().name;
				const meetingId = parentsSnapshot.docs[0].data().meetingId;
				const leagueName = parentsSnapshot.docs[0].data().leagueName;

				// Generate access token using jsonwebtoken sign method
				const accessToken = jwt.sign({email}, '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', {expiresIn: '1h'});

				// Return the access token, permission true, email, teamName, name, and message
				res.json({
					accessToken,
					permission: true,
					email,
					teamName,
					name,
					leagueName,
					meetingId,
					message: 'able to authenticate Parent'
				});
			} else {
				// If the email is not found in either collection
				const accessToken = jwt.sign({email}, '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', {expiresIn: '1h'});

				// Return the access token, permission false, email, and message
				res.json({accessToken, permission: false, email, message: 'unable to authenticate organizer or user'});
			}
		}
	} catch (error) {
		// Handle errors during the login process
		console.error('Login failed:', error);
		res.status(401).json({error: 'Unauthorized'});
	}
});

app.post('/api/registerParent', async (req, res) => {
	const {email, name} = req.body;

	try {
		// Extract data from the request body


		// Query the Organizers collection to check if the email is invited
		const organizersRef = db.collection('Organizers');
		const querySnapshot = await organizersRef.where('invitedEmails', 'array-contains', email).get();

		// If the email is found in the invitedEmails array of any organizer
		if (!querySnapshot.empty) {
			// Get the data of the first organizer (assuming one email can only belong to one team)
			const organizerData = querySnapshot.docs[0].data();
			const {teamName, leagueName} = organizerData;

			// Store the parent details in the Parents collection
			await db.collection('Parents').add({
				email,
				name,
				teamName, // Store the teamName from the organizer
				leagueName,
				isTeamMeetingFinished: true,
				isTeamMeetingStarted: false

			});

			// Send success response
			res.status(200).json({message: 'Parent registered successfully for the', teamName});
		} else {
			// Send error response if email is not invited
			res.status(403).json({error: 'User not created, please contact your team organizer'});
		}
	} catch (error) {
		// Handle errors
		console.error('Error registering parent:', error);
		res.status(500).json({error: 'Internal server error'});
	}
})


app.put('/isTeamStreamStarted', async (req, res) => {
	const {teamName, email, name} = req.body;

	try {
		// Get a reference to the Firestore collection
		const parentsRef = db.collection('Parents');

		// Query the collection to find the document with the provided email
		const emailQuery = parentsRef.where('email', '==', email);
		const emailSnapshot = await emailQuery.get();

		// Check if a document with the provided email exists
		if (!emailSnapshot.empty) {
			// Update the isTeamMeetingStarted field to true for the document with the provided email
			const batch = db.batch();
			emailSnapshot.forEach(doc => {
				batch.update(doc.ref, {isTeamMeetingStarted: true, isTeamMeetingFinished: false});
			});

			// Commit the batch update
			await batch.commit();

			console.log('Meeting had not started but will shortly');

			// Send response indicating success and set isTeamStreamStarted to true
			res.status(200).json({message: 'Meeting had not started but will shortly', isTeamStreamStarted: true});
		} else {
			console.log('No document found with the provided email');

			// Send response indicating failure (document not found)
			res.status(404).json({message: 'No document found with the provided email', isTeamStreamStarted: false});
		}
	} catch (error) {
		console.error('Error updating document in Firestore:', error);

		// Send response indicating error
		res.status(500).json({message: 'Error updating document in Firestore', isTeamStreamStarted: false});
	}
});


app.put('/isTeamStreamFinished', async (req, res) => {
	// Assuming you receive the teamName, email, isTeamMeetingStarted, and isTeamMeetingFinished in the request body
	const {teamName, email, isTeamMeetingStarted, isTeamMeetingFinished} = req.body;

	try {
		const parentsRef = db.collection('Parents');
		const query = parentsRef.where('teamName', '==', teamName).where('email', '==', email);

		const snapshot = await query.get();

		if (snapshot.empty) {
			console.log('No user found for the specified teamName and email.');
			res.status(404).json({error: 'User not found'});
		} else {
			// Assuming there's only one document for each teamName and email combination
			const doc = snapshot.docs[0];
			// Update the fields
			await doc.ref.update({
				isTeamMeetingStarted: isTeamMeetingStarted, // Update isTeamMeetingStarted field
				isTeamMeetingFinished: isTeamMeetingFinished // Update isTeamMeetingFinished field
			});
			console.log('User meeting status updated successfully.');
			res.status(200).json({message: 'User meeting status updated successfully'});
		}
	} catch (error) {
		console.error('Error updating document in Firestore:', error);
		res.status(500).json({error: 'Error updating document'});
	}
});


// Route to handle POST request to /auth/google/callback
app.post('/auth/google/callback', async (req, res) => {
	try {
		const {name, email, teamName, leagueName} = req.body;

		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			console.log('Response:', {error: 'Unauthorized: Access Token missing'});
			return res.status(401).json({error: 'Unauthorized: Access Token missing'});
		}
		const accessToken = authHeader.split(' ')[1];

		jwt.verify(accessToken, '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', async (err, decoded) => {
			if (err) {
				console.error('Error verifying access token:', err);
				console.log('Response:', {error: 'Unauthorized: Invalid Access Token'});
				return res.status(401).json({error: 'Unauthorized: Invalid Access Token'});
			}

			const {email: decodedEmail} = decoded;

			if (email !== decodedEmail) {
				console.log('Response:', {error: 'Unauthorized: Email mismatch'});
				return res.status(401).json({error: 'Unauthorized: Email mismatch'});
			}

			await db.collection('Parents').doc().set({
				name,
				email,
				teamName,
				leagueName,
			})
				.then(() => {
					console.log('Response:', {message: 'User stored successfully'});
					res.status(200).json({message: 'User stored successfully'});
				})
				.catch(error => {
					console.error('Error storing user in Firestore:', error);
					console.log('Response:', {error: 'Error storing user'});
					res.status(500).json({message: 'Error storing user'});
				});
		});
	} catch (error) {
		console.error('Error in /auth/google/callback route:', error);
		console.log('Response:', {error: 'Internal Server Error'});
		res.status(500).json({message: 'Internal Server Error'});
	}
});

app.post('/api/sendMeetingId', async (req, res) => {
	try {
		const { email, leagueName, teamName, meetingId } = req.body;

		// Get a reference to the Firestore collection
		const parentsRef = db.collection('Parents');

		// Query the collection to find documents with the provided teamName, leagueName, and email
		const query = parentsRef
			.where('teamName', '==', teamName)
			.where('leagueName', '==', leagueName)
			.where('email', '==', email);
		const snapshot = await query.get();

		// Check if any documents match the full set of criteria
		if (!snapshot.empty) {
			// Find all documents in the league and team to update meeting IDs
			const updateQuery = parentsRef
				.where('teamName', '==', teamName)
				.where('leagueName', '==', leagueName);
			const updateSnapshot = await updateQuery.get();

			// Proceed if there are documents to update
			if (!updateSnapshot.empty) {
				const batch = db.batch();
				updateSnapshot.forEach(doc => {
					const updates = { meetingId: meetingId };
					// Set 'isTeamMeetingStarted' to true only for the matching email document
					if (doc.data().email === email) {
						updates.isTeamMeetingStarted = true;
					}
					batch.update(doc.ref, updates);
				});

				// Commit the batch update
				await batch.commit();
				console.log(`Meeting ID updated for team: ${teamName} in league: ${leagueName}`);
				res.status(200).json({ message: `Meeting ID updated for all matching entries in team: ${teamName} and league: ${leagueName}.` });
			} else {
				console.log(`No documents found for team: ${teamName} and league: ${leagueName} to update.`);
				res.status(404).json({ message: `No documents found for update in team: ${teamName} and league: ${leagueName}.` });
			}
		} else {
			// No documents found that match the full criteria
			console.log(`No documents found matching the specified criteria for team: ${teamName}, league: ${leagueName}, and email: ${email}`);
			res.status(404).json({ message: `No documents found that match the specified criteria.` });
		}
	} catch (error) {
		console.error('Error updating meeting ID:', error);
		res.status(500).json({ message: 'Error updating meeting ID' });
	}
});


/*
app.post('/api/sendMeetingId', async (req, res) => {
	try {
		const { email, leagueName, teamName, meetingId } = req.body;

		// Get a reference to the Firestore collection
		const parentsRef = db.collection('Parents');

		// Query the collection to find documents with the provided teamName, leagueName, and email
		const query = parentsRef
			.where('teamName', '==', teamName)
			.where('leagueName', '==', leagueName)
			.where('email', '==', email);
		const snapshot = await query.get();

		// Check if any documents match the full set of criteria
		if (!snapshot.empty) {
			// Find all documents in the league and team to update meeting IDs
			const updateQuery = parentsRef
				.where('teamName', '==', teamName)
				.where('leagueName', '==', leagueName);
			const updateSnapshot = await updateQuery.get();

			// Proceed if there are documents to update
			if (!updateSnapshot.empty) {
				const batch = db.batch();
				updateSnapshot.forEach(doc => {
					batch.update(doc.ref, { meetingId: meetingId });
				});

				// Commit the batch update
				await batch.commit();
				console.log(`Meeting ID updated for team: ${teamName} in league: ${leagueName}`);
				res.status(200).json({ message: `Meeting ID updated for all matching entries in team: ${teamName} and league: ${leagueName}.` });
			} else {
				console.log(`No documents found for team: ${teamName} and league: ${leagueName} to update.`);
				res.status(404).json({ message: `No documents found for update in team: ${teamName} and league: ${leagueName}.` });
			}
		} else {
			// No documents found that match the full criteria
			console.log(`No documents found matching the specified criteria for team: ${teamName}, league: ${leagueName}, and email: ${email}`);
			res.status(404).json({ message: `No documents found that match the specified criteria.` });
		}
	} catch (error) {
		console.error('Error updating meeting ID:', error);
		res.status(500).json({ message: 'Error updating meeting ID' });
	}
});
*/

const getRecordings = async (meetingId) => {
	const options = {
		headers: {
			"Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJlYmNlNGViMy1kYWQxLTRkOWEtYjk1Yy1iZTBiZGYyYjIzNTUiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwOTIzMDA0OSwiZXhwIjoxNzQwNzY2MDQ5fQ.v8dSujtS-E_O-Fb6Pi_XxbtxNhvHDgu6EZAmDSmkKmU",
			"Content-Type": "application/json",
		},
	};
	const url = `https://api.videosdk.live/v2/recordings?roomId=${meetingId}&page=1&perPage=20`;
	console.log(`Fetching recordings from URL: ${url}`);
	const response = await axios.get(url, options);
	console.log(`Video SDK API response status: ${response.status}`);
	if (response.status !== 200) {
		throw new Error('Failed to fetch recordings');
	}
	console.log(`Video SDK API response data: ${JSON.stringify(response.data)}`);
	return response.data;
};



const uploadToCloudinaryFromUrl = async (fileUrl, leagueName, teamName, fileId) => {
	try {
		console.log(`Preparing to upload file to Cloudinary from URL: ${fileUrl}`);
		const folderPath = `${leagueName}_${teamName}`;
		console.log(`Uploading to folder: ${folderPath}`);

		const result = await cloudinary.uploader.upload(fileUrl, {
			resource_type: 'video',
			folder: folderPath,
			upload_preset: 'ClubhouseSportsLink',
			public_id: fileId // Set public ID to avoid duplicate uploads
		});
		console.log(`Uploaded to Cloudinary, secure URL: ${result.secure_url}`);
		return result.secure_url;
	} catch (error) {
		console.error('Failed to upload to Cloudinary:', error.message);
		throw new Error('Failed to upload to Cloudinary');
	}
};





app.post('/api/clearMeetingId', async (req, res) => {
	try {
		const { teamName, leagueName, email } = req.body;
		const parentsRef = db.collection('Parents');

		console.log(`Received request to clear meeting ID for team: ${teamName}, league: ${leagueName}, email: ${email}`);
		const emailQuery = parentsRef
			.where('teamName', '==', teamName)
			.where('leagueName', '==', leagueName)
			.where('email', '==', email);
		const emailSnapshot = await emailQuery.get();

		const batch = db.batch();
		let originalMeetingId = null;

		if (!emailSnapshot.empty) {
			emailSnapshot.forEach(doc => {
				originalMeetingId = doc.data().meetingId;
				console.log(`Document found with meeting ID: ${originalMeetingId}`);
				batch.update(doc.ref, { meetingId: '', isTeamMeetingStarted: false });
			});

			await batch.commit();
			console.log(`Batch commit successful. Meeting ID cleared and isTeamMeetingStarted set to false for email: ${email}`);
		} else {
			console.log(`No documents found for email: ${email}`);
		}

		// Query to check other entries with the same teamName and leagueName
		const otherEntriesQuery = parentsRef
			.where('teamName', '==', teamName)
			.where('leagueName', '==', leagueName);
		const otherEntriesSnapshot = await otherEntriesQuery.get();

		// Check if all other isTeamMeetingStarted fields are false
		let allFalse = true;
		otherEntriesSnapshot.forEach(doc => {
			if (doc.data().isTeamMeetingStarted !== false) {
				allFalse = false;
			}
		});

		console.log(`All isTeamMeetingStarted fields false: ${allFalse}`);

		if (allFalse) {
			const updateBatch = db.batch();
			otherEntriesSnapshot.forEach(doc => {
				updateBatch.update(doc.ref, { meetingId: '' });
			});
			await updateBatch.commit();
			console.log(`All meeting IDs cleared for team: ${teamName}, league: ${leagueName} since no meetings are active.`);
		} else {
			console.log(`Some meetings are still active for team: ${teamName}, league: ${leagueName}.`);
		}

		if (originalMeetingId) {
			// Wait for 10 seconds before making the call to ensure all updates are processed
			await new Promise(resolve => setTimeout(resolve, 10000));
			const data = await getRecordings(originalMeetingId); // Ensure this function is properly implemented to fetch recordings
			const recordings = data.data;
			const videoUrls = recordings.map(rec => rec.file && rec.file.fileUrl).filter(url => url);

			const folderPath = `${leagueName}_${teamName}`;
			const uploadedUrls = await uploadVideos(videoUrls, folderPath);

			console.log('Recordings processed successfully', uploadedUrls);
			res.status(200).json({ message: 'Meeting ID cleared for sure and recordings processed successfully', urls: uploadedUrls });
		} else {
			res.status(200).json({ message: 'Meeting ID cleared but no recordings to process' });
		}
	} catch (error) {
		console.error('Error processing the request:', error);
		res.status(500).json({ message: 'Error processing the request' });
	}
});








async function uploadVideos(videoUrls, folderPath) {
	const uploadedUrls = [];
	for (const videoUrl of videoUrls) {
		try {
			const fileId = extractFileId(videoUrl);
			const result = await cloudinary.uploader.upload(videoUrl, {
				resource_type: 'video',
				folder: folderPath,
				public_id: fileId  // Ensure fileId is extracted correctly
			});
			uploadedUrls.push(result.secure_url);
		} catch (error) {
			console.error('Failed to upload to Cloudinary:', error.message);
		}
	}
	return uploadedUrls;
}

function extractFileId(url) {
	const matches = url.match(/\/([^\/]+)\.mp4$/);
	return matches ? matches[1] : null;
}

















app.post('/api/checkMeetingId', async (req, res) => {
	try {
		const { teamName, leagueName } = req.body;

		// Get a reference to the Firestore collection
		const parentsRef = admin.firestore().collection('Parents');

		// Query the collection to find documents with the provided teamName and leagueName
		const query = parentsRef
			.where('teamName', '==', teamName)
			.where('leagueName', '==', leagueName);

		const snapshot = await query.get();

		let meetingId = null;

		// Iterate over each document in the snapshot
		snapshot.forEach(doc => {
			const currentMeetingId = doc.data().meetingId;
			if (currentMeetingId && !meetingId) {
				meetingId = currentMeetingId; // Set meetingId
			}
		});

		if (meetingId) {
			const batch = admin.firestore().batch(); // Using a batch to handle multiple writes atomically

			snapshot.forEach(doc => {
				const docRef = parentsRef.doc(doc.id); // Get a reference to each doc
				batch.update(docRef, { meetingId: meetingId }); // Prepare to update meetingId
			});

			await batch.commit(); // Commit the batch update
			res.status(200).json({ meetingId: meetingId });
		} else {
			res.status(404).json({ error: 'No meeting ID found for the specified team and league.' });
		}
	} catch (error) {
		console.error('Error checking meeting ID:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
});






//GET API that gets the news from the required table
app.get('/fetchData', (req, res) => {
	// Initializing Catalyst SDK
	var catalystApp = catalyst.initialize(req);

	// Use Promise.all to execute both functions concurrently
	Promise.all([
		getNewsPaperSportsOwnershipFromCatalystDataStore(catalystApp),
		getNewsPaperSportsTechnologyFromCatalystDataStore(catalystApp),
		getBannerImageFromCatalystDataStore(catalystApp),
		getNewsPaperSportsOwnershipNoGifFromCatalystDataStore(catalystApp),
		getNewsPaperSportsTechnologyNoGifFromCatalystDataStore(catalystApp),


	])
		.then(([details1, details2, details3, details4, details5]) => {
			if (details1.length === 0 && details2.length === 0 && details3.length === 0 && details4.length === 0 && details5.length === 0) {
				// Both responses are empty
				res.send({
					"message": "No newspaper and news subject data available",
					"signal": "negative"
				});
			} else {
				// Combine and send the responses
				const combinedResponse = {
					"message": "Newspaper data retrieved successfully with all details",
					"signal": "positive",
					"SportsOwnershipNewspaper": details1,
					"SportsTechnologyNewspaper": details2,
					"banner": details3,
					"SportsOwnershipNoGifNewspaper": details4,
					"SportsTechnologyNoGifNewspaper": details5,
				};
				res.send(combinedResponse);
			}
		})
		.catch(err => {
			console.log(err);
			sendErrorResponse(res);
		});
});



// Add this route handler to your existing backend code


/**
 * Executes the Query and fetches the news from the table
 * @param {*} catalystApp
 * @param {*} tablename
 */
function getNewsPaperSportsOwnershipFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select video1, video2, video3, title, description, url, content,secureUrl from " + tableName3 + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperSportsTechnologyFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select video1, video2, video3, title, description, url, content,secureUrl from " + tableName4 + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getBannerImageFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select url from " + tableName5 + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperSportsOwnershipNoGifFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select video1, video2, video3, title, description, url, content from " + tableName3B + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperSportsTechnologyNoGifFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select video1, video2, video3, title,description, url, content from " + tableName4B + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}


/**
 * Sends an error response
 * @param {*} res
 */


// The POST API that reports the alien encounter for a particular city
app.post('/alien', (req, res) => {
	var cityJson = req.body;
	console.log(cityJson);
	// Initializing Catalyst SDK
	var catalystApp = catalyst.initialize(req);
	// Queries the Catalyst Data Store table and checks whether a row is present for the given city
	getDataFromCatalystDataStore(catalystApp, cityJson.city_name).then(cityDetails => {
		if (cityDetails.length == 0) { // If the row is not present, then a new row is inserted
			console.log("Alien alert!"); //Written to the logs. You can view this log from Logs under the Monitor section in the console
			var rowData = {}
			rowData[columnName] = cityJson.city_name;

			var rowArr = [];
			rowArr.push(rowData);
			// Inserts the city name as a row in the Catalyst Data Store table
			catalystApp.datastore().table(tableName).insertRows(rowArr).then(cityInsertResp => {
				res.send({
					"message": "Thanks for reporting!"
				});
			}).catch(err => {
				console.log(err);
				sendErrorResponse(res);
			})
		} else { // If the row is present, then a message is sent indicating duplication
			res.send({
				"message": "Looks like you are not the first person to encounter aliens in this city! Someone has already reported an alien encounter here!"
			});
		}
	}).catch(err => {
		console.log(err);
		sendErrorResponse(res);
	})
});

// The GET API that checks the table for an alien encounter in that city
app.get('/alien', (req, res) => {
	var city = req.query.city_name;

	// Initializing Catalyst SDK
	var catalystApp = catalyst.initialize(req);

	// Queries the Catalyst Data Store table and checks whether a row is present for the given city
	getDataFromCatalystDataStore(catalystApp, city).then(cityDetails => {
		if (cityDetails.length == 0) {
			res.send({
				"message": "Hurray! No alien encounters in this city yet!",
				"signal": "negative"
			});
		} else {
			res.send({
				"message": "Uh oh! Looks like there are aliens in this city!",
				"signal": "positive"
			});
		}
	}).catch(err => {
		console.log(err);
		sendErrorResponse(res);
	})
});


app.get('/articles', (req, res) => {
	var city = req.query.city_name;

	// Initializing Catalyst SDK
	var catalystApp = catalyst.initialize(req);

	// Queries the Catalyst Data Store table and checks whether a row is present for the given city
	getArticleDataFromCatalystDataStore(catalystApp).then(details => {
		if (details.length == 0) {
			console.log(details)
			res.send({
				"message": "sorry no medium articles",
				"signal": "negative"
			});
		} else {
			res.send(details)
			console.log(details)
			;
		}
	}).catch(err => {
		console.log(err);
		sendErrorResponse(res);
	});
});


function getDataFromCatalystDataStore(catalystApp, cityName) {
	return new Promise((resolve, reject) => {
		// Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select * from " + tableName + " where " + columnName + "='" + cityName + "'").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getArticleDataFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		// Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select * from " + tableName2 + "").then(Response => {
			//console.log(Response)
			resolve(Response);
		}).catch(err => {
			reject(err);
		})
	});

}

/**
 * Sends an error response
 * @param {*} res
 */
function sendErrorResponse(res) {
	res.status(500);
	res.send({
		"error": "Internal server error occurred. Please try again in some time."
	});
}

module.exports = app;



