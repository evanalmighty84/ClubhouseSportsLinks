//youthsportsNILCron

const os = require('os');
const catalyst = require("zcatalyst-sdk-node");
const axios = require("axios");
const fs = require('fs');
const OpenAI = require('openai');
const openai = new OpenAI({apiKey: ''});

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

} = require('./dataStore');
const {processImages} = require('./cloudinaryUtils.js');
const HOST = "https://newsdata.io/api/1/news?apikey=pub_2725118b8337e7726766351a827a6b8a70fc0&q=highschool&country=us&language=en"
//const HOST = "https://newsdata.io/api/1/news?apikey=pub_2725118b8337e7726766351a827a6b8a70fc0&language=en&category=sports&country=us&image=1&qInTitle=highschool";
const tbsParameter = 'tbs=qdr:d';
//const tbsParameter = 'tbs=qdr:m3'; the old last 3 month logic

// Make a request to the SerpApi API with the constructed query string
;
const HOST2 = `https://serpapi.com/search.json?engine=google&q=NIL&hl=en&gl=us&tbm=nws&api_key=c6d6040b5c1b4ef912b25737e2993d03afffac739d335cedff08e148a966036b&${tbsParameter}`;
const TABLENAME = "YouthSports";
const TABLENAMEB = "YouthSportsNoGif";
const TABLENAME2 = "NIL";
const TABLENAME2B = "NILNoGif";
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
	console.log('news articles FROM HOST1 for Youth Sports', data);

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
			console.log('article extractor response 1 is here for Youth Sports' + articleExtractorResponse.data.data.title + articleExtractorResponse.data.data.url + articleExtractorResponse.data.data.image);

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
			console.log('here is the first taskID for Youth Sports' + taskID);

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
						console.log('Total response from cutOUT TO GET PICTURES: for youth sports', otherApiResponse.data);
						const completion = await openai.completions.create({
							model: 'gpt-3.5-turbo-instruct',
							prompt: `Can you summarize or expound on this in about 300 words  ${articleExtractorResponse.data.data.description}`,
							temperature: 0.7,
							max_tokens: 400,
						});
						const aiContent = completion.choices && completion.choices[0] && completion.choices[0].text ? completion.choices[0].text.trim() : '';

						if (otherApiResponse.data.data.resultUrl !== null) {
							console.log('record returned for youth sports' + otherApiResponse.data.data.resultUrl);
							console.log('record returned for youth sports' + JSON.stringify(otherApiResponse.data.data));
							filteredDataWithTitle.push({
								title: articleExtractorResponse.data.data.title,
								url: otherApiResponse.data.data.resultUrl,
								title: articleExtractorResponse.data.data.title,
								content: aiContent
							});
						} else {
							console.log('record excluded for youth sports no gif' + otherApiResponse.data.data.resultUrl);
							console.log('record excluded for youth sports no gif' + JSON.stringify(otherApiResponse.data.data));
							noPictureFilteredDataWithTitle.push({
								title: articleExtractorResponse.data.data.title,
								url: coverImageUrl,
								title: articleExtractorResponse.data.data.description,
								content: aiContent
							});
						}

						resolve();
					} catch (error) {
						console.error('Error processing task ID for youth sports:', taskID, error);
						resolve();
					}
				}, REQUEST_DELAY);
			});
		} catch (error) {
			console.error('Error fetching cutout NUMBER 1 for youth sports:', error);
		}
	};

