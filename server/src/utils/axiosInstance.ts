import axios from "axios";
import config from '../config/config';




export default  axios.create({
	baseURL: config.BASEURL,
	headers: {
		'Content-Type': 'application/json',
			Authorization: `Bearer ${config.TOKEN}`
	},
});