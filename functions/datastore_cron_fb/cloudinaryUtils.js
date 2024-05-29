const axios = require('axios');
const fs = require('fs');
const path = require('path');
const urlParser = require('url-parse');
const {convertToGif} = require('./ffmpegUtils.js');
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'duz4vhtcn',
    api_key: '922468697412882',
    api_secret: 'K-CAP3rlMC-ADlYo093CXaT_Jcc'
});

const processImages = async (filteredDataWithTitle, tempDirectory) => {
    for (const image of filteredDataWithTitle) {
        if (image.url) {
            try {
                const imageUrl = image.url;
                const index = filteredDataWithTitle.indexOf(image);
                const parsedUrl = urlParser(imageUrl);
                const filename = `${index}.mp4`;
                const downloadPath = path.join(tempDirectory, filename);

                if (!fs.existsSync(tempDirectory)) {
                    fs.mkdirSync(tempDirectory);
                }

                const imageResponse = await axios.get(parsedUrl.href, {
                    responseType: 'stream',
                    headers: {
                        'Accept': 'video/*',
                    }
                });

                const outputStream = fs.createWriteStream(downloadPath);

                imageResponse.data.pipe(outputStream);

                await new Promise((resolve, reject) => {
                    outputStream.on('finish', async () => {
                        console.log(`File ${filename} downloaded successfully.`);

                        try {
                            const convertedGifPath = await convertToGif(downloadPath);
                            console.log(`File ${filename} converted to GIF.`);

                            console.log('this is the file being uploaded ' + path.basename(convertedGifPath));

                            const uploadResult = await cloudinary.uploader.upload(String(convertedGifPath), {public_id: `gif_Host1_${index}`});

                            console.log('File uploaded to Cloudinary:', uploadResult);
                            image.url = uploadResult.secure_url;

                        } catch (error) {
                            console.error(`Error converting ${filename} to GIF:`, error);
                        }
                        resolve();
                    });

                    outputStream.on('error', (err) => {
                        console.error(`Error while writing the file ${filename}:`, err);
                        reject(err);
                    });
                });
            } catch (error) {
                console.error(`Error downloading the file ${filename}:`, error);
            }
        }
    }
};


module.exports = {
    processImages
};
