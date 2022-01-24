
export default function PeriodSelector({ period, handleClickPeriod, periodMapping }) {

    const periodButtonText = ['24h', '7d', '14d', '30d', '90d', '180d', '1y', 'Max']

    return (
        <>
            <div>
                {periodButtonText.map((elem, i) =>
                    <button
                        key={i}
                        onClick={handleClickPeriod}
                        value={elem}
                        style={{
                            backgroundColor: (periodMapping[elem] === period) ? '#982c61' : '#1d7484',
                            borderColor: '#f9f9f9',
                        }
                        }
                    >{elem}</button>)
                }
            </div>
        </>
    )
}