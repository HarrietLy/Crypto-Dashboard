import { useState } from "react"

import FilterBox from "./FilterBox"
import Table from "./Table"
import Pagination from './Pagination'

export default function DataTableWFilter({ rawData, baseMoney}) {
    const [filterQ, setFilterQ] = useState('')

    const handleChangeFilter = (e) => {
        console.log('handleChangeFilter')
        setFilterQ(e.target.value)
    }

    const filter = (rows) => {
        return rows.filter((row) =>
            (row.name.toLowerCase().indexOf(filterQ.toLowerCase()) > -1) ||
            (row.symbol.toLowerCase().indexOf(filterQ.toLowerCase()) > -1)
        )
    }

    return (
        <>
            <h3 >Crypto Currency Ranking by Market Cap</h3>

            <FilterBox filterQ={filterQ} handleChangeFilter={handleChangeFilter}></FilterBox>
            <Table filter={filter} rawData={rawData} baseMoney={baseMoney}></Table>
            <Pagination/>
        </>
    )
}