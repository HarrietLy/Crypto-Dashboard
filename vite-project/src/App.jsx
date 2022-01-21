import { useState, useEffect } from 'react'
import './App.css'
// import "bootstrap/dist/css/bootstrap.min.css";
import "purecss/build/pure.css"
import DataTableWFilter from './Components/DataTable/DataTableWFilter'
import SearchBar from './Components/Search/SearchBar'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Outlet, Route, Routes, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import About from "./Components/About"
import Coin from './Components/Coin'
import BaseCurrency from './Components/BaseCurrency'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const [baseMoney, setBaseMoney] = useState(location.pathname.length>1 ? location.pathname.substring(1,4) : 'usd')
 
  const handleSelect = (e) => {
    const newBaseMoney = e.target.value
    setBaseMoney(newBaseMoney)
    const currentURLPath = location.pathname
    const currentURLSearchParam = location.search
    navigate({pathname:'/'+newBaseMoney+currentURLPath.substring(1+newBaseMoney.length),
              search: currentURLSearchParam
              }//assume baseCurrency always has the same length
            ) 
  }

  const Layout = () => {
    return (
      <>
        <NavBar baseMoney={baseMoney} /><br />
        <BaseCurrency handleSelect={handleSelect} /><br /><br />
        <SearchBar/>
        <Outlet />
      </>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<DataTableWFilter baseMoney={baseMoney}/>} />
          <Route path='about' element={<About />} />
          <Route path=":baseMoneyURL" element={<DataTableWFilter baseMoney={baseMoney}/>} />
          <Route path=':baseMoneyURL/coins/:coinID' element={<Coin />} />
        </Route>
      </Routes>

      <br />
      <Footer></Footer>
    </div>
  )
}

export default App

