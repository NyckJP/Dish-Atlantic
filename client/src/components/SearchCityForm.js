import React, { useState } from "react"

const SearchCityForm = (props) => {
    const [searchedCity, setSearchedCity] = useState({ name: ""})
    const [error, setError] = useState()

    const clearSearchBar = () => {
        setSearchedCity({name: ""})
    }

    const handleInputChange = event => {
        setSearchedCity({...searchedCity, name: event.currentTarget.value})
    }

    const handleSumbit = event => {
        event.preventDefault()
        if (searchedCity.name.trim() == '') {
            setError(<div className="search-form-error red-font">Must enter a location</div>)
            return
        }
        setError()
        props.setCity(searchedCity)
        clearSearchBar()
        if (props.setShouldRedirect) {
            props.setShouldRedirect(true)
        }
    }
    
    return (
        <form onSubmit={handleSumbit} className="callout search-city-container">
            <label htmlFor="name">
                Search for restaurants in your location
            </label>
                
            <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                placeholder="New York City, NYC, 350 5th Ave, New York, NY 10118"
                value={searchedCity.name}
            />

            {error}
                
            <button className="button" type="submit">Enter</button>
        </form>
    )
}

export default SearchCityForm