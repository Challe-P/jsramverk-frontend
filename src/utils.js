const baseURL = process.env.NODE_ENV === "development" ? "http://localhost:1338" : "https://jsramverk-backend-vima23.azurewebsites.net";
const frontURL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://www.student.bth.se/~alpt22/editor/";

export { baseURL, frontURL };
