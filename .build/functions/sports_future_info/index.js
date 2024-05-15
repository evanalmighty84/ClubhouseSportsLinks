'use strict';
var express = require('express');
var app = express();
var catalyst = require('zcatalyst-sdk-node');
const cors = require('cors');
app.use(cors({
	origin: '*',  // This allows only everything to access your server
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
	allowedHeaders: ['Content-Type', 'Authorization']  // Allowed HTTP headers
}));

app.use(express.json());
const {processImages} = require('./cloudinaryUtils');
const os = require("os");
const path = require("path");
const fs = require("fs");
const OpenAI = require('openai');
const openai = new OpenAI({apiKey: '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'});
const CUTOUT_API = "https://www.cutout.pro/api/v1/faceDriven/submitTaskByUrl";
const APIKEY = "4b23eb682b7f4a568ff129222fe0430e";
const ARTICLE_EXCTRACTOR_API_KEY = '9ff9fb1df5msh3ac2257f975bef0p104dcfjsnb2d4a840d34d';
const ARTICLE_EXCTRACTOR_API_HOST = 'article-extractor2.p.rapidapi.com';
const REQUEST_DELAY = 5000; // 5 seconds

const tablename = 'YouthSports'; // The table created in the Data Store
const tablenameB = 'YouthSportsNoGif'; // The table created in the Data Store
const tablename2 = 'NIL'; // The table created in the Data Store
const tablename2B = 'NILNoGif'; // The table created in the Data Store
const tablename3 = "SportsTechnologyStock"
const tablename3B = "SportsTechnologyStockNoGif"
const tableName4 = 'YouthNILBannerImages'; // The table created in the Data Store


'use strict';


//GET API that gets the news from the required table
app.get('/fetchData', (req, res) => {
	// Initializing Catalyst SDK
	var catalystApp = catalyst.initialize(req);

	// Use Promise.all to execute both functions concurrently
	Promise.all([
		getNewsPaperYouthSportsFromCatalystDataStore(catalystApp),
		getNewsPaperNILFromCatalystDataStore(catalystApp),
		getBannerImageFromCatalystDataStore(catalystApp),
		getNewsPaperYouthSportsNoGifFromCatalystDatStore(catalystApp),
		getNewsPaperNILNoGifFromCatalystDatStore(catalystApp),
		getNewsPaperSportsTechnologyStockFromCatalystDataStore(catalystApp),
		getNewsPaperSportsTechnologyStockNoGifFromCatalystDataStore(catalystApp)


	])
		.then(([details1, details2, details3, details4, details5, details6, details7]) => {
			if (details1.length === 0 && details2.length === 0 && details3.length === 0 && details4.length === 0 && details5.length === 0 && details6.length === 0 && details7.length === 0) {
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
					"YouthSportsNewspaper": details1,
					"NILNewspaper": details2,
					"banner": details3,
					"YouthSportsNoGifNewspaper": details4,
					"NILNoGifNewspaper": details5,
					"SportsTechnologyStockNewspaper": details6,
					"SportsTechnologyStockNoGifNewspaper": details7
				};
				res.send(combinedResponse);
			}
		})
		.catch(err => {
			console.log(err);
			sendErrorResponse(res);
		});
});
/*app.post('/submitLocation', async (req, res) => {
    const {latitude, longitude} = req.body;
    console.log('Received location data:', {latitude, longitude});

    const axios = require('axios');

    const options = {
        method: 'GET',
        url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
        params: {
            latitude,
            longitude,
            range: '0'
        },
        headers: {
            'X-RapidAPI-Key': '9ff9fb1df5msh3ac2257f975bef0p104dcfjsnb2d4a840d34d',
            'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const geocodeData = response.data;
        console.log(response.data);
        res.send({
            message: 'Location data received successfully',
            signal: 'positive',
            geocodeData

        });

        // Handle the API response as needed, extract relevant information, etc.
        // For example, you might want to store some information in your database.
    } catch (error) {
        console.error(error);
        // Handle the error appropriately
    }


});*/

