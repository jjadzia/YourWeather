import React from "react";
import { geolocated } from "react-geolocated";
import Button from "@material-ui/core/Button";

const styles = {
    blueBG : {
        backgroundColor: 'rgba(96, 188, 224, 0.8)',
        borderRadius: "10px",
        padding: "20px",
        alignSelf: 'flex-end',
        marginRight: "100px",
    },
}
class LocateComponent extends React.Component {

    render() {
        const { coords } = this.props;

        return !this.props.isGeolocationAvailable ? (
            <div style={styles.blueBG}>Your browser does not support Geolocation</div>
        ) : !this.props.isGeolocationEnabled ? (
            <div style={styles.blueBG}>Geolocation is not enabled</div>
        ) : this.props.coords ? (
            <p style={styles.blueBG}>
                <table>
                    <tbody>
                        <tr>
                            <td>Your location:</td>
                        </tr>
                        <tr>
                            <td>latitude:</td>
                            <td>{parseFloat(this.props.coords.latitude.toFixed(2))}</td>
                        </tr>
                        <tr>
                            <td>longitude:</td>
                            <td>{parseFloat(this.props.coords.longitude.toFixed(2))}</td>
                        </tr>
                    </tbody>
                </table>
                <Button onClick={() => this.props.fetchWeatherForLocation(Math.round(coords.latitude), Math.round(coords.longitude))} variant="contained" color="primary" >
                    {`Get local weather!`}
                </Button>
            </p>
        ) : (
            <div style={styles.blueBG}>Getting the location data&hellip; </div>
        );
    }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(LocateComponent);
