import { useParams } from "react-router-dom";
import PriceChart from "./PriceChart";
import { useState, useEffect } from "react";
import baseMoneyMap from "../DataTable/baseMoneyMap";
import loading from '../loading.svg'
import NotFound from "../NotFound";

export default function Coin() {

    const { baseMoneyURL, coinID } = useParams()
    const [rawCoinData, setRawCoinData] = useState({})
    const [status, setStatus] = useState('')

    useEffect(() => {
        console.log('useEffect for coin desc')
        setStatus('pending')
        fetch(`https://api.coingecko.com/api/v3/coins/${coinID}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`)
            .then(response => 
                {if (!response.ok) {
                    const err = new Error('response is not ok')
                    err.response = response
                    throw err
                } 
                else return response.json() }
            )
            .then(json => {
                setRawCoinData(json)
                setStatus('success')
            })
            .catch(err => {
                    console.log('error when calling coin desc', err)
                    setStatus('error')
            })
    }, [coinID])

    return (
        <div style={{width:'90vw'}}>
            {(status === 'pending') ? <img src={loading} width='100px' height='100px' />
            :(status === 'error') ? <NotFound/>
                : <div>
                    <h2><img alt='symbol' src={rawCoinData?.image?.thumb} />
                        {rawCoinData.name} ({rawCoinData?.symbol?.toUpperCase()})
                        <span> #{rawCoinData?.market_cap_rank}</span>
                    </h2>
                    
                    <h3>{baseMoneyMap[baseMoneyURL||'USD']} {rawCoinData?.market_data?.current_price?.[baseMoneyURL.toLowerCase()].toLocaleString(undefined, { maximumFractionDigits:5 })}</h3>

                    {rawCoinData?.description?.en.replace(/<(.*?)>/g, '')}
                    <br /><br />

                    <div>Market cap: {baseMoneyMap[baseMoneyURL||'USD']} {rawCoinData?.market_data?.market_cap?.[baseMoneyURL.toLowerCase()].toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    <div>Homepage: {(rawCoinData?.links?.homepage.length > 0)
                        ? <a href={rawCoinData?.links?.homepage[0]}>{rawCoinData?.name}</a>
                        : 'not found'}
                    </div>
                    <div>Source Code: {(rawCoinData?.links?.repos_url?.github?.length > 0)
                        ? <a href={rawCoinData?.links?.repos_url?.github[0]}>{rawCoinData?.name}</a>
                        : 'not found'}
                    </div>
                </div>

            }
            <PriceChart />

        </div>
    )
}