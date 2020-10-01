import axios from "axios";

const instance = axios.create({
	baseURL: "..." // Firebase Cloud Function API URL
});

export default instance;
