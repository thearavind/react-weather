import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactMapGL, { Marker } from 'react-map-gl'
import {changeViewport} from '../actions/viewportActions'
import {fetchWeatherData} from '../actions/weatherDataAction'
import './App.css'

@connect((store) => {
    return {
        viewport: store.viewport,
        weather: store.weather
    }
})

class App extends Component {

    getGeolocation() {
        return new Promise((resolve, reject) => {
            const geolocation = navigator.geolocation
            if (!geolocation) {
                reject(new Error('Not Supported'))
            }
            geolocation.getCurrentPosition((position) => {
                resolve(position)
            }, () => {
                reject(new Error('Permission denied'))
            })
        })
    }

    componentWillMount() {
        this.getGeolocation().then((newViewport) => {
            this.props.dispatch(changeViewport({
                ...this.props.viewport,
                latitude: newViewport.coords.latitude,
                longitude: newViewport.coords.longitude,
                width: window.innerWidth,
                height: window.innerHeight
            }))
            this.props.dispatch(fetchWeatherData({
                latitude: newViewport.coords.latitude,
                longitude: newViewport.coords.longitude
            }))
        })
    }

    _renderCityMarker = (city, index) => {
        return (<Marker key={`marker-${index}`}
                        longitude={city.coord.lon}
                        latitude={city.coord.lat}>
            <p className='marker'>
                <img alt={'Weather data'} src={'http://openweathermap.org/img/w/' + city.weather[0].icon + '.png'}/><br/>
            <span className='temp'>{city.main.temp - 273.15 + '°C'}</span>
            </p>
        </Marker>)
    }

    render() {
        return (
            <ReactMapGL
                {...this.props.viewport}
                mapStyle='mapbox://styles/mapbox/dark-v9'
                onViewportChange={(viewport) => {
                    const {width, height, latitude, longitude, zoom} = viewport
                    this.props.dispatch(changeViewport({
                        ...this.props.viewport,
                        width: width,
                        height: height,
                        latitude: latitude,
                        longitude: longitude,
                        zoom: zoom
                    }))

                    // Optionally call `setState` and use the state to update the map.
                }}>
                {this.props.weather.list.map(this._renderCityMarker)}
            </ReactMapGL>
        )
    }
}

export default App
