export default function BaseCurrency({handleSelect}) {
    return (
        <select onChange={handleSelect}>
            <option>USD</option>
            <option>SGD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>HKD</option>
        </select>
    )
}