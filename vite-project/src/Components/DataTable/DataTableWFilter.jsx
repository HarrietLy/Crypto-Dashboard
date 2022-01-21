import { useState, useEffect } from "react"
import FilterBox from "./FilterBox"
import Table from "./Table"
import Pagination from './Pagination'
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";

export default function DataTableWFilter({ baseMoney }) {
    const [searchParams, setSearchParams] = useSearchParams({})

    const [pageNum, setPageNum] = useState(searchParams.get("page") || 1)
    const [rawData, setRawData] = useState([])
    const [filterQ, setFilterQ] = useState('')
    // const {baseMoneyURL} = useParams()

    const getAPIdata = (base, page) => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${base}&order=market_cap_desc&per_page=100&page=${page}&sparkline=true&price_change_percentage=24h%2C7d%2C30d`)
            .then((response) => response.json())
            .then((json) => {setRawData(json) })
    }

    useEffect(() => {
        console.log('pageNum to fetch',pageNum)
        getAPIdata(baseMoney, pageNum)
    }, [baseMoney, pageNum])

    const filter = (rows) => {
        return rows.filter((row) =>
            (row.name.toLowerCase().indexOf(filterQ.toLowerCase()) > -1) ||
            (row.symbol.toLowerCase().indexOf(filterQ.toLowerCase()) > -1)
        )
    }

    const handleChangePage = (newPage) => {
        setPageNum(newPage)
        setSearchParams({ page: newPage })
    }

    const handlePrevNextPage = (change, total_pages) => {
        const newPage = parseInt(pageNum) + change
        if (newPage > 0 && newPage <= total_pages) {
            setSearchParams({ page: newPage })
            setPageNum(newPage)
        }
    }

    return (
        <>
            <h3 >Crypto Currency Ranking by Market Cap</h3>
            <FilterBox filterQ={filterQ}
                handleChangeFilter={(e) => { setFilterQ(e.target.value) }} /><br /><br />
            <Table filter={filter} rawData={rawData} baseMoney={baseMoney} />
            <Pagination pageNum={pageNum} handleChangePage={handleChangePage} handlePrevNextPage={handlePrevNextPage} />
        </>
    )
}