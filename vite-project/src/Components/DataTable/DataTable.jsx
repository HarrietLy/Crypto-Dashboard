import headerMap from "./headerMap"

export default function DataTable({ rawData }) {

    const rawHeaders = ['market_cap_rank', 'image', 'name', 'symbol', 'current_price', 'market_cap', 'price_change_percentage_24h_in_currency', "price_change_percentage_7d_in_currency", 'total_volume', 'circulating_supply', "last_updated"]

    const headers = rawHeaders.map(rawHeader => headerMap[rawHeader] ? headerMap[rawHeader] : rawHeader)
    //console.log('test',rawData[0])

    const styleData = {
        //if header is price, display currency + two decimal - useContext later
        //if header is 24h or 7d, display %, green if =, red of neg
        //last Update
    }
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((heading, i) => <th key={i}>{heading}</th>)}
                </tr>
            </thead>
            <tbody>
                {rawData.map((row, i) => <tr key={i}>
                    {
                        rawHeaders.map((header, i) => (header === 'image')
                            ? <td key={i}><img src={row[header]}
                                alt={'image of ' + row['name']} className='thumbnail'></img></td>
                            // : (header==='sparkline_in_7d') ? 
                            // <td key={i}>
                            //     <svg width='150' height='30'>
                            //         <polyline points="0,100,50,25,50,75,100 " stroke='blue' fill='none'/></svg>
                            //     </td>
                            : (header === 'price_change_percentage_24h_in_currency') ?
                            <td key={i} 
                                style={{ 
                                    color:(row[header]<0)? 'red':'green' 
                                }}
                            >{parseFloat(row[header]*100).toFixed(1)+"%"}</td>
                            : <td key={i}>{row[header]}</td>
                        )
                    }
                </tr>)}

            </tbody>
        </table>
    )
}