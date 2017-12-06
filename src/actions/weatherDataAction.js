import axios from "axios/index"

export function fetchWeatherData(location) {
    console.log(process.env)
    return {
        type: "FETCH_WEATHER",
        payload: axios.get(`https://api.openweathermap.org/data/2.5/find?lat=` + location.latitude + `&lon=` + location.longitude + `&cnt=30&appid=`+process.env.REACT_APP_WEATHER_API_TOKEN)
    }
}
