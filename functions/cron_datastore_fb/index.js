const os = require('os');
const catalyst = require("zcatalyst-sdk-node");
const axios = require("axios");
const fs = require('fs');
const OpenAI = require('openai');
const openai = new OpenAI({apiKey: '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'});
const FB = require('fb');

// Now you can use the 'openai' object for API calls

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg');
const path = require('path');
const urlParser = require('url-parse');
const rateLimit = require('axios-rate-limit');
const {promisify} = require('util');


// Now you can use PQueue in your code

const {
	pushNewstoDatastore,
	pushNewstoDatastore2,
	pushNewstoDatastore2B,
	pushNewstoDatastoreB,
	pushNewstoDatastore3,
	pushNewstoDatastore3B
} = require('./dataStore.js');
const {processImages} = require('./cloudinaryUtils');

const HOST = "https://newsdata.io/api/1/news?apikey=pub_2725118b8337e7726766351a827a6b8a70fc0&language=en&category=sports&country=us&q=ceo";
const HOST2 = "https://serpapi.com/search.json?engine=google&q=sports technology&hl=en&gl=us&tbm=nws&api_key=674d023b72e91fcdf3da14c730387dcbdb611f548e094bfeab2fff5bd86493fe";
const HOST3 = "https://serpapi.com/search.json?engine=google&q=sports technology stock&hl=en&gl=us&tbm=nws&api_key=674d023b72e91fcdf3da14c730387dcbdb611f548e094bfeab2fff5bd86493fe";

const TABLENAME = "SportsOwnership";
const TABLENAMEB = "SportsOwnershipNoGif";
const TABLENAME2 = "SportsTechnology";
const TABLENAME2B = "SportsTechnologyNoGif";
const TABLENAME3 = "SportsTechnologyStock";
const TABLENAME3B = "SportsTechnologyStockNoGif";
const TABLENAME4B = "NILNoGif";  //for facebook post even though it is in yourthsportsnil function
const TABLENAME5B = "YouthSportsNoGif"; //for facebook post even though it is in yourthsportsnil function


const CUTOUT_API = "https://www.cutout.pro/api/v1/faceDriven/submitTaskByUrl";
const APIKEY = "4b23eb682b7f4a568ff129222fe0430e";
const ARTICLE_EXCTRACTOR_API_KEY = '9ff9fb1df5msh3ac2257f975bef0p104dcfjsnb2d4a840d34d';
const ARTICLE_EXCTRACTOR_API_HOST = 'article-extractor2.p.rapidapi.com';
const REQUEST_DELAY = 5000; // 5 seconds







