import { useState, useEffect } from 'react'
import './App.css'
import DataTable from './Components/DataTable/DataTable'

function App() {

  const [rawData, setRawData] = useState([])

  const getTrendingCurr = () => {

    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h%2C7d%2C30d')
      .then((response) => response.json())
      .then((json) => {
        const newData = json
        setRawData(newData)
      })
  }

  useEffect(() => {
    getTrendingCurr()
  }, [])

  return (
    <div className="App">
      
      <h1>What is up in Crypto Space?</h1>
      
      <div>
        <input placeholder='search token'></input>
      </div>

      <div>
      <h3>Navigation Bar</h3>
      </div>



      <div>
      <h3>Crypto Currency Ranking by Market Cap</h3>
      <div>
      <input placeholder='filter by token name'></input>
      </div>
      <DataTable rawData={rawData} ></DataTable>
    </div>

      <div>
      <button>Prev</button>
      <button>1</button>
      <button>Next</button>
      </div>

    </div>
  )
}

export default App
