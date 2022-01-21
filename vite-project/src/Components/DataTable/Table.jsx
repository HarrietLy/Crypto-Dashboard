import headerMap from "./headerMap"
import baseMoneyMap from "./baseMoneyMap"
import {Link, useParams} from 'react-router-dom'
import Sparkline from "./Sparkline"

const rawHeadersToShow = ['market_cap_rank', 'image', 'name', 'symbol', 'current_price',  'price_change_percentage_24h_in_currency', "price_change_percentage_7d_in_currency", 'market_cap','total_volume', 'circulating_supply','sparkline_in_7d', "last_updated",]


export default function Table({ rawData,filter,baseMoney }) {
    const {baseMoneyURL} = useParams()

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
                                : (header==='sparkline_in_7d') ? 
                                <td key={i}>
                                    <Sparkline sparkData ={row[header].price}
                                        color={(row['price_change_percentage_7d_in_currency']>=0)?'green':'red'}    />
                                    </td>

                                : (header === 'symbol') ? <td key={i}>{row[header].toUpperCase()}</td>
                                    : (header === 'name') ? <td key={i}> <Link to={'/' + (baseMoneyURL ||'usd') + '/coins/' + row['id']}>{row[header]}
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
                                                <td key={i}>{row[header].slice(0, 19).replace('T', ', ')}</td>
                                                : (header === 'current_price')
                                                ?
                                                <td key={i}>{baseMoneyMap[baseMoneyURL]} {
                                                    (row[header]>=1)?row[header].toFixed(2):row[header].toFixed(5)}</td>
                                                    : (header === 'market_cap' || header==='circulating_supply')
                                                    ?<td key={i}>{row[header].toLocaleString(undefined,{maximumFractionDigits:0})}</td>
                                                : <td key={i}>{row[header]}</td>
                            )
                        }
                    </tr>)}
                </tbody>
            </table>
    )
}