module.exports = async (_cronDetails, context) => {

	const catalystApp = catalyst.initialize(context);
	const datastoreAPI = catalystApp.datastore();


	const response = await axios({
		method: "GET",
		url: HOST,
	});

	let data = response.data.results;
	console.log('news articles FROM HOST1 Sports', data);

	let filteredDataWithTitle = [];
	let noPictureFilteredDataWithTitle = [];


	const processRecord = async (record, filteredDataWithTitle, noPictureFilteredDataWithTitle) => {
		try {
			const articleExtractorOptions = {
				method: 'GET',
				url: 'https://article-extractor2.p.rapidapi.com/article/parse',
				params: {
					url: record.link, word_per_minute: '300',
					desc_truncate_len: '210',
					desc_len_min: '180',
					content_len_min: '200'
				},
				headers: {
					'X-RapidAPI-Key': ARTICLE_EXCTRACTOR_API_KEY,
					'X-RapidAPI-Host': ARTICLE_EXCTRACTOR_API_HOST
				}
			};

			const articleExtractorResponse = await axios.request(articleExtractorOptions);
			console.log('article extractor response 1 is here' + articleExtractorResponse.data.data.title + articleExtractorResponse.data.data.url + articleExtractorResponse.data.data.image);

			const coverImageUrl = articleExtractorResponse.data.data.image;
			const cutoutResponse = await axios.get(CUTOUT_API, {
				params: {
					imageUrl: coverImageUrl,
					templateId: 2,
				},
				headers: {
					APIKEY: APIKEY,
				},
			});

			const taskID = cutoutResponse.data.data;
			console.log('here is the first taskID' + taskID);

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
						console.log('Total response from cutOUT TO GET PICTURES:', otherApiResponse.data);
						const completion = await openai.completions.create({
							model: 'gpt-3.5-turbo-instruct',
							prompt: `Can you summarize or expound on this in about 300 words  ${articleExtractorResponse.data.data.description}`,
							temperature: 0.7,
							max_tokens: 400,
						});
						const aiContent = completion.choices && completion.choices[0] && completion.choices[0].text ? completion.choices[0].text.trim() : '';

						let videoContent = [];

						function convertWatchToEmbed(watchUrl) {
							const videoId = watchUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
							const embedUrl = `https://www.youtube.com/embed/${videoId}`;
							return embedUrl;
						}

						try {
							const response = await axios.get(`https://serpapi.com/search.json?engine=google&q=${articleExtractorResponse.data.data.title}&hl=en&gl=us&tbm=vid&api_key=674d023b72e91fcdf3da14c730387dcbdb611f548e094bfeab2fff5bd86493fe`);
							const videoResults = response.data.video_results;
							console.log(videoResults, 'Here are the sports ownership video results')

							// Extract the first three link values
							for (let i = 0; i < Math.min(3, videoResults.length); i++) {
								const videoLink = videoResults[i].link;
								const embedLink = convertWatchToEmbed(videoLink);
								videoContent.push(embedLink);
							}
						} catch (error) {
							console.error('error getting serp youtube Sports Ownership api request', error);
						}

						if (otherApiResponse.data.data.resultUrl !== null) {
							console.log('record returned' + otherApiResponse.data.data.resultUrl);
							console.log('record returned' + JSON.stringify(otherApiResponse.data.data));
							filteredDataWithTitle.push({
								title: articleExtractorResponse.data.data.title,
								url: otherApiResponse.data.data.resultUrl,
								description: articleExtractorResponse.data.data.description,
								video1: videoContent[0],
								video2: videoContent[1],
								video3: videoContent[2],
								content: aiContent
							});
						} else {
							console.log('record excluded' + otherApiResponse.data.data.resultUrl);
							console.log('record excluded' + JSON.stringify(otherApiResponse.data.data));
							noPictureFilteredDataWithTitle.push({
								title: articleExtractorResponse.data.data.title,
								url: coverImageUrl,
								description: articleExtractorResponse.data.data.description,
								video1: videoContent[0],
								video2: videoContent[1],
								video3: videoContent[2],
								content: aiContent
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
			console.error('Error fetching cutout NUMBER 1:', error);
		}
	};

// Usage inside your loop
	await Promise.all(data.map(record => processRecord(record, filteredDataWithTitle, noPictureFilteredDataWithTitle)));


	console.log('this is supposed to have everything including title', JSON.stringify(filteredDataWithTitle));


	const table = datastoreAPI.table(TABLENAME);
	const tableB = datastoreAPI.table(TABLENAMEB);
	let rowIds = [];
	let rowIdsB = [];

	const tempDirectoryInitiation = (os.tmpdir())
	const subDirectoryName = "host1";
	const tempDirectory = path.join(tempDirectoryInitiation, subDirectoryName);

// Check if the subdirectory already exists, and create it if not
	if (!fs.existsSync(tempDirectory)) {
		fs.mkdirSync(tempDirectory);
	}


	console.log('Is Number of images to process even there for sports Ownership:', JSON.stringify(filteredDataWithTitle));
	console.log('this is supposed to have everything including titl for Sports Ownership', JSON.stringify(noPictureFilteredDataWithTitle));

	await processImages(filteredDataWithTitle, tempDirectory);





	//const chunk = filteredDataWithTitle.splice(0, DATASTORE_LOAD);
	console.log('something should be here' + filteredDataWithTitle.length)
	await pushNewstoDatastore({table, articles: filteredDataWithTitle, rowIds});
	await pushNewstoDatastoreB({tableB, articles: noPictureFilteredDataWithTitle, rowIdsB});

	const response2 = await axios({
		method: "GET",
		url: HOST2,
	});
	let data2 = response2.data.news_results
	console.log('news articles = HOST2 Sports Technology', data2);

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
			console.log('article extractor response 2 is here for Sports Technology' + articleExtractorResponse2.data.data.title + articleExtractorResponse2.data.data.url + articleExtractorResponse2.data.data.image);

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
						console.log('Total response from cutOUT2 TO GET PICTURES for Sports Technology:', otherApiResponse.data);


						let aiContent2;  // Declare the variable outside the try-catch block
						try {
							const completion = await openai.completions.create({
								model: 'gpt-3.5-turbo-instruct',
								prompt: `expound on this snippet in about 300 words ${articleExtractorResponse2.data.data.description}`,
								temperature: 0.7,
								max_tokens: 400,
							});
							console.log('here is host 2 snippet before ai for Sports Technology' + record2.snippet)


							aiContent2 = completion.choices && completion.choices[0] && completion.choices[0].text ? completion.choices[0].text.trim() : '';
							// Process aiContent...

						} catch (error) {
							console.error('Error during OpenAI API request:', error);
						}


						let videoContent = [];

						function convertWatchToEmbed(watchUrl) {
							const videoId = watchUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
							const embedUrl = `https://www.youtube.com/embed/${videoId}`;
							return embedUrl;
						}

						try {
							const response = await axios.get(`https://serpapi.com/search.json?engine=google&q=${articleExtractorResponse2.data.data.title}&hl=en&gl=us&tbm=vid&api_key=674d023b72e91fcdf3da14c730387dcbdb611f548e094bfeab2fff5bd86493fe`);
							const videoResults = response.data.video_results;

							// Extract the first three link values
							for (let i = 0; i < Math.min(3, videoResults.length); i++) {
								const videoLink = videoResults[i].link;
								const embedLink = convertWatchToEmbed(videoLink);
								videoContent.push(embedLink);
							}
						} catch (error) {
							console.error('error getting serp youtube api request for Sports Technology', error);
						}

						if (otherApiResponse.data.data.resultUrl !== null) {
							console.log('record returned' + otherApiResponse.data.data.resultUrl);
							console.log('record returned' + JSON.stringify(otherApiResponse.data.data));
							filteredDataWithTitle2.push({
								title: articleExtractorResponse2.data.data.title,
								url: otherApiResponse.data.data.resultUrl,
								description: articleExtractorResponse2.data.data.description,
								video1: videoContent[0],
								video2: videoContent[1],
								video3: videoContent[2],
								content: aiContent2
							});
							console.log('VIDEO 1:', filteredDataWithTitle2[filteredDataWithTitle2.length - 1].video1);
							console.log('VIDEO 2:', filteredDataWithTitle2[filteredDataWithTitle2.length - 1].video2);
							console.log('VIDEO 3:', filteredDataWithTitle2[filteredDataWithTitle2.length - 1].video3);
						} else {
							console.log('record excluded' + otherApiResponse.data.data.resultUrl);
							console.log('record excluded' + JSON.stringify(otherApiResponse.data.data));
							noPictureFilteredDataWithTitle2.push({
								title: articleExtractorResponse2.data.data.title,
								url: coverImageUrl2,
								description: articleExtractorResponse2.data.data.description,
								video1: videoContent[0],
								video2: videoContent[1],
								video3: videoContent[2],
								content: aiContent2
							});
							console.log('VIDEO 1:', noPictureFilteredDataWithTitle2[noPictureFilteredDataWithTitle2.length - 1].video1);
							console.log('VIDEO 2:', noPictureFilteredDataWithTitle2[noPictureFilteredDataWithTitle2.length - 1].video2);
							console.log('VIDEO 3:', noPictureFilteredDataWithTitle2[noPictureFilteredDataWithTitle2.length - 1].video3);
						}


						resolve();
					} catch (error) {
						console.error('Error processing task ID for Sports Technology:', taskID, error);
						resolve();
					}
				}, REQUEST_DELAY);
			});
		} catch (error) {
			console.error('Error fetching cutout NUMBER 2 Sporst Technology:', error);
		}
	};


	await Promise.all(data2.map(record2 => processRecord2(record2, filteredDataWithTitle2, noPictureFilteredDataWithTitle2)))

	console.log('this is supposed to have everything including title = HOST2 Sports Technology', JSON.stringify(filteredDataWithTitle2));
	const table2 = datastoreAPI.table(TABLENAME2);
	const table2B = datastoreAPI.table(TABLENAME2B);
	let rowIds2 = [];
	let rowIds2B = [];
	const tempDirectory2 = path.join(tempDirectory, 'host2'); // Specify subfolder name here
	if (!fs.existsSync(tempDirectory2)) {
		fs.mkdirSync(tempDirectory2);
	}


	console.log('Is Number of images to process even there for Sports Technology:', JSON.stringify(filteredDataWithTitle2));
	console.log('Is Number of images to process even there for Sports Technology NO GIF:', JSON.stringify(noPictureFilteredDataWithTitle2));


	await processImages(filteredDataWithTitle2, tempDirectory2);



	await pushNewstoDatastore2({table2, articles: filteredDataWithTitle2, rowIds2});
	await pushNewstoDatastore2B({table2B, articles: noPictureFilteredDataWithTitle2, rowIds2B});

