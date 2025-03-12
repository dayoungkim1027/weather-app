import styled from 'styled-components';
import Sunny from '../assets/sun.png';
import Cloudy from '../assets/cloudy.png';
import Foggy from '../assets/fog.png';
import Haze from '../assets/haze.png';
import Lightening from '../assets/lightening.png';
import Rainy from '../assets/rainy.png';
// import Windy from '../assets/windy.png';
import Snowy from '../assets/snowy.png';
import Unknown from '../assets/unknown.png';

import './home.css';
import getLatLonByZip from '../api/getLatLonByZip';
import getForecast from '../api/getForecast';
import { useEffect, useRef, useState } from 'react';


const OuterDiv = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`

const MainDiv = styled.div`
	display: flex;
	flex-direction: row;

	@media (max-width: 1040px) {
		flex-direction: column;
		flex-grow: 1;
	}
`

const WeatherContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const SearchInput = styled.input`
	border: none;
	height: 8%;
	border-radius: 15px;
	margin: 2rem;
	padding: 1rem 2rem;
	font-size: 30px;
`

const WeatherNowDisplay = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1rem 3rem;
	justify-content: space-between;

	@media (max-width: 685px) {
		flex-direction: column;
	}
`

const ForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem;
	border-radius: 15px;
`

const AirQualities = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 2rem 2rem;
	border-radius: 15px;
`

const SettingsPanel = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin: 2rem 0 2rem 2rem;
	border-radius: 15px;

	@media (max-width: 1040px) {
		flex-direction: row;
		margin: 2rem 2rem 0;
		padding: 0;
	}
`

const SevenDayForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem 1rem 2rem 0;
	border-radius: 15px;

	@media (max-width: 1040px) {
		margin: 0 2rem 2rem 2rem;
	}
`

const CityInfo = styled.div`
	display: flex;
	flex-direction: column;
`
const WeatherIcon = styled.div`
	display: flex;
	justify-content: end;
`
const CityName = styled.h3`
	margin: 0 0 1rem;
  font-size: 4em;
`
const ChanceRain = styled.label`
	font-size: 1em;
`
const Temperature = styled.h1`
	margin: 0;
	margin-top: auto;
	font-weight: bolder;
	font-size: 6em;
`
const WeatherImage = styled.img`
	width: 100%
	
`
const Label = styled.label`
	font-size: 1em;
	font-weight: bolder;
	padding: 2rem;
`

const DayForecast = styled.div`
	display: flex;
	flex-direction: row;
	margin: 2rem;
	justify-content: space-evenly;
`

const Day = styled.label`
	display: flex;
	font-size: 1em;
	padding: 2rem 2rem 2rem 0;
`

const Weather = styled.img`
	display: flex;
	width: 50px;
	height: 50px;
	padding: 1rem 0 1rem 1rem;
`

const WeatherLabel = styled.label`
	display: flex;
	font-size: 1em;
	padding: 2rem 2rem 2rem 0;
	font-weight: bolder;
`

const Temp = styled.label`
	display: flex;
	font-size: 1em;
	padding: 2rem 1rem 2rem 1rem;
	font-weight: bolder;
`

const TodayContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;

	&:last-child {
		border-right: none;
	}

	@media (max-width: 1040px) {
		flex-direction: column;
	}
`
const EachHourBlock = styled.div`
	display: flex;
	flex-direction: column;
	padding-right: 1rem;
  margin: 2rem 0 2rem 1rem;
	align-items: center;

	@media (max-width: 1040px) {
		flex-direction: row;
		justify-content: space-around;
	}
`
const Time = styled.label`
	display: flex;
	font-size: 1.2em;
	white-space: nowrap;
	padding: 0 1rem 1rem;
	font-weight: bolder;
`
const HourTemperature = styled.label`
	display: flex;
	font-size: 2em;
	padding: 1rem 1rem 2rem 1rem;
	font-weight: bolder;
`

const WeatherToday = styled.img`
	display: flex;
	width: 80px;
	height: 80px;
	padding: 0 1rem;
`
const AirConBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
`
const AirLabel = styled.label`
	font-size: 1.1em;
	margin-bottom: .5rem;
`
const AirValue = styled.label`
	font-size: 2em;
	font-weight: bolder;
`
const AirPanel = styled.div`
	display: flex;
	flex-direction: row;
	margin: 1rem;
	justify-content: stretch;
`
const ThemeButton = styled.button`
	border: none;
	background-color: none;
	border-radius: 50%;
	width: 30px;
  height: 30px;
	margin-bottom: 1rem;
	cursor: pointer;

	@media (max-width: 1040px) {
		margin: 1rem 0 1rem 1rem;
	}
`

const Info = styled.div`
	display: flex;
	margin: 0 2rem 2rem;
`

const InfoLabel = styled.label`
	color: grey;
	font-size: 12px;
`
const InfoLink = styled.a`
	text-decoration: none;
`

