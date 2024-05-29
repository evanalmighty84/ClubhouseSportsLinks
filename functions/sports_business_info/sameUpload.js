const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'duz4vhtcn',
    api_key: '922468697412882',
    api_secret: 'K-CAP3rlMC-ADlYo093CXaT_Jcc'
});

async function run() {
    try {
        const file = "https://cdn.videosdk.live/encoded/videos/664ec723c78c3edb1886110e.mp4";
        const result = await cloudinary.uploader.upload(file, { resource_type: 'video'});
        console.log(`Successfully uploaded video: ${file}`);
        console.log(`> Result: ${result.secure_url}`);
    } catch (e) {
        console.error(e);
    }
}
run()