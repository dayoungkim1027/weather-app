import styled from 'styled-components';
import WeatherImg from '../assets/sunny.png';
import './home.css';
import getLatLonByZip from '../api/getLatLonByZip';
import getForecast from '../api/getForecast';
import { useEffect, useState } from 'react';


const OuterDiv = styled.div`
	display: flex;
	flex-direction: row;
	background-color: #0B192C;
`

const WeatherContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100vw;
	height: 100vh
`

const SearchInput = styled.input`
	background-color: #213555;
	border: none;
	height: 8%;
	border-radius: 15px;
	margin: 2rem;
	padding: 1rem 2rem;
	font-size: 30px;
	color: #B7B7B7;
`

const WeatherNowDisplay = styled.div`
	display: flex;
	flex-direction: row;
	margin: 2rem 6rem;
`

const ForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem;
	border-radius: 15px;
	background-color: #213555;
`

const AirQualities = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 2rem 2rem;
	border-radius: 15px;
	background-color: #213555;
`

const SettingsPanel = styled.div`
	margin: 2rem 0 2rem 2rem;
	background-color: #213555;
	border-radius: 15px;
	width: 80px;
`

const SevenDayForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem 2rem 2rem 0;
	background-color: #213555;
	border-radius: 15px;
`

const CityInfo = styled.div`
	display: flex;
	flex-direction: column;
`
const WeatherIcon = styled.div`
	display: flex;
	flex-grow: 1;
	justify-content: end;
`
const CityName = styled.h3`
	margin: 0 0 1rem;
  font-size: 4em;
	color: white;
`
const ChanceRain = styled.label`
	font-size: 1em;
	color: #B7B7B7;
`
const Temperature = styled.h1`
	margin: 0;
	margin-top: auto;
	font-weight: bolder;
	font-size: 6em;
	color: white;
`
const WeatherImage = styled.img`
	
`
const Label = styled.label`
	font-size: 1em;
	color: #B7B7B7;
	font-weight: bolder;
	padding: 2rem;
`

const DayForecast = styled.div`
	display: flex;
	flex-direction: row;
	margin: 2rem;
	justify-content: space-evenly;
	border-bottom: 1px solid #2E5077;
`

const Day = styled.label`
	display: flex;
	font-size: 1em;
	color: #B7B7B7;
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
	color: white;
	padding: 2rem 2rem 2rem 0;
	font-weight: bolder;
`

const Temp = styled.label`
	display: flex;
	font-size: 1em;
	color: white;
	padding: 2rem 0 2rem 2rem;
	font-weight: bolder;
`

const TodayContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`
const EachHourBlock = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem;
	padding: 0 1rem;
	align-items: center;
	border-right: 1px solid #2E5077;
	
`
const Time = styled.label`
	display: flex;
	font-size: 1.2em;
	color: #B7B7B7;
	padding: 0 1rem 1rem;
	font-weight: bolder;
`
const HourTemperature = styled.label`
	display: flex;
	font-size: 2em;
	color: white;
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
`
const AirLabel = styled.label`
	font-size: 1.1em;
	color: #B7B7B7;
`
const AirValue = styled.label`
	font-size: 2em;
	color: #B7B7B7;
	font-weight: bolder;
`

function Home() {
	const [weatherData, setWeatherData] = useState([]);
	const [todayWeather, setTodayWeather] = useState([]);
	const todayIndex = new Date().getDay();


	const getDayOfWeek = (index) => {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		return days[index];
	}

	useEffect(() => {
		(async () => {
			try {
				const { lat, lon, name } = await getLatLonByZip('07647');
				const { list } = await getForecast(lat, lon);
				console.log('list:: ', list);
				const filtered = list.filter((data) => new Date(data.dt_txt).getHours() === 21)
					.map((data) => ({
						day: new Date(data.dt_txt).getDay(),
						hour: new Date(data.dt_txt).getHours(),
						temp: data.main.temp,
						feels: data.main.feels_like,
						humidity: data.main.humidity,
						description: data.weather[0].description,
						main: data.weather[0].main,
						wind: data.wind.speed,
					}));
				const todayWeather = list.slice(0, 6).map((data) => ({
						time: new Date(`${data.dt_txt} UTC`).toLocaleTimeString("en-US"),
						temp: data.main.temp,
						description: data.weather[0].description,
				}));
				console.log('.todayWeather: ', todayWeather);
				setWeatherData(filtered);
				setTodayWeather(todayWeather);
			} catch (e) {
				console.log('error')
			}
		})();
	}, []);
	
	return (
		<OuterDiv>
			<SettingsPanel></SettingsPanel>

			<WeatherContainer>
				<SearchInput placeholder="Search for city"></SearchInput>
				<WeatherNowDisplay>
					<CityInfo>
						<CityName>Northvale</CityName>
						<ChanceRain>Change of rain: 0%</ChanceRain>
						<Temperature>{}</Temperature>
					</CityInfo>
					<WeatherIcon>
						<WeatherImage className="rotate" src={WeatherImg}></WeatherImage>
					</WeatherIcon>
					
				</WeatherNowDisplay>
				<ForecastContainer>
					<Label>TODAY'S FORECAST</Label>
					<TodayContainer>
						{todayWeather.map((hourInfo) => (
							<EachHourBlock>
								<Time>{hourInfo.time.replace(':00:00', ':00')}</Time>
								<WeatherToday src={WeatherImg} />
								<HourTemperature>{Math.round((hourInfo.temp-273.15)*1.8+32)}</HourTemperature>
							</EachHourBlock>
						))}
					</TodayContainer>
				</ForecastContainer>
				<AirQualities>
					<Label>AIR CONDITIONS</Label>

					<AirConBlock>
						<AirLabel>Feels Like</AirLabel>
						<AirValue>Chance of Rain</AirValue>
					</AirConBlock>
					<AirConBlock>
						<AirLabel>Wind</AirLabel>
						<AirValue>UV Index</AirValue>
					</AirConBlock>
				</AirQualities>
			</WeatherContainer>

			<SevenDayForecastContainer>
				<Label>7-DAY FORECAST</Label>
				{weatherData.map((weather, index) => (
					<DayForecast key={index}>
						<Day>{getDayOfWeek(weather.day) === getDayOfWeek(todayIndex) ? 'Today' : getDayOfWeek(weather.day)}</Day>
						<Weather src={WeatherImg}/>
						<WeatherLabel>{weather.main}</WeatherLabel>
						<Temp>{Math.round((weather.temp-273.15)*1.8+32)}</Temp>
					</DayForecast>
				))}
			</SevenDayForecastContainer>
		</OuterDiv>
	);
}

export default Home;