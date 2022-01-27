import { useState, useEffect } from "react"
import FilterBox from "./FilterBox"
import Table from "./Table"
import Pagination from './Pagination'
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import loading from'../loading.svg'

export default function DataTableWFilter() {
    const [searchParams, setSearchParams] = useSearchParams({})

    const [pageNum, setPageNum] = useState(searchParams.get("page") || 1)
    const [rawData, setRawData] = useState([])
    const [filterQ, setFilterQ] = useState('')
    const [status, setStatus] = useState('')

    const {baseMoneyURL} = useParams()

    useEffect(() => {
        console.log('pageNum to fetch', pageNum)
        // const abortCont = new AbortController()
        setStatus('pending')
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseMoneyURL||'usd'}&order=market_cap_desc&per_page=100&page=${pageNum}&sparkline=true&price_change_percentage=24h%2C7d`)
        .then((response) => response.json())
        .then((json) => { 
            setRawData(json) 
            console.log('json',json)
            setStatus('success')
        })
        .catch((error)=>{
            // if (error==='AbortError'){
            //     console.log('fetch data table aborted')
            // }else {
            setStatus('error')
            console.log('error when fetch data table', error)
            // }
        })
        // return ()=>{
        //     // abortCont.abort()
        //     // console.log('clean up of fetch data table')
        // }
    }, [pageNum])

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

            <Pagination pageNum={pageNum} handleChangePage={handleChangePage} handlePrevNextPage={handlePrevNextPage} /><br/>
            <FilterBox filterQ={filterQ}
                handleChangeFilter={(e) => { setFilterQ(e.target.value) }} />
            <div>
            {(status==='pending')
                ? <img src={loading} width = '100px' height='100px'/>
                :(status==='error')?'error' 
                : <Table filter={filter} rawData={rawData} />
            }
            </div>
        </>
    )
}