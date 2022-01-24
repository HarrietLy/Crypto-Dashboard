
export default function PeriodSelector({period,periodOptions,handleChangePeriod}) {
    const periodMapping ={1:'24h', 7:'7d', 14:'14d',30:'30d',90:'90d',180:'180d',365:'1y','max':'Max'}

    const periodButtonText = periodOptions.map(elem=>periodMapping[elem])
    return (
        <>
            <div>
            {periodButtonText.map((elem,i)=>
            <button 
                key={i}
                onClick={handleChangePeriod}
                >{elem.toString()}</button>)
            }
            </div>
        </>
    )
}