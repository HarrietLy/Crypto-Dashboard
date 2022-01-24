import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import PeriodSelector from './PeriodSelector';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function PriceChart() {
    const { baseMoneyURL, coinID } = useParams()
    const [rawPriceData, setRawPriceData] = useState({})
    const [period, setPeriod] = useState('30')
    const [interval, setInterval] = useState('hourly')

    const periodOptions = [1, 7, 14, 30, 90, 180, 365, 'max']


    const convertToDate = (unixtimestamp) => {
        const date = new Date(unixtimestamp)
        const month = date.toLocaleString('default',{month:'short'})
        return date.getDate()+'. '+month
    }

    const getCoinPriceData = (base, coin, period, interval) => {
        fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${base}&days=${period}&interval=${interval}`)
            .then(response => response.json())
            .then(json => {
                json.prices?.map((point)=>{point[0] = convertToDate(point[0])});
                setRawPriceData(json)
            })
    }

    useEffect(() => {
        getCoinPriceData(baseMoneyURL, coinID, period, interval)
    }, [baseMoneyURL, coinID, period, interval])

    // console.log('rawPriceData price', rawPriceData.prices)

    const xArray =[], yArray=[]
    for (let i =0; i<rawPriceData.prices?.length; i++){
        xArray.push(rawPriceData.prices?.[i][0])
        yArray.push(rawPriceData.prices?.[i][1].toFixed(2))
    }

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        //   title: {
        //     display: true,
        //     text: 'Price Line Chart',
        //   },
  
        },
        elements:{
            point:{
                radius: 0,
            },
            line:{
                borderWidth: 2,
            }
            
        }
      };
    const data = {
        labels: xArray,
        datasets: [{
            label: 'Price',
            data: yArray,
            borderColor: 'rgba(0, 0, 225,0.8)',
            backgroundColor: 'rgba(0, 0, 225,0.8)'
        }]
    }
    return (
        <>
            <h3>Historical Price Chart</h3>
            <PeriodSelector periodOptions={periodOptions} period={period}/>
            <Line data={data} options={options}
            />
        </>
    )
}