import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import TrendingSuggestion from "./TrendingSuggestion";

export default function SearchBar() {
    const [searchQ, setSearchQ] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [rawCoinIDs, setRawCoinIDs] = useState([])
    const [trendingIsShown, setTrendingIsShown] = useState(false)

    const navigate = useNavigate()
    const { baseMoneyURL } = useParams()

    useEffect(() => {
        console.log('useEffectSearch')
        const abortCont = new AbortController()
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`, { signal: abortCont.signal })
            .then(response => response.json())
            .then(json => { setRawCoinIDs(json) })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetchSearchAborted')
                }
            })
        return () => {
            abortCont.abort()
            console.log('fetchSearchAborted cleanup')
        }
    }, [])

    const handleClickSuggest = (coinID) => {
        console.log('handleClickSuggest')
        navigate('/' + (baseMoneyURL || 'usd') +'/'+ coinID)
        setSuggestions([])
    }

    const handleChangeSearch = (searchQ, rawData) => {
        console.log('handleChangeSearch')
        let matches = []
        if (searchQ.length > 0) {
            matches = rawData.filter((row) =>
                (row.name.toLowerCase().includes(searchQ.toLowerCase())) ||
                (row.symbol.toLowerCase().includes(searchQ.toLowerCase())))
            setTrendingIsShown(false)
        }
        setSearchQ(searchQ)
        const maxSuggestions = 7
        setSuggestions(matches.slice(0, maxSuggestions))
    }

    const handleClickTrending = () => {
        console.log('handleClickTrending')
        if (searchQ) { setTrendingIsShown(false) }
        else {
            setTrendingIsShown(true)
        }
    }

    return (
        <div >
            <input placeholder='Search in Top 250' type='search' style={{width:'250px'}}
                value={searchQ}
                onClick={handleClickTrending}
                onChange={(e) => handleChangeSearch(e.target.value, rawCoinIDs)}
                onBlur={() => {
                    setTimeout(() => {
                        setSuggestions([]);
                        setSearchQ('')
                        setTrendingIsShown(false)
                    }, 200)
                }}
            >
            </input>
            <div className="suggestion-box">
                <TrendingSuggestion trendingIsShown={trendingIsShown} />
            </div>
            <div className="suggestion-box">
                {suggestions.map((row, i) =>
                    <div key={i} className="suggestions"
                        onClick={() => handleClickSuggest(row.id)}>
                        <img  src={row.image} width='15' height='15' alt='currency-symbol'/>    
                        {row.name} ({row.symbol.toUpperCase()}), #{row.market_cap_rank}
                    </div>)}
            </div>
        </div>
    )
}