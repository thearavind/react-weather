import { combineReducers } from 'redux'
import viewportReducers from './viewportReducer'
import weatherDataReducer from './weatherDataReducer'
import errorReducer from './errorReducer'

const reducers = combineReducers({
    viewport: viewportReducers,
    weather:weatherDataReducer,
    error:errorReducer,
})

export default reducers