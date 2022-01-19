import { useState, useEffect } from 'react'
import './App.css'
// import "bootstrap/dist/css/bootstrap.min.css";
import "purecss/build/pure.css"
import DataTableWFilter from './Components/DataTable/DataTableWFilter'
import SearchBar from './Components/SearchBar'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Route, Routes,useNavigate } from 'react-router-dom'
import About from "./Components/About"
import Coin from './Components/Coin'
import BaseCurrency from './Components/BaseCurrency'

function App() {

  const [rawData, setRawData] = useState([])
  const [baseMoney, setBaseMoney] =useState('usd')
 

  const getAPIdata = (baseMoney,items_per_page,page) => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${baseMoney}&order=market_cap_desc&per_page=${items_per_page}&page=${page}&sparkline=true&price_change_percentage=24h%2C7d%2C30d`)
      .then((response) => response.json())
      .then((json) => {
        setRawData(json)
      })
  }

  useEffect(() => {
    getAPIdata(baseMoney,100,1)
  }, [baseMoney])

  const handleSelect=(e)=>{
    setBaseMoney(e.target.value)
    //everytime how to hange URL?
  }

  return (
    <div className="App">
      <NavBar baseMoney={baseMoney} /><br/>
      <BaseCurrency handleSelect={handleSelect}/><br/><br/>
      <SearchBar rawData={rawData} baseMoney={baseMoney} />

      <Routes>
        <Route path='/' >
          <Route index element={<DataTableWFilter rawData={rawData} baseMoney ={baseMoney}/>}/>
          <Route path='about' element={<About />} />
          <Route path=":baseMoney"element={<DataTableWFilter rawData={rawData} baseMoney ={baseMoney}/>} />
          <Route path=':baseMoney/coins/:coinID' element={<Coin baseMoney ={baseMoney}/> } />
        </Route>
      </Routes>

      <br/>
      <Footer></Footer>
    </div>
  )
}

export default App
