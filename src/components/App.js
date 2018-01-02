import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactMapGL, {Marker} from 'react-map-gl'
import {changeViewport} from '../actions/viewportActions'
import {fetchWeatherData} from '../actions/weatherDataAction'
import {throwError} from '../actions/errorActions'
import Modal from 'react-modal'
import {Redirect} from 'react-router-dom'
import {PlacesSearch} from './search'
import './App.css'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

@connect((store) => {
    return {
        viewport: store.viewport,
        weather: store.weather,
        error: store.error,
    }
})

class App extends Component {
    constructor() {
        super()
        this.closeModal = this.closeModal.bind(this)
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    updateDimensions() {
        this.props.dispatch(changeViewport({
            width: window.innerWidth,
            height: window.innerHeight
        }))
    }

    getGeolocation() {
        return new Promise((resolve, reject) => {
            const geolocation = navigator.geolocation
            if (!geolocation) {
                reject(new Error('Not Supported'))
            }
            geolocation.getCurrentPosition((position) => {
                resolve(position)
            }, () => {
                reject(new Error('Location Disabled'))
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
        }).catch((error) => {
            this.props.dispatch(throwError({
                hasError: error.message !== 'Location Disabled',
                locationDisabled: true,
                error: error
            }))
        })
    }

    _renderCityMarker = (city, index) => {
        let calculatedTemp = city.main.temp - 273.15
        if(Math.floor(calculatedTemp) !== calculatedTemp) calculatedTemp = calculatedTemp.toFixed(2)
        return (<Marker key={`marker-${index}`}
                        longitude={city.coord.lon}
                        latitude={city.coord.lat}>
            <p className='marker'>
                <img alt={'Weather data'}
                     src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}/><br/>
                <span className='temp'>{ calculatedTemp + '°C'}</span>
            </p>
        </Marker>)
    }

    closeModal() {
        this.props.dispatch(throwError({
            locationDisabled: false,
        }))
    }

    render() {
        const modalButton = {
            float: 'right'
        }

        if (this.props.error.hasError) {
            return (<Redirect to="/error"/>)
        }
        return (
            <div>
                <Modal
                    isOpen={this.props.error.locationDisabled}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <p>Location access has been blocked please enable it to detect your location</p>
                    <p> You can also search for the city and check its weather</p>
                    <button style={modalButton} onClick={this.closeModal}>close</button>
                </Modal>
                <PlacesSearch/>
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
                    }}>
                    {this.props.weather.list.map(this._renderCityMarker)}
                </ReactMapGL>
            </div>
        )
    }
}

export default App
