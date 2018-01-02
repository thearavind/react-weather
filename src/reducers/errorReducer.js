const errorReducer = (state={hasError:false, locationDisabled: false, error: null}, action) => {
    switch(action.type) {
        case "THROW_ERROR": {
            return {...action.payload}
        }
        default: {
            return state
        }
    }
}

export default errorReducer
