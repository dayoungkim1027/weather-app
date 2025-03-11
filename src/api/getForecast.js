const weatherUrl = process.env.REACT_APP_WEATHER_URL;
const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY;

export default async function getForecast(lat, lon) {
	const url = `${weatherUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}`;
	try {
		const response = await fetch(url);
		return response.json();
	} catch (e) {
		throw new Error('Unable to get Forecast');
	}
}