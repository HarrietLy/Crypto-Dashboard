import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [currObj, setCurrObj] = useState({})

  const getTrendingCurr = () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C30d')
      .then((response) => response.json())
      .then((data) => {
        const newData = data
        console.log('newData', newData)
        console.log('test',typeof newData)

        setCurrObj(newData)

      })
  }

  const test =[{
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",},
    {"id": "ethereum",
    "symbol": "eth",
    "name": "Ethereum",}]
  console.log(test)
  const currArray = test.map((elem,i) => (
    <div key={i}>
      <h5  >{elem.name}</h5>
      <p></p>
    </div>
  ))

    useEffect(() => {
      getTrendingCurr()
    }, [])

  return (
    <div className="App">
      <h1>What is up in Crypto Space?</h1>
      <h3>Dashboard</h3>
      {currArray }
    </div>
  )
}

export default App