const LabelTitle = styled.label`
	font-size: 12px;
	white-space: nowrap;
	color: black;
	margin-right: .5rem;
`

const themeColors = [
	{
		name: 'Night',
		color: '#0B192C',
		colorSub: '#213555',
		secondaryColor: '#2E5077',
		textColor: 'white',
		labelColor: '#B7B7B7',
	},
	{
		name: 'Morning',
		color: '#99DBF5',
		colorSub: '#CDF5FD',
		secondaryColor: '#91C8E4',
		textColor: 'black',
		labelColor: '',
	},
	{
		name: 'Mid Day',
		color: '#FFD95F',
		colorSub: '#F8ED8C',
		secondaryColor: '#DF9755',
		textColor: '#5C3D2E',
		labelColor: '#1C0A00',
	}
]

function Home() {
	const [weatherData, setWeatherData] = useState([]);
	const [todayWeather, setTodayWeather] = useState([]);
	const [userZipcode, setUserZipcode] = useState('');
	const [cityInfo, setCityInfo] = useState({});
	const [nowWeather, setNowWeather] = useState({});
	const todayIndex = new Date().getDay();
	const userInput = useRef(null);
	const [theme, setTheme] = useState(themeColors[0]);

	const getDayOfWeek = (index) => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return days[index];
	}

	const clearTextInput = () => {
		if (userInput.current) {
      userInput.current.value = '';
    }
	};

	const onThemeChange = (data) => {
		setTheme(data);
	};

	const onTextInputChange = (event) => {
		setUserZipcode(event.target.value);
	}

	const getWeatherData = async (zipcode) => {
		try {
			const { lat, lon } = await getLatLonByZip(zipcode ? zipcode : '07647');
			const data = await getForecast(lat, lon);
			const filtered = data.list.filter((data) => new Date(data.dt_txt).getHours() === 21)
				.map((data) => ({
					day: new Date(data.dt_txt).getDay(),
					hour: new Date(data.dt_txt).getHours(),
					temp: data.main.temp,
					feels: data.main.feels_like,
					humidity: data.main.humidity,
					pressure: data.main.pressure,
					description: data.weather[0].description,
					main: data.weather[0].main,
					wind: data.wind.speed,
				}));
			const todayWeather = data.list.slice(0, 6).map((data) => ({
					time: new Date(`${data.dt_txt} UTC`).toLocaleTimeString("en-US"),
					temp: data.main.temp,
					description: data.weather[0].description,
					humidity: data.main.humidity,
					pressure: data.main.pressure,
					main: data.weather[0].main,
					feels: data.main.feels_like,
					wind: data.wind.speed,
			}));
			setCityInfo(data.city)
			setWeatherData(filtered);
			setTodayWeather(todayWeather);
			setNowWeather(todayWeather[0]);
		} catch (e) {
			console.log('Error getting weather data');
		}
	};
	
	useEffect(() => {
		getWeatherData();
	}, []);

	const handleKeyDown = async (event) => {
		if (event.key === 'Enter') {
			getWeatherData(userZipcode);
			clearTextInput();
		}
	}
	
	return (
		<OuterDiv style={{ 'backgroundColor': theme.color }}>
			<MainDiv>
				<SettingsPanel style={{ 'backgroundColor': theme.colorSub }}>
					{themeColors.map((color, index) => (
						<ThemeButton key={index} style={{ 'backgroundColor': color.color }} onClick={() => onThemeChange(color)}></ThemeButton>
					))}
				</SettingsPanel>

				<WeatherContainer>
					<SearchInput style={{ 'backgroundColor': theme.colorSub, 'color': theme.labelColor }} placeholder="Type in zipcode" ref={userInput} onChange={onTextInputChange} onKeyDown={handleKeyDown}></SearchInput>
					<WeatherNowDisplay>
						<CityInfo>
							<CityName style={{ 'color': theme.textColor }}>{cityInfo.name}</CityName>
							<ChanceRain style={{ 'color': theme.labelColor }}>Change of rain: 0%</ChanceRain>
							<Temperature style={{ 'color': theme.textColor }}>{Math.round((nowWeather.temp-273.15)*1.8+32)}°</Temperature>
						</CityInfo>
						<WeatherIcon style={{ 'width': '200px', 'height': '200px' }}>
							<WeatherImage src={
								nowWeather.main === ('Rain') ? Rainy :
								nowWeather.main === 'Thunderstorm' ? Lightening :
								nowWeather.main === 'Snow' ? Snowy :
								nowWeather.main === ('Clouds') ? Cloudy :
								nowWeather.main === ('Clear') ? Sunny :
								nowWeather.main === ('Drizzle') ? Rainy :
								nowWeather.main === ('Haze') ? Haze :
								nowWeather.main === ('Fog') ? Foggy :
								Unknown}>
							</WeatherImage>
						</WeatherIcon>
						
					</WeatherNowDisplay>
					<ForecastContainer style={{ 'backgroundColor': theme.colorSub }}>
						<Label style={{ 'color': theme.labelColor }}>TODAY'S FORECAST</Label>
						<TodayContainer>
							{todayWeather.map((hourInfo, index) => (
								<EachHourBlock key={index} style={{ 'borderRight': `1px solid ${theme.secondaryColor}`}}>
									<Time style={{ 'color': theme.labelColor }}>{hourInfo.time.replace(':00:00', ':00')}</Time>
									<WeatherToday src={
										hourInfo.main === ('Rain') ? Rainy :
										hourInfo.main === 'Thunderstorm' ? Lightening :
										hourInfo.main === 'Snow' ? Snowy :
										hourInfo.main === ('Clouds') ? Cloudy :
										hourInfo.main === ('Clear') ? Sunny :
										hourInfo.main === ('Drizzle') ? Rainy :
										hourInfo.main === ('Haze') ? Haze :
										hourInfo.main === ('Fog') ? Foggy :
										Unknown}>
									</WeatherToday>
									<HourTemperature style={{ 'color': theme.textColor }}>{Math.round((hourInfo.temp-273.15)*1.8+32)}°</HourTemperature>
								</EachHourBlock>
							))}
						</TodayContainer>
					</ForecastContainer>
					<AirQualities style={{ 'backgroundColor': theme.colorSub }}>
						<Label style={{ 'color': theme.labelColor }}>AIR CONDITIONS</Label>

						<AirPanel>
							<AirConBlock>
								<AirLabel style={{ 'color': theme.labelColor }}>Feels Like</AirLabel>
								<AirValue style={{ 'color': theme.textColor }}>{Math.round((nowWeather.feels-273.15)*1.8+32)}°</AirValue>
							</AirConBlock>
							<AirConBlock>
								<AirLabel style={{ 'color': theme.labelColor }}>Wind</AirLabel>
								<AirValue style={{ 'color': theme.textColor }}>{nowWeather.wind}m/s</AirValue>
							</AirConBlock>
						</AirPanel>
						<AirPanel>
							<AirConBlock>
								<AirLabel style={{ 'color': theme.labelColor }}>Humidity</AirLabel>
								<AirValue style={{ 'color': theme.textColor }}>{nowWeather.humidity}%</AirValue>
							</AirConBlock>
							<AirConBlock>
								<AirLabel style={{ 'color': theme.labelColor }}>Pressure</AirLabel>
								<AirValue style={{ 'color': theme.textColor }}>{nowWeather.pressure} hPa</AirValue>
							</AirConBlock>
						</AirPanel>
					</AirQualities>
				</WeatherContainer>

				<SevenDayForecastContainer style={{ 'backgroundColor': theme.colorSub }}>
					<Label style={{ 'color': theme.labelColor }}>7-DAY FORECAST</Label>
					{weatherData.map((weather, index) => (
						<DayForecast key={index} style={{ 'borderBottom': `1px solid ${theme.secondaryColor}`}}>
							<Day style={{ 'color': theme.labelColor }}>{getDayOfWeek(weather.day) === getDayOfWeek(todayIndex) ? 'Today' : getDayOfWeek(weather.day)}</Day>
							<Weather src={
								weather.main === ('Rain') ? Rainy :
								weather.main === 'Thunderstorm' ? Lightening :
								weather.main === 'Snow' ? Snowy :
								weather.main === ('Clouds') ? Cloudy :
								weather.main === ('Clear') ? Sunny :
								weather.main === ('Drizzle') ? Rainy :
								weather.main === ('Haze') ? Haze :
								weather.main === ('Fog') ? Foggy :
								Unknown}>
							</Weather>
							<WeatherLabel style={{ 'color': theme.textColor }}>{weather.main}</WeatherLabel>
							<Temp style={{ 'color': theme.textColor }}>{Math.round((weather.temp-273.15)*1.8+32)}°</Temp>
						</DayForecast>
					))}
				</SevenDayForecastContainer>
			</MainDiv>
			<Info>
				<LabelTitle style={{ 'color': theme.labelColor }}>Powered by: </LabelTitle>
				<InfoLabel style={{ 'color': theme.labelColor }}>
					<InfoLink style={{ 'color': theme.textColor }} href="https://openweathermap.org/api" target="_blank" rel="noreferrer"> OpenWeatherMap API, </InfoLink>
					<InfoLink style={{ 'color': theme.textColor }} href="https://vercel.com/" target="_blank" rel="noreferrer"> Vercel </InfoLink> for hosting, and
					<InfoLink style={{ 'color': theme.textColor }} href="https://react.dev/" target="_blank" rel="noreferrer"> React </InfoLink> as frontend framework.
					All of these made with ♥ by Dayoung
				</InfoLabel>
			</Info>
		</OuterDiv>
	);
}

export default Home;