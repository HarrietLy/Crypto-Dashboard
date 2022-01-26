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
import loading from '../loading.svg'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

export default function PriceChart() {
    const { baseMoneyURL, coinID } = useParams()
    const [rawPriceData, setRawPriceData] = useState({})
    const [period, setPeriod] = useState(1)
    const [status, setStatus] = useState('')

    const convertToDate = (unixtimestamp) => {
        const date = new Date(unixtimestamp)
        return date.toUTCString()
    }

    useEffect(() => {
        const periodToIntervalMap={1:'minute', 7:'minute',14:'minute',30:'minute',90:'hourly',180:'hourly',365:'hourly','Max':'hourly'}  //this is contrained by the free API so API may return less granular data
        setStatus('pending')
        const abortCont =new AbortController()
        fetch(`https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${baseMoneyURL}&days=${period}&interval=${periodToIntervalMap[period]}`,{signal:abortCont.signal})
            .then(response => response.json())
            .then(json => {
                json.prices?.map((point)=>{point[0] = convertToDate(point[0])});
                setRawPriceData(json)
                setStatus('success')
            })
            .catch(err=>{
                if(err==='AbortError'){
                    console.log('fetch coin price aborted')
                } else{
                    setStatus('error')
                    console.log('error when fetching coin price',err)
                }
            })
        return ()=>{
            console.log('clean up fetch coin price')
            abortCont.abort()
        }
    }, [baseMoneyURL, coinID, period])

    const xArray =[], yArray=[]
    for (let i =0; i<rawPriceData.prices?.length; i++){
        xArray.push(rawPriceData.prices?.[i][0])
        yArray.push(rawPriceData.prices?.[i][1])
    }

    const data = {
        labels: xArray,
        datasets: [{
            label: 'Price',
            data: yArray,
            borderColor: 'rgba(0, 0, 225,0.8)',
            backgroundColor: 'rgba(0, 0, 225,0.8)'
        }]
    }

    const tooltipVerticalLine={
        id:'tooltipVerticalLine',
        beforeDraw:(chart) =>{
            if(chart.tooltip?._active && chart.tooltip?._active.length){
                const ctx=chart.ctx
                const activePoint=chart.tooltip?._active[0]
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(activePoint.element.x, chart.scales.y.top);
                ctx.lineTo(activePoint.element.x, chart.scales.y.bottom);
                ctx.lineWidth =2;
                ctx.strokeStyle='#D3D3D3'
                ctx.stroke();//ctx.restore();
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
        },
        scales:{
            x:{
                ticks:{
                    maxTicksLimit: 8.1,
                    callback: function(value){
                        const unixTime=this.getLabelForValue(value)
                        const date = new Date(unixTime)
                        const month = date.toLocaleString('default',{month:'short'})
                        const year = date.getFullYear()
                        return `${date.getDate()}. ${month} ${year}`
                    }
                }
            }
        },
      };

    const periodMapping ={'24h':1, '7d':7,'14d':14,'30d':30,'90d':90,'180d':180,'1y':365,'Max':'max'}
    const handleClickPeriod =(e)=>{
        console.log('handleChangePeriod')
        setPeriod(periodMapping[e.target.value])
    }
    
    return (
        <>
            <h4>Historical Price Chart
                <span> {(status==='pending')?<img src={loading} width = '15px' height='15px'/>
                :(status==='error')?'error':'' }
                </span>
            </h4>
            <PeriodSelector
                period={period} handleClickPeriod={handleClickPeriod}
                periodMapping={periodMapping}/>
            <Line data={data} options={options} plugins={[tooltipVerticalLine]}
            />
        </>
    )
}