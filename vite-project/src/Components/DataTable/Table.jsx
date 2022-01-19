import headerMap from "./headerMap"
import {Link} from 'react-router-dom'

export default function Table({ rawData,baseMoney,filter }) {

    const rawHeadersToShow = ['market_cap_rank', 'image', 'name', 'symbol', 'current_price', 'market_cap', 'price_change_percentage_24h_in_currency', "price_change_percentage_7d_in_currency", 'total_volume', 'circulating_supply', "last_updated"]

    const headers = rawHeadersToShow.map(rawHeader => headerMap[rawHeader] ? headerMap[rawHeader] : rawHeader)

    return (
            <table>
                <thead>
                    <tr>
                        {headers.map((heading, i) => <th key={i}>{heading}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {filter(rawData).map((row, i) => <tr key={i}>
                        {
                            rawHeadersToShow.map((header, i) => (header === 'image')
                                ? <td key={i}><img src={row[header]}
                                    alt={'image of ' + row.name} className='thumbnail'></img></td>
                                // : (header==='sparkline_in_7d') ? 
                                // <td key={i}>
                                //     <svg width='150' height='30'>
                                //         <polyline points="0,100,50,25,50,75,100 " stroke='blue' fill='none'/></svg>
                                //     </td>

                                : (header === 'symbol') ? <td key={i}>{row[header].toUpperCase()}</td>
                                    : (header === 'name') ? <td key={i}> <Link to={'/' + baseMoney + '/coins/' + row['id']}>{row[header]}
                                    </Link>
                                    </td>
                                        : (header === 'price_change_percentage_24h_in_currency' ||
                                            header === 'price_change_percentage_7d_in_currency')
                                            ?
                                            <td key={i}
                                                style={{
                                                    color: (row[header] < 0) ? 'red' : 'green'
                                                }}>
                                                {parseFloat(row[header]).toFixed(1) + "%"}</td>
                                            : (header === 'last_updated')
                                                ?
                                                <td key={i}>{row[header].slice(0, 19).replace('T', ' ')}</td>
                                                : <td key={i}>{row[header]}</td>
                            )
                        }
                    </tr>)}

                </tbody>
            </table>
    )
}