app.post('/submitLocation', async (req, res) => {
	const {latitude, longitude} = req.body;
	console.log('Received location data:', {latitude, longitude});

	const axios = require('axios');

	const options = {
		method: 'GET',
		url: 'https://geocodeapi.p.rapidapi.com/GetNearestCities',
		params: {
			latitude,
			longitude,
			range: '0'
		},
		headers: {
			'X-RapidAPI-Key': '9ff9fb1df5msh3ac2257f975bef0p104dcfjsnb2d4a840d34d',
			'X-RapidAPI-Host': 'geocodeapi.p.rapidapi.com'
		}
	};

	try {
		const response = await axios.request(options);
		const geocodeData = response.data;

		// Extract city names from the first three objects
		const firstFiveCities = geocodeData.slice(0, 1).map(location => location.City);
		;

		// Build a query string using the extracted city names
		const queryString = `${firstFiveCities.join(' ')} sports`;
		const tbsParameter = 'tbs=qdr:m6';


		// Make a request to the SerpApi API with the constructed query string
		const serpApiUrl = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(queryString)}&hl=en&gl=us&tbm=nws&api_key=674d023b72e91fcdf3da14c730387dcbdb611f548e094bfeab2fff5bd86493fe&${tbsParameter}`;

		// Make the request to SerpApi
		const serpApiResponse = await axios.get(serpApiUrl);

		// Handle the response from SerpApi
		const data2 = serpApiResponse.data.news_results
		console.log(data2);


		let filteredDataWithTitle2 = [];
		let noPictureFilteredDataWithTitle2 = [];
		const processRecord2 = async (record2, filteredDataWithTitle2, noPictureFilteredDataWithTitle2) => {
			try {
				const artiicleExtractorOptions2 = {
					method: 'GET',
					url: 'https://article-extractor2.p.rapidapi.com/article/parse',
					params: {
						url: record2.link, word_per_minute: '300',
						desc_truncate_len: '210',
						desc_len_min: '180',
						content_len_min: '200'
					},
					headers: {
						'X-RapidAPI-Key': ARTICLE_EXCTRACTOR_API_KEY,
						'X-RapidAPI-Host': ARTICLE_EXCTRACTOR_API_HOST
					}
				};

				const articleExtractorResponse2 = await axios.request(artiicleExtractorOptions2);
				console.log('article extractor response 2 is here' + articleExtractorResponse2.data.data.title + articleExtractorResponse2.data.data.url + articleExtractorResponse2.data.data.image);

				const coverImageUrl2 = articleExtractorResponse2.data.data.image;
				const cutoutResponse2 = await axios.get(CUTOUT_API, {
					params: {
						imageUrl: coverImageUrl2,
						templateId: 2,
					},
					headers: {
						APIKEY: APIKEY,
					},
				});

				const taskID = cutoutResponse2.data.data;
				console.log('here is the 2nd taskID' + taskID);

				await new Promise(resolve => {
					setTimeout(async () => {
						try {
							const OTHER_API_URL = `https://www.cutout.pro/api/v1/faceDriven/getTaskInfo?taskId=${taskID}`;
							const otherApiResponse = await axios.get(OTHER_API_URL, {
								params: {
									taskId: taskID,
								},
								headers: {
									APIKEY: APIKEY,
								},
							});
							console.log('Total response from cutOUT2 TO GET PICTURES:', otherApiResponse.data);


							let aiContent2;  // Declare the variable outside the try-catch block
							try {
								const completion = await openai.completions.create({
									model: 'gpt-3.5-turbo-instruct',
									prompt: `expound on this snippet in about 300 words ${articleExtractorResponse2.data.data.description}`,
									temperature: 0.7,
									max_tokens: 400,
								});
								console.log('here is host 2 snippet before ai' + record2.snippet)


								aiContent2 = completion.choices && completion.choices[0] && completion.choices[0].text ? completion.choices[0].text.trim() : '';
								// Process aiContent...

							} catch (error) {
								console.error('Error during OpenAI API request:', error);
							}


							if (otherApiResponse.data.data.resultUrl !== null) {
								console.log('record returned' + otherApiResponse.data.data.resultUrl);
								console.log('record returned' + JSON.stringify(otherApiResponse.data.data));
								filteredDataWithTitle2.push({
									title: articleExtractorResponse2.data.data.title,
									url: otherApiResponse.data.data.resultUrl,
									description: articleExtractorResponse2.data.data.description,
									// description: record2.snippet,
									content: aiContent2
								});
							} else {
								console.log('record excluded' + otherApiResponse.data.data.resultUrl);
								console.log('record excluded' + JSON.stringify(otherApiResponse.data.data));
								noPictureFilteredDataWithTitle2.push({
									title: articleExtractorResponse2.data.data.title,
									url: coverImageUrl2,
									description: articleExtractorResponse2.data.data.description,
									content: aiContent2
								});
							}

							resolve();
						} catch (error) {
							console.error('Error processing task ID:', taskID, error);
							resolve();
						}
					}, REQUEST_DELAY);
				});
			} catch (error) {
				console.error('Error fetching cutout NUMBER 2:', error);
			}
		};
		await Promise.all(data2.map(record2 => processRecord2(record2, filteredDataWithTitle2, noPictureFilteredDataWithTitle2)));


		console.log('this is supposed to have everything including title = HOST2', JSON.stringify(filteredDataWithTitle2));

		const tempDirectoryInitiation = (os.tmpdir())
		const subDirectoryName = "localSportsHost";
		const tempDirectory = path.join(tempDirectoryInitiation, subDirectoryName);

