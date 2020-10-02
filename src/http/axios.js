import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5001/clone-23a9e/us-central1/api" // Firebase Cloud Function API URL
});

export default instance;
