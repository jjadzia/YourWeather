
/* eslint-disable no-use-before-define */
import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {API_url} from "../utils";
import Container from "@material-ui/core/Container";
import countries from '../resouces/countries'
import { Alert } from '@material-ui/lab';
import TemperatureChart from "./Forecast";
import Background from "./Background";
import LocateComponent from './LocateComponent';
import CurrentWeatherComponent from './CurrentWeather'

const styles = {
    headers: {color: 'rgb(227, 136, 0)',
        alignSelf: 'flex-start',
        marginTop: "20px",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: "10px",
        padding: "10px"
    }
}
export default function WeatherComponent() {

    const useStyles = makeStyles({
        bg: {
            left: 0,
            right: 0,
            top: "250px",
            bottom: 0,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'space-around',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
        },
    });
    const my_styles = useStyles();

    const [cities, setCities] = useState([]);
    const [city, setCity] = useState(null);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [errorAlert, setErrorAlert] = useState(false);


    useEffect(() => {
        const keys = Object.keys(countries);
        const cityList = keys
            .map((key)=>[countries[key].city, countries[key].country])
            .filter(ar=>ar[0])
        setCities(cityList);
    }, [])

    const fetchWeatherForCity = (city) => {
        fetch(`${API_url}weather/${city}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data[0])
                setForecast(data[1])
                setErrorAlert(false)
            })
            .catch((er)=>{
                setErrorAlert(true);
                console.log('error', er);
            })
    }

    const fetchWeatherForLocation = (latitude, longitude) => {
        fetch(`${API_url}weather/location/${latitude}/${longitude}`)
            .then(response => response.json())
            .then(data => {
                setWeather(data[0])
                setForecast(data[1])
                setErrorAlert(false)
            })
            .catch((er)=>{
                setErrorAlert(true);
                console.log('error', er);
            })
    }

    const renderSearchCity = () =>
        (
            <div style={{ width: '50%', height: "150px", marginRight: "400px", marginBottom: "20px" }}>
                <Autocomplete
                    freeSolo
                    options={cities.map(city=>city[0])}
                    onChange={(event, newValue) => {
                        setCity(newValue);
                    }}
                    getOptionLabel={(city)=>{
                        const cityArray = cities.find(element=>element[0]===city);
                        return cityArray ? cityArray[0] + ' (' + cityArray[1] + ')' : '';
                    }}
                    renderInput={(params) => (
                        <TextField style={{backgroundColor: '#d1e8df', borderRadius: '5px' }}{...params} label="type to search city" margin="normal" variant="filled" />
                    )}
                />
                {city ? <Button onClick={() => fetchWeatherForCity(city)} variant="contained" color="primary" >
                    Get weather!
                </Button> : null}
            </div>
        )

    const renderHome = () => {

        const forecastTemperature = forecast && forecast
            .map(fc => {return {name: fc.day, highest: fc.highest_temp, lowest: fc.lowest_temp, condition: fc.condition}}) ;

        return (
            <Background>
                <Container className={my_styles.bg}>
                    {errorAlert && !!city && <Alert severity="error">The city you are looking for could not be found!</Alert>}
                    <h1 style={styles.headers}>Enter a city or use location
                    </h1>
                    {renderSearchCity()}
                    {<LocateComponent fetchWeatherForLocation={fetchWeatherForLocation} />}

                    <div style={{display: 'flex', flex: 1,  flexDirection: 'row', justifyContent: 'space-between'}}>
                        {weather && <div style={{display: 'flex', flexDirection: 'column', marginRight: "50px"}}>
                        <h1 style={styles.headers}>Current weather:
                            </h1>
                            {<CurrentWeatherComponent {...weather}/>}
                        </div>}
                        {forecast &&
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <h1 style={styles.headers}>Temperature forecast:
                            </h1>
                            <TemperatureChart data={forecastTemperature}/>
                        </div>}
                    </div>
                </Container>
            </Background>
        )
    }

    return (
        renderHome()
    );
}
