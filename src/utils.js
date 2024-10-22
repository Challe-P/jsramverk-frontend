const baseURL = process.env.NODE_ENV === 'development' ? "http://localhost:1338" : "https://jsramverk-backend-vima23.azurewebsites.net";
const frontURL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://www.student.bth.se/~alpt22/editor/";
const mailgunAPIKey = "2d61a5bb446f919f18ae556d7c162970-784975b6-f20ad02e";
const mailgunDomain = 'sandbox221b06c405954522837e34feb6df0108.mailgun.org';
const mailgunURL = 'https://api.eu.mailgun.net';
const mailgunUtils = {
    apiKey: "2d61a5bb446f919f18ae556d7c162970-784975b6-f20ad02e",
    domain: 'sandbox221b06c405954522837e34feb6df0108.mailgun.org',
    URL: 'https://api.eu.mailgun.net'
}

export { baseURL, mailgunAPIKey, mailgunUtils, frontURL };
