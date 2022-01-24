
export default function PeriodSelector({period,handleClickPeriod}) {
    
    const periodButtonText =['24h','7d','14d','30d','90d','180d','1y','Max']
    const periodMapping ={'24h':1, '7d':7,'14d':14,'30d':30,'90d':90,'180d':180,'1y':365,'Max':'max'}
    return (
        <>
            
            {periodButtonText.map((elem,i)=>
            <button 
                key={i}
                onClick={handleClickPeriod}
                value={elem}
                style={{backgroundColor:'red',
                    borderColor: '#982c61',
                        }
                    }
                // className={(periodMapping[elem]===1)?'active-button':''}
                >{elem}</button>)
            }
           
        </>
    )
}