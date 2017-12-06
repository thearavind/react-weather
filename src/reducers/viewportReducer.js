const viewportReducer = (state={
    width: window.innerWidth,
    height: window.innerHeight,
    latitude: 37.7577,
    longitude: -122.4376,
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    zoom: 12
  }, action) => {
    switch(action.type) {
        case "CHANGE_VIEW_PORT": {
            return {...state, ...action.payload}
        }
        default: {
            return state
        }
    }
}

export default viewportReducer
