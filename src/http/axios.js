import axios from "axios";

const instance = axios.create({
	baseURL: "https://us-central1-clone-23a9e.cloudfunctions.net/api" // Firebase Cloud Function API URL for production
});

// "http://localhost:5001/clone-23a9e/us-central1/api" - Firebase Cloud Function API URL for development

export default instance;
