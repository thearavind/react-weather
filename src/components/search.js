import React, {Component} from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import {fetchWeatherData} from "../actions/weatherDataAction"
import {changeViewport} from "../actions/viewportActions"
import {connect} from "react-redux"
import './search.css'

@connect((store) => {
    return {
        weather: store.weather
    }
})

export class PlacesSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            geocodeResults: null,
            loading: false
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSelect(address) {
        this.setState({
            address,
            loading: true
        })


        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then(({lat, lng}) => {
                console.log('Success Yay', {lat, lng})
                this.props.dispatch(changeViewport({
                    ...this.props.viewport,
                    latitude: lat,
                    longitude: lng,
                }))
                this.props.dispatch(fetchWeatherData({
                    latitude: lat,
                    longitude: lng
                }))
            })
            .catch((error) => {
                console.log('Oh no!', error)
            })
    }

    handleChange(address) {
        this.setState({
            address,
            geocodeResults: null
        })
    }

    render() {
        const cssClasses = {
            root: 'form-group',
            input: 'Demo__search-input',
            autocompleteContainer: 'Demo__autocomplete-container',
        }

        const AutocompleteItem = ({ formattedSuggestion }) => (
            <div className="Demo__suggestion-item">
                <i className='fa fa-map-marker Demo__suggestion-icon'/>
                <strong>{formattedSuggestion.mainText}</strong>{' '}
                <small className="text-muted">{formattedSuggestion.secondaryText}</small>
            </div>)

        const inputProps = {
            type: "text",
            value: this.state.address,
            onChange: this.handleChange,
            onBlur: () => { console.log('Blur event!'); },
            onFocus: () => { console.log('Focused!'); },
            autoFocus: true,
            placeholder: "Search Places",
            name: 'Demo__input',
            id: "my-input-id",
        }

        return (<PlacesAutocomplete
                    onSelect={this.handleSelect}
                    autocompleteItem={AutocompleteItem}
                    classNames={cssClasses}
                    inputProps={inputProps}
                />)
    }
}
