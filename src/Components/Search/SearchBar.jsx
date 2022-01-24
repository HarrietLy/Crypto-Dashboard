import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router";

export default function SearchBar() {
    const [searchQ, setSearchQ] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [rawCoinIDs, setRawCoinIDs] = useState([])

    const navigate = useNavigate()
    const { baseMoneyURL } = useParams()

    const getAPICoinID = () => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`)
            .then(response => response.json())
            .then(json => { setRawCoinIDs(json) })
    }

    useEffect(() => {
        getAPICoinID()
    }, [])

    const handleClickSuggest = (coinID) => {
        console.log('handleClickSuggest')
        navigate('/' + (baseMoneyURL || 'usd') + '/coins/' + coinID)
        setSuggestions([])
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
        const maxSuggestions = 7
        setSuggestions(matches.slice(0, maxSuggestions))
    }

    return (
        <div onBlur={() => { setSuggestions([]); setSearchQ('') }}>
            <input placeholder='Search in Top 250' type='search' style={{ 'width': '250px' }}
                value={searchQ}
                onChange={(e) => handleChangeSearch(e.target.value, rawCoinIDs)}>
            </input>
            <div className="suggestion-box">
                {suggestions.map((row, i) =>
                    <div key={i} className="suggestions"
                        onClick={() => handleClickSuggest(row.id)}>
                        {row.name} ({row.symbol.toUpperCase()}), #{row.market_cap_rank}
                    </div>)}
            </div>
        </div>
    )
}