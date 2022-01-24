import { useParams } from "react-router-dom"

export default function BaseCurrency({handleSelect}) {
    const {baseMoneyURL} =useParams()
    return (
        <>
        <label>Base Currency:</label>
        <select  onChange={handleSelect} value={baseMoneyURL||'USD'} >
            <option value='USD'>USD</option>
            <option value='SGD'>SGD</option>
            <option value='EUR'>EUR</option>
            <option value='CNY'>CNY</option>
            <option value='GBP'>GBP</option>
            <option value='HKD'>HKD</option>
        </select>
        </>
    )
}