// Usage inside your loop
	await Promise.all(data.map(record => processRecord(record, filteredDataWithTitle, noPictureFilteredDataWithTitle)));


	console.log('this is supposed to have everything including title for youth sports', JSON.stringify(filteredDataWithTitle));
	console.log('this is supposed to have everything including title for youth sports NOGIF', JSON.stringify(noPictureFilteredDataWithTitle));


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


	console.log('Is Number of images to process even there FOR youth sports:', JSON.stringify(filteredDataWithTitle));
	console.log('Is Number of images to process even there FOR youth sports NO GIF  :', JSON.stringify(noPictureFilteredDataWithTitle));


	await processImages(filteredDataWithTitle, tempDirectory);




	//const chunk = filteredDataWithTitle.splice(0, DATASTORE_LOAD);

	await pushNewstoDatastore({table, articles: filteredDataWithTitle, rowIds});
	await pushNewstoDatastoreB({tableB, articles: noPictureFilteredDataWithTitle, rowIdsB});

	const response2 = await axios({
		method: "GET",
		url: HOST2,
	});
	let data2 = response2.data.news_results
	console.log('news articles = HOST2 NIL', data2);

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
			console.log('article extractor response 2 is here for NIL' + articleExtractorResponse2.data.data.title + articleExtractorResponse2.data.data.url + articleExtractorResponse2.data.data.image);

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
			console.log('here is the 2nd taskID for NIL' + taskID);

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
						console.log('Total response from cutOUT2 TO GET PICTURES for NIL:', otherApiResponse.data);


						let aiContent2;  // Declare the variable outside the try-catch block
						try {
							const completion = await openai.completions.create({
								model: 'gpt-3.5-turbo-instruct',
								prompt: `expound on this snippet in about 300 words ${articleExtractorResponse2.data.data.description}`,
								temperature: 0.7,
								max_tokens: 400,
							});
							console.log('here is host 2 snippet before ai for NIL' + record2.snippet)


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
							const response = await axios.get(`https://serpapi.com/search.json?engine=google&q=${articleExtractorResponse2.data.data.title}&hl=en&gl=us&tbm=vid&api_key=c6d6040b5c1b4ef912b25737e2993d03afffac739d335cedff08e148a966036b`);
							const videoResults = response.data.video_results;

							// Extract the first three link values
							for (let i = 0; i < Math.min(3, videoResults.length); i++) {
								const videoLink = videoResults[i].link;
								const embedLink = convertWatchToEmbed(videoLink);
								videoContent.push(embedLink);
							}
						} catch (error) {
							console.error('error getting serp youtube api request for NIL', error);
						}

						if (otherApiResponse.data.data.resultUrl !== null) {
							console.log('record returned for NIL' + otherApiResponse.data.data.resultUrl);
							console.log('record returned for NIL' + JSON.stringify(otherApiResponse.data.data));
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
							console.log('record excluded for NIL NOGIF' + otherApiResponse.data.data.resultUrl);
							console.log('record excluded for NIL NOGIF' + JSON.stringify(otherApiResponse.data.data));
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
						console.error('Error processing task ID for NIL:', taskID, error);
						resolve();
					}
				}, REQUEST_DELAY);
			});
		} catch (error) {
			console.error('Error fetching cutout NUMBER 2 for NIL:', error);
		}
	};


	await Promise.all(data2.map(record2 => processRecord2(record2, filteredDataWithTitle2, noPictureFilteredDataWithTitle2)))

	// console.log('this is supposed to have everything including title = HOST2', JSON.stringify(filteredDataWithTitle2));
	const table2 = datastoreAPI.table(TABLENAME2);
	const table2B = datastoreAPI.table(TABLENAME2B);
	let rowIds2 = [];
	let rowIds2B = [];
	const tempDirectory2 = path.join(tempDirectory, 'host2'); // Specify subfolder name here
	if (!fs.existsSync(tempDirectory2)) {
		fs.mkdirSync(tempDirectory2);
	}


	console.log('Is Number of images to process even there for NIL:', JSON.stringify(filteredDataWithTitle2));
	console.log('Is Number of images to process even there for NIL NO GIF:', JSON.stringify(noPictureFilteredDataWithTitle2));


	await processImages(filteredDataWithTitle2, tempDirectory2);



	await pushNewstoDatastore2({table2, articles: filteredDataWithTitle2, rowIds2});
	await pushNewstoDatastore2B({table2B, articles: noPictureFilteredDataWithTitle2, rowIds2B});


	//Sports Technology Section


}




