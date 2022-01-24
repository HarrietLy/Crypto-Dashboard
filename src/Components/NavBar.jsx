import {useNavigate, useParams } from "react-router-dom";

export default function NavBar() {
    const navigate= useNavigate()
    const {baseMoneyURL} =useParams()
    
    return (
        <nav>
        <button onClick={()=>navigate('/'+ (baseMoneyURL ? baseMoneyURL: ''))}>Main Dashboard</button>
        <button onClick={()=>navigate('/about')}>About</button>
        </nav>

    )
}