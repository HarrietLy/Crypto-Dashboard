import { useParams } from "react-router";
import PriceChart from "./PriceChart";

import { useState, useEffect } from "react";

export default function Coin(){
    
    const {baseMoneyURL,coinID}=useParams()
    const [rawCoinData, setRawCoinData] =useState({})


    const getCoinDescData = (coin)=>{
        fetch(`https://api.coingecko.com/api/v3/coins/${coin}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=false`)
        .then(response=> response.json())
        .then(json=>{setRawCoinData(json)})
    }

    useEffect(() => {
        getCoinDescData(coinID)
    }, [])

    return (
        <> 
        <h1>{rawCoinData.name} ({rawCoinData?.symbol?.toUpperCase()})</h1>
        <p> baseMoneyURL param should also be {baseMoneyURL}</p>
        <PriceChart/>
        <h3>Description:</h3> 
        {rawCoinData?.description?.en.replace(/<(.*?)>/g,'')}
        </>
    )
}