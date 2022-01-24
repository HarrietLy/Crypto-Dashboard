import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import PeriodSelector from './PeriodSelector';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function PriceChart() {
    const { baseMoneyURL, coinID } = useParams()
    const [rawPriceData, setRawPriceData] = useState({})
    const [period, setPeriod] = useState(1)
    const [interval, setInterval] = useState('minutely')

    const convertToDate = (unixtimestamp) => {
        const date = new Date(unixtimestamp)
        const month = date.toLocaleString('default',{month:'short'})
        return date.toUTCString()
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


    const tooltipVerticalLine={
        id:'tooltipVerticalLine',
        afterDraw:(chart) =>{
            if(chart.tooltip?._active && chart.tooltip?._active.length){
                const ctx=chart.ctx
                ctx.save();
                const activePoint=chart.tooltip?._active[0]
                ctx.beginPath();
                ctx.moveTo(activePoint.element.x, chart.scales.y.top);
                ctx.lineTo(activePoint.element.x, chart.scales.y.bottom);
                ctx.lineWidth =2;
                ctx.strokeStyle='red';
                ctx.stroke();
                ctx.restore();
            }
        }
    }
    const options = {
        responsive: true,
        plugins:{
            tooltip:{
                yAlign:'bottom'
            }
        },
        elements:{
            point:{
                radius: 0,
            },
            line:{
                borderWidth: 2,
            } 
        },
        interaction:{
            intersect: false,
            mode: 'index',
        }
        // scales:{
        //     x:{
        //         ticks:{
        //             callback: function(val,index,ticks){
        //                 console.log(index)
        //                 return val
        //             }
        //         }
        //     }
        // }
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

    const periodMapping ={'24h':1, '7d':7,'14d':14,'30d':30,'90d':90,'180d':180,'1y':365,'Max':'max'}
    const handleClickPeriod =(e)=>{
        console.log('handleChangePeriod')
        const intervalMapping ={'24h':'minute', '7d':'minute','14d':'minute','30d':'minute','90d':'hourly','180d':'hourly','1y':'hourly','Max':'hourly'} //this is contrained by the free API so API may return less granular data
        setPeriod(periodMapping[e.target.value])
        setInterval(intervalMapping[e.target.value])
    }
    
    return (
        <>
            <h3>Historical Price Chart</h3>
            <PeriodSelector
                period={period} handleClickPeriod={handleClickPeriod}
                periodMapping={periodMapping}/>
            <Line data={data} options={options} plugins={[tooltipVerticalLine]}
            />
        </>
    )
}