import { useState, useEffect } from "react"
import FilterBox from "./FilterBox"
import Table from "./Table"
import Pagination from './Pagination'
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import loading from '../loading.svg'
import NotFound from "../NotFound";
// import ReactPaginate from "react-paginate";

export default function DataTableWFilter() {
    const [searchParams, setSearchParams] = useSearchParams({})

    const [pageNum, setPageNum] = useState(searchParams.get("page") || 1)
    const [rawData, setRawData] = useState([])
    const [filterQ, setFilterQ] = useState('')
    const [status, setStatus] = useState('')

    const { baseMoneyURL } = useParams()

    useEffect(() => {
        console.log('pageNum to fetch', pageNum)
        setStatus('pending')
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseMoneyURL || 'usd'}&order=market_cap_desc&per_page=100&page=${pageNum}&sparkline=true&price_change_percentage=24h%2C7d`)
            .then((response) => {
                if (!response.ok) {
                    const err = new Error('response is not ok')
                    err.response = response
                    throw err
                } else
                    return response.json()
            })
            .then((json) => {
                setRawData(json)
                setStatus('success')
            })
            .catch((error) => {
                setStatus('error')
                console.log('error when fetch data table', error)
            })
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

    // const handlePageChangeLib=(e)=>{
    //     console.log(e)
    //     setPageNum(e.selected)
    //     setSearchParams({ page: e.selected })
    // }

    return (
        <>
            <h3 >Crypto Currency Ranking</h3>
            <br/>
            <Pagination pageNum={pageNum} 
                        handleChangePage={handleChangePage} 
                        handlePrevNextPage={handlePrevNextPage}
                        /><br />
            {/* react paginate lib - not in use as it cannot work with search params  */}
            {/* <ReactPaginate 
                previousLabel='<Prev'
                nextLabel='Next>'
                pageCount={101}
                onPageChange={handlePageChangeLib}
                containerClassName='paginationBttns'
                previousLinkClassName='previousBttn'
                nextLinkClassName='nextBttn'
                activeClassName='paginationActive'
            /> */}
            <FilterBox filterQ={filterQ}
                        handleChangeFilter={(e) => { setFilterQ(e.target.value) }} />
            <div>
                {(status === 'pending')
                    ? <img src={loading} width='100px' height='100px' />
                    : (status === 'error') ? <NotFound />
                        : <Table filter={filter} rawData={rawData} />
                }
            </div>
        </>
    )
}