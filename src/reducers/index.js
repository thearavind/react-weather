import { combineReducers } from 'redux'
import viewportReducers from './viewportReducer'
import fetchWeatherData from './weatherDataReducer'

const reducers = combineReducers({
    viewport: viewportReducers,
    weather:fetchWeatherData,
})

export default reducers