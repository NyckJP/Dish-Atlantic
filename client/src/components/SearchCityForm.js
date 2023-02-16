import React, { useState } from "react"

const SearchCityForm = ({ setCity }) => {
    const [searchedCity, setSearchedCity] = useState({ name: ""})

    const clearSearchBar = () => {
        setSearchedCity({name: ""})
    }

    const handleInputChange = event => {
        setSearchedCity({...searchedCity, name: event.currentTarget.value})
    }

    const handleSumbit = event => {
        event.preventDefault()
        setCity(searchedCity)
        clearSearchBar()
    }

    return (
        <form onSubmit={handleSumbit}>
            <label htmlFor="name">
                Search for your area:
            </label>
            
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInputChange}
              value={searchedCity.name}
            />
            
            <button className="button" type="submit">Submit</button>
        </form>
    )
}

export default SearchCityForm