import { useNavigate } from "react-router-dom"
import generatePolylinePoints from "./polylinePoints"

export default function Sparkline({ sparkData, color,  baseMoney, coinID}) {
    const width = 110
    const height = 22
    const navigate =useNavigate()

    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
        width={width} height={height} 
        style={{cursor:'pointer'}}
        onClick={()=>{navigate('/'+baseMoney+'/coins/'+coinID)}
        }>
            <polyline points= {generatePolylinePoints(sparkData,width,height)}
                            stroke={color} fill='none'/>
        </svg>
    )
}