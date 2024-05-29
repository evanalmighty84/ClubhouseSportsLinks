// URL for webhook
const webhookUrl = " https://aliencity-809404625.development.catalystserverless.com/server/sports_business_info/api/webhook";

// directory path to store recording
const awsDirPath = "path/to/file";

const config = {
    // Layout Configuration
    layout: {
        type: "GRID", // "SPOTLIGHT" | "SIDEBAR",  Default : "GRID"
        priority: "SPEAKER", // "PIN", Default : "SPEAKER"
        gridSize: 4, // MAX : 4
    },

    // Theme of recording
    theme: "DARK", //  "LIGHT" | "DEFAULT"

    // `mode` is used to either record video & audio both or only audio.
    mode: "video-and-audio", // "audio", Default : "video-and-audio"

    // Quality of recording and is only applicable to `video-and-audio` type mode.
    quality: "high", // "low" | "med",  Default : "med"

    // This mode refers to orientation of recording.
    // landscape : Record the meeting in horizontally
    // portrait : Record the meeting in vertically (Best for mobile view)
    orientation: "landscape", // "portrait",  Default : "landscape"
};

// Post Transcription Configuration
const transcription = {
    enabled: true, // Enables post transcription
    summary: {
        enabled: true, // Enables summary generation

        // Guides summary generation
        prompt:
            "Write summary in sections like Title, Agenda, Speakers, Action Items, Outlines, Notes and Summary",
    },
};

import fetch from 'node-fetch';
const options = {
    method: "POST",
    headers: {
        "Authorization": "$YOUR_TOKEN",
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "roomId" : "abcd-efgh-ijkl",
        "templateUrl" : "https://www.example.com/?token=token&meetingId=74v5-v21l-n1ey&participantId=RECORDER_ID",
        "transcription" : "transcriptionObj",
        "config" : "configObj",
        "webhookUrl" : "https://aliencity-809404625.development.catalystserverless.com/server/sports_business_info/api/webhook",
        "awsDirPath" : "s3path",
        "preSignedUrl" : "preSignedUrl"
    }),
};
const url= `https://api.videosdk.live/v2/recordings/start`;
const response = await fetch(url, options);
const data = await response.json();
console.log(data);