// Check if the subdirectory already exists, and create it if not
		if (!fs.existsSync(tempDirectory)) {
			fs.mkdirSync(tempDirectory);
		}

		const tempDirectory2 = path.join(tempDirectory, 'host2');
		if (!fs.existsSync(tempDirectory2)) {
			fs.mkdirSync(tempDirectory2);
		}

		console.log('Is Number of images to process even there:', JSON.stringify(filteredDataWithTitle2));

		await processImages(filteredDataWithTitle2, tempDirectory2);

		console.log('something should be here' + filteredDataWithTitle2.length);


		// Send the combined response
		res.send({
			message: 'Location data and SerpApi response received successfully',
			signal: 'positive',
			geocodeData,
			serpApiResponseData: serpApiResponse.data,
			filteredDataWithTitle2,
			noPictureFilteredDataWithTitle2
		});
	} catch (error) {
		console.error(error);
		// Handle errors
		res.status(500).send({
			message: 'Error processing location data or SerpApi request',
			signal: 'negative',
		});
	}
});


/**
 * Executes the Query and fetches the news from the table
 * @param {*} catalystApp
 * @param {*} tablename
 */
function getNewsPaperYouthSportsFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select title,description, url, content from " + tablename + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperNILFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select title,description, url, content, video1, video2, video3  from " + tablename2 + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperSportsTechnologyStockFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select title,description, url, video1, video2, video3 content from " + tablename3 + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getBannerImageFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select url from " + tableName4 + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperYouthSportsNoGifFromCatalystDatStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select title,description, url, content from " + tablenameB + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperNILNoGifFromCatalystDatStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select title,description, url, content, video1, video2, video3 from " + tablename2B + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
			resolve(queryResponse);
		}).catch(err => {
			reject(err);
		})
	});

}

function getNewsPaperSportsTechnologyStockNoGifFromCatalystDataStore(catalystApp) {
	return new Promise((resolve, reject) => {
		//Queries the Catalyst Data Store table
		catalystApp.zcql().executeZCQLQuery("Select title,description, url, video1, video2, video3, content from " + tablename3B + " ORDER BY CREATEDTIME ASC").then(queryResponse => {
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







