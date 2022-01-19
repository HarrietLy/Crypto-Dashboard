import {useNavigate  } from "react-router-dom";

export default function NavBar({baseMoney}) {
    const navigate= useNavigate()
    return (
        <nav>
        <button onClick={()=>navigate('/'+baseMoney)}>Main Dashboard</button>
        <button onClick={()=>navigate('/about')}>About</button>
        </nav>

    )
}