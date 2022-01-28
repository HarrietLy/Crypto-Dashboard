import headerMap from "./headerMap"
import baseMoneyMap from "./baseMoneyMap"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Sparkline from "./Sparkline"

const rawHeadersToShow = ['market_cap_rank', 'image', 'name', 'symbol', 'current_price', 'price_change_percentage_24h_in_currency', "price_change_percentage_7d_in_currency", 'market_cap', 'circulating_supply', 'sparkline_in_7d', "last_updated",]


export default function Table({ rawData, filter }) {
    const { baseMoneyURL } = useParams()
    const navigate = useNavigate()

    const headers = rawHeadersToShow.map(rawHeader => headerMap[rawHeader] ? headerMap[rawHeader] : rawHeader)

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((heading, i) => <th key={i}>{heading}</th>)}
                </tr>
            </thead>

            <tbody>
                {filter(rawData).map((row, i) =>
                    <tr key={i}>
                        {
                            rawHeadersToShow.map((header, i) => (header === 'image')
                                ? <td key={i} width='30px'><img src={row[header]}
                                    alt={'image of ' + row.name} className='thumbnail'></img></td>
                                : (header === 'sparkline_in_7d') ?
                                    <td key={i}>
                                        <Sparkline sparkData={row[header].price}
                                            color={(row['price_change_percentage_7d_in_currency'] > 0) ? 'green' : 'red'}
                                            baseMoney={baseMoneyURL || 'usd'}
                                            coinID={row['id']} />
                                    </td>

                                    : (header === 'symbol') ? <td key={i} onClick={() => { navigate('/' + (baseMoneyURL || 'usd') + '/' + row['id']) }} style={{ cursor: 'pointer' }}> {row[header].toUpperCase()}</td>
                                        : (header === 'name') ? <td key={i} onClick={() => { navigate('/' + (baseMoneyURL || 'usd') + '/' + row['id']) }} style={{ cursor: 'pointer' }}>  {row[header]}</td>

                                            : (header === 'price_change_percentage_24h_in_currency' ||
                                                header === 'price_change_percentage_7d_in_currency')
                                                ?<td key={i}
                                                    style={{
                                                        color: (row[header] < 0) ? 'red' : 'green'
                                                    }}>
                                                    {parseFloat(row[header]).toFixed(1) + "%"}</td>

                                                : (header === 'last_updated')
                                                    ? <td key={i} width='80px' >{row[header].slice(0, 10)}</td>

                                                    : (header === 'current_price')
                                                        ?<td key={i} width='100px'>{baseMoneyMap[baseMoneyURL || 'USD']} {
                                                            (row[header] >= 1) ? row[header].toFixed(2) : row[header].toFixed(5)}</td>
                                                        
                                                            : (header === 'market_cap' || header === 'circulating_supply' || header === 'total_volume')
                                                            ? <td key={i}>{row[header].toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                                                            : <td key={i}>{row[header]}</td>
                            )
                        }
                    </tr>)}
            </tbody>
        </table>
    )
}