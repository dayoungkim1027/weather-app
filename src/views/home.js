import styled from 'styled-components';
import WeatherImg from '../assets/sunny.png';
import './home.css';
import getLatLonByZip from '../api/getLatLonByZip';
import getForecast from '../api/getForecast';
import { useState } from 'react';


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
	height: 40%;
`

const ForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem;
	height: 40%;
	border-radius: 15px;
	background-color: #213555;
`

const AirQualities = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 2rem 2rem;
	height: 20%;
	border-radius: 15px;
	background-color: #213555;
`

const SettingsPanel = styled.div`
	margin: 2rem 0 2rem 2rem;
	background-color: #213555;
	width: 10%;
	border-radius: 15px;
`

const SevenDayForecastContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2rem 2rem 2rem 0;
	background-color: #213555;
	width: 30%;
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
	width: 50%;
`
const Label = styled.label`
	font-size: 1em;
	color: #B7B7B7;
	font-weight: bolder;
	padding: 2rem;
`

function Home() {
	const [cityName, setCityName] = useState('');

	const getWeatherData = async () => {
		try {
			const { lat, lon, name } = await getLatLonByZip('07647');
			setCityName(name);
			const forecast = await getForecast(lat, lon);
			console.log('forecast: ', forecast);
		} catch (e) {
			console.log('error')
		}
	};
	getWeatherData();
	
	return (
		<OuterDiv>
			<SettingsPanel></SettingsPanel>

			<WeatherContainer>
				<SearchInput placeholder="Search for city"></SearchInput>
				<WeatherNowDisplay>
					<CityInfo>
						<CityName>{cityName}</CityName>
						<ChanceRain>Change of rain: 0%</ChanceRain>
						<Temperature>31*</Temperature>
					</CityInfo>
					<WeatherIcon>
						<WeatherImage className="rotate" src={WeatherImg}></WeatherImage>
					</WeatherIcon>
					
				</WeatherNowDisplay>
				<ForecastContainer>
					<Label>TODAY'S FORECAST</Label>
				</ForecastContainer>
				<AirQualities>
					<Label>AIR CONDITIONS</Label>
				</AirQualities>
			</WeatherContainer>

			<SevenDayForecastContainer>
				<Label>7-DAY FORECAST</Label>
			</SevenDayForecastContainer>
		</OuterDiv>
	);
}

export default Home;