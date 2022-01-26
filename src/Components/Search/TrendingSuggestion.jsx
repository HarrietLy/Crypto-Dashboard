import { useState, useEffect } from 'react'
import flame from './flame.png'
import { useNavigate, useParams } from 'react-router-dom'

export default function TrendingSuggestion({ trendingIsShown }) {

    const [trendingSearch, setTrendingSearch] = useState([])
    const {baseMoneyURL} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('useeffect trending')
        const abortCont = new AbortController()
        fetch('https://api.coingecko.com/api/v3/search/trending', {signal:abortCont.signal})
            .then(response => response.json())
            .then(json => {
                setTrendingSearch(json)
            })
            .catch(err=>{
                if(err.name==='AbortError'){
                    console.log('TrendingFetchAborted')
                }
                console.log('err in clean up trending',err)
            })
        return ()=>{
            console.log('clean up trending')
            abortCont.abort()
        }
    }, [])

    const handleClickTrendingSuggestion = (coinID) => {
        console.log('handleClick trending')
        navigate('/' + (baseMoneyURL || 'usd') + '/coins/' + coinID)
    }
    const trendingContent = trendingSearch?.coins?.map((item, i) => 
                        <div key={i} className='suggestions'
                            onClick ={()=>handleClickTrendingSuggestion(item.item.id)}>
                            <img src={item.item.thumb} alt='symbol' height='15px' width='15px'/>
                             {item.item.name} ({item.item.symbol}) #{item.item.market_cap_rank}
                        </div>)



    return (
        (trendingIsShown) ?
            <>
                <div style={{color:'grey'}}>Trending Search <span><img src={flame} alt='fire-symbol' width='13px' height='13px' />
                </span> </div>
                <hr style={{borderColor:'#fbfbfb', height: 0.001}}/>
                <div>{trendingContent}</div>
            </>
            : <></>

    )
}