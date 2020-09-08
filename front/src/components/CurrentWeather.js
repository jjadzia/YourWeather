
/* eslint-disable no-use-before-define */
import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = {
    bg: {
        backgroundColor: 'rgba(245, 162, 241,0.8)',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        padding: "10px",
    },
};

export default function CurrentWeatherComponent(props) {

    const renderHome = () => {
        return (
            <div style={styles.bg}>
                <h1>{props.city}, {props.country}:
                </h1>
                <h2>{props.condition}
                </h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Temperature:</td>
                        <td>{props.temperature} {'\u00b0'}C</td>
                    </tr>
                    <tr>
                        <td>Humidity:</td>
                        <td>{props.humidity} %</td>
                    </tr>
                    <tr>
                        <td>Pressure:</td>
                        <td>{props.pressure} hPa</td>
                    </tr>
                    <tr>
                        <td>Wind speed:</td>
                        <td>{props.wind_speed} km/h</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        renderHome()
    );
}
