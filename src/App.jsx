import { useState, useEffect } from 'react'
import './App.css'
import DataTableWFilter from './Components/DataTable/DataTableWFilter'
import SearchBar from './Components/Search/SearchBar'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Outlet, Route, Routes, useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import About from "./Components/About"
import Coin from './Components/Coin/Coin'
import BaseCurrency from './Components/BaseCurrency'

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleSelect = (e) => {
    const newBaseMoney = e.target.value

    const currentURLPath = location.pathname
    const currentURLSearchParam = location.search
    navigate({
      pathname: '/' + newBaseMoney + currentURLPath.substring(1 + newBaseMoney.length),
      search: currentURLSearchParam
    }//assume baseCurrency always has the same length
    )
  }

  const Layout = () => {
    return (
      <>
        <div>
          <NavBar />
        </div>
        <div className="currency-selector">
          <BaseCurrency handleSelect={handleSelect} />
        </div>
        <div className="search-bar">
          <SearchBar />
        </div>
        <br />
        <Outlet />
      </>
    )
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<DataTableWFilter />} />
          <Route path='about' element={<About />} />
          <Route path=":baseMoneyURL" element={<DataTableWFilter />} />
          <Route path=':baseMoneyURL/:coinID' element={<Coin />} />
        </Route>
      </Routes>

      <br />
      <Footer></Footer>
    </div>
  )
}

export default App

