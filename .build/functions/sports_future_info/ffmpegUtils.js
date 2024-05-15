const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path; // Import ffmpegPath
ffmpeg.setFfmpegPath(ffmpegPath); // Set ffmpeg path
const os = require("os");
const fs = require("fs");


function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}


async function convertToGif(inputPath) {

    const tempDirectoryInitiation = (os.tmpdir())
    const subDirectoryName = "host1";
    const tempDirectory = path.join(tempDirectoryInitiation, subDirectoryName);

// Check if the subdirectory already exists, and create it if not
    if (!fs.existsSync(tempDirectory)) {
        fs.mkdirSync(tempDirectory);
    }
    return new Promise((resolve, reject) => {
        const uniqueFilename = `${Date.now()}_${generateRandomString(10)}.gif`;
        const gifOutputPath = path.join(tempDirectory, uniqueFilename);

        ffmpeg(inputPath)
            .output(gifOutputPath)
            .outputFormat('gif')
            .on('end', () => {
                console.log(`File ${path.basename(gifOutputPath)} converted to GIF.`);
                resolve(gifOutputPath); // Resolve with the path to the converted GIF
            })
            .on('error', (err) => {
                console.error(`Error converting to GIF:`, err);
                reject(err);
            })
            .run();
    });
}

module.exports = {convertToGif}