import { useState } from "react";
import {useNavigate} from "react-router-dom"

export default function SearchBar({ rawData,baseMoney }) {
    const [searchQ, setSearchQ] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const navigate=useNavigate()

    const handleClickSuggest = (coinID) => {
        console.log('handleClickSuggest')
        navigate('/'+baseMoney+'/coins/'+coinID)
    }

    const handleChangeSearch = (searchQ, rawData) => {
        console.log('handleChangeSearch')
        let matches = []
        if (searchQ.length > 0) {
            matches = rawData.filter((row) =>
                (row.name.toLowerCase().indexOf(searchQ.toLowerCase()) > -1) ||
                (row.symbol.toLowerCase().indexOf(searchQ.toLowerCase()) > -1))
        }
        setSearchQ(searchQ)
        setSuggestions(matches)
    }

    return (
        <>
            <input placeholder='Search' type='search'
                value={searchQ}
                onChange={(e) => handleChangeSearch(e.target.value, rawData)}>
            </input>

            {suggestions.map((row, i) =>
                <li key={i} 
                onClick={()=>handleClickSuggest(row.id)}>
                    {row.name} ({row.symbol.toUpperCase()})
                </li>)}
        </>
    )
}