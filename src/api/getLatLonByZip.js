const weatherUrl = process.env.REACT_APP_WEATHER_URL;
const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

export default async function getLatLonByZip(zip, country) {
	const url = `${weatherUrl}/geo/1.0/zip?zip=${zip},${!country ? 'US' : country}&appid=${weatherAPIKey}`;
	try {
		const response = await fetch(url);
		return response.json();
	} catch (e) {
		throw new Error('Unable to get Latitude and Longitude');
	}
}