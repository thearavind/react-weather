const weatherDataReducer = (state={list:[]}, action) => {
    switch(action.type) {
        case "FETCH_WEATHER_FULFILLED": {
            return {...action.payload.data}
        }
        default: {
            return state
        }
    }
}

export default weatherDataReducer
