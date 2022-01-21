import generatePolylinePoints from "./polylinePoints"

export default function Sparkline({ sparkData, color}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width='110' height='30'>
            <polyline points= {generatePolylinePoints(sparkData,110,30)}
                            stroke={color} fill='none'/>
        </svg>
    )
}