//Sports Technology Stock Section
	const response3 = await axios({
		method: "GET",
		url: HOST3,
	});
	let data3 = response3.data.news_results
	console.log('news articles = HOST3 Sports Technology Stock', data3);

	let filteredDataWithTitle3 = [];
	let noPictureFilteredDataWithTitle3 = [];


	const processRecord3 = async (record3, filteredDataWithTitle3, noPictureFilteredDataWithTitle3) => {
		try {
			const artiicleExtractorOptions3 = {
				method: 'GET',
				url: 'https://article-extractor2.p.rapidapi.com/article/parse',
				params: {
					url: record3.link, word_per_minute: '300',
					desc_truncate_len: '210',
					desc_len_min: '180',
					content_len_min: '200'
				},
				headers: {
					'X-RapidAPI-Key': ARTICLE_EXCTRACTOR_API_KEY,
					'X-RapidAPI-Host': ARTICLE_EXCTRACTOR_API_HOST
				}
			};

			const articleExtractorResponse3 = await axios.request(artiicleExtractorOptions3);
			console.log('article extractor response 3 for Sports Technology Stock is here' + articleExtractorResponse3.data.data.title + articleExtractorResponse3.data.data.url + articleExtractorResponse3.data.data.image);

			const coverImageUrl3 = articleExtractorResponse3.data.data.image;
			const cutoutResponse3 = await axios.get(CUTOUT_API, {
				params: {
					imageUrl: coverImageUrl3,
					templateId: 2,
				},
				headers: {
					APIKEY: APIKEY,
				},
			});

			const taskID = cutoutResponse3.data.data;
			console.log('here is the 3rd taskID' + taskID);

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
						console.log('Total response from cutOUT3 Sports Technology Stock TO GET PICTURES:', otherApiResponse.data);


						let aiContent3;  // Declare the variable outside the try-catch block
						try {
							const completion = await openai.completions.create({
								model: 'gpt-3.5-turbo-instruct',
								prompt: `expound on this snippet in about 300 words ${articleExtractorResponse3.data.data.description}`,
								temperature: 0.7,
								max_tokens: 400,
							});
							console.log('here is host 3 snippet before ai for Sports Technology Stock' + record3.snippet)


							aiContent3 = completion.choices && completion.choices[0] && completion.choices[0].text ? completion.choices[0].text.trim() : '';
							// Process aiContent...

						} catch (error) {
							console.error('Error during OpenAI API request:', error);
						}


						let videoContent = [];

						function convertWatchToEmbed(watchUrl) {
							const videoId = watchUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
							const embedUrl = `https://www.youtube.com/embed/${videoId}`;
							return embedUrl;
						}

						try {
							const response = await axios.get(`https://serpapi.com/search.json?engine=google&q=${articleExtractorResponse3.data.data.title}&hl=en&gl=us&tbm=vid&api_key=674d023b72e91fcdf3da14c730387dcbdb611f548e094bfeab2fff5bd86493fe`);
							const videoResults = response.data.video_results;

							// Extract the first three link values
							for (let i = 0; i < Math.min(3, videoResults.length); i++) {
								const videoLink = videoResults[i].link;
								const embedLink = convertWatchToEmbed(videoLink);
								videoContent.push(embedLink);
							}
						} catch (error) {
							console.error('error getting serp youtube api request', error);
						}

						if (otherApiResponse.data.data.resultUrl !== null) {
							console.log('record returned' + otherApiResponse.data.data.resultUrl);
							console.log('record returned' + JSON.stringify(otherApiResponse.data.data));
							filteredDataWithTitle3.push({
								title: articleExtractorResponse3.data.data.title,
								url: otherApiResponse.data.data.resultUrl,
								description: articleExtractorResponse3.data.data.description,
								video1: videoContent[0],
								video2: videoContent[1],
								video3: videoContent[2],
								content: aiContent3
							});
							console.log('VIDEO 1:', filteredDataWithTitle2[filteredDataWithTitle2.length - 1].video1);
							console.log('VIDEO 2:', filteredDataWithTitle2[filteredDataWithTitle2.length - 1].video2);
							console.log('VIDEO 3:', filteredDataWithTitle2[filteredDataWithTitle2.length - 1].video3);
						} else {
							console.log('record excluded' + otherApiResponse.data.data.resultUrl);
							console.log('record excluded' + JSON.stringify(otherApiResponse.data.data));
							noPictureFilteredDataWithTitle3.push({
								title: articleExtractorResponse3.data.data.title,
								url: coverImageUrl3,
								description: articleExtractorResponse3.data.data.description,
								video1: videoContent[0],
								video2: videoContent[1],
								video3: videoContent[2],
								content: aiContent3
							});
							console.log('VIDEO 1:', noPictureFilteredDataWithTitle3[noPictureFilteredDataWithTitle3.length - 1].video1);
							console.log('VIDEO 2:', noPictureFilteredDataWithTitle3[noPictureFilteredDataWithTitle3.length - 1].video2);
							console.log('VIDEO 3:', noPictureFilteredDataWithTitle3[noPictureFilteredDataWithTitle3.length - 1].video3);
						}

						resolve();
					} catch (error) {
						console.error('Error processing task ID for Sports Technology Stock:', taskID, error);
						resolve();
					}
				}, REQUEST_DELAY);
			});
		} catch (error) {
			console.error('Error fetching cutout NUMBER 3 Sports Technology Stock:', error);
		}
	};


	await Promise.all(data3.map(record3 => processRecord3(record3, filteredDataWithTitle3, noPictureFilteredDataWithTitle3)))

	console.log('this is supposed to have everything including title = HOST3', JSON.stringify(filteredDataWithTitle3));
	const table3 = datastoreAPI.table(TABLENAME3);
	const table3B = datastoreAPI.table(TABLENAME3B);
	let rowIds3 = [];
	let rowIds3B = [];
	const tempDirectory3 = path.join(tempDirectory, 'host3'); // Specify subfolder name here
	if (!fs.existsSync(tempDirectory3)) {
		fs.mkdirSync(tempDirectory3);
	}


	console.log('Is Number of images to process even for SportsTechnology Stock:', JSON.stringify(filteredDataWithTitle3));
	console.log('Is Number of images to process even for SportsTechnology Stock NO GIF:', JSON.stringify(noPictureFilteredDataWithTitle3));


	await processImages(filteredDataWithTitle3, tempDirectory3);



	await pushNewstoDatastore3({table3, articles: filteredDataWithTitle3, rowIds3});
	await pushNewstoDatastore3B({table3B, articles: noPictureFilteredDataWithTitle3, rowIds3B});







	async function postToFacebook(title, description, url, accessToken) {
		console.log('CALLING FACEBOOK NOW!')
		try {
			const clubhouseUrl = 'www.clubhousesportslink.com/app';
			const message = `${title}\n\n${description}\n\nRead more: ${clubhouseUrl}`;
			console.log('Message to be posted to Facebook:', message);
			const requestData = {
				message: message,
				published:true,
				url: url,
				link: clubhouseUrl,
				access_token: accessToken
			};
			console.log('Request data:', requestData);

			const response = await axios.post(`https://graph.facebook.com/v19.0/108626537407227/photos`, requestData);
			console.log('Posted to Facebook:', response.data);
		} catch (error) {
			console.error('Failed to post to Facebook:', error.response.data);
		}
	}

	function getFirstEntryFromTable(catalystApp, tableName) {
		return new Promise((resolve, reject) => {
			// Queries the Catalyst Data Store table
			catalystApp.zcql().executeZCQLQuery(`SELECT title, description, url FROM ${tableName} ORDER BY CREATEDTIME ASC LIMIT 0, 1`)
				.then(queryResponse => {
					resolve(queryResponse);
				})
				.catch(err => {
					reject(err);
				});
		});
	}



	console.log('Fetching data from tables...');

	Promise.all([
		getFirstEntryFromTable(catalystApp, TABLENAMEB),
		getFirstEntryFromTable(catalystApp, TABLENAME2B),
		getFirstEntryFromTable(catalystApp, TABLENAME3B),
		getFirstEntryFromTable(catalystApp, TABLENAME4B),
		getFirstEntryFromTable(catalystApp, TABLENAME5B)
	])
		.then(([_, SportsOwnershipNoGif, SportsTechnologyNoGif, SportsTechnologyStockNoGif, NILNoGif, YouthSportsNoGif]) => {
			// Ensure each resolved value is an array or assign an empty array if undefined
			SportsOwnershipNoGif = SportsOwnershipNoGif || [];
			SportsTechnologyNoGif = SportsTechnologyNoGif || [];
			SportsTechnologyStockNoGif = SportsTechnologyStockNoGif || [];
			NILNoGif = NILNoGif || [];
			YouthSportsNoGif = YouthSportsNoGif || [];

			const combinedResponse = {
				"message": "First entry from each table retrieved successfully",
				"signal": "positive",
				"FirstEntryFromSportsOwnershipNoGif": SportsOwnershipNoGif.length > 0 ? SportsOwnershipNoGif[0] : null,
				"FirstEntryFromSportsTechnologyNoGif": SportsTechnologyNoGif.length > 0 ? SportsTechnologyNoGif[0] : null,
				"FirstEntryFromSportsTechnologyStockNoGif": SportsTechnologyStockNoGif.length > 0 ? SportsTechnologyStockNoGif[0] : null,
				"FirstEntryFromNILNoGif": NILNoGif.length > 0 ? NILNoGif[0] : null,
				"FirstEntryFromYouthSportsNoGif": YouthSportsNoGif.length > 0 ? YouthSportsNoGif[0] : null
			};

			console.log('Combined response:', combinedResponse);

			const accessToken = 'EAAOWBqVKxLYBOzusszwKeZA7kNeCihsuJ6c19vAIm1edeJbZAB2Y2hvFmdTvpbGIaGF9tHWZA5ZCZCZB9nHagb2FWfE4DUV9M6oZBjJJ3kkBdDZCj5Ta5vZCcZBfvWUrayeXHwk4ZAegRJamaMpiu7X1WCZAn5zQIydBthNboe6CbBZAAAkiOEf8mCVrLngZDZD';
			const url = 'www.sportsclubhouselink.com';

			// Collect promises for all posts
			const postPromises = [];
			for (const entry of Object.values(combinedResponse)) {
				if (entry) {
					// Define an array of keys corresponding to the nested objects you want to process
					const nestedKeys = [, 'SportsOwnershipNoGif',  'SportsTechnologyNoGif', 'SportsTechnologyStockNoGif',  'NILNoGif', 'YouthSportsNoGif']

					// Iterate over each nested key
					for (const key of nestedKeys) {
						const nestedEntry = entry[key];
						if (nestedEntry) {
							console.log('Processing entry for Facebook posting:', nestedEntry.title);
							const {title, description, url} = nestedEntry;
							postPromises.push(postToFacebook(title, description, url, accessToken));
						} else {
							console.log('Invalid entry for key:', key);
						}
					}
				} else {
					console.log('Invalid entry:', entry);
				}
			}

			// Wait for all posts to complete
			return Promise.all(postPromises);
		})
		.then(() => {
			console.log('All posts completed successfully.');
		})
		.catch(err => {
			console.error(err);
		});



}




