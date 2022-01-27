import { useNavigate, useParams } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate()
    const { baseMoneyURL } = useParams()

    return (
        <nav>
            <button onClick={() => navigate('/' + (baseMoneyURL ? baseMoneyURL : ''))}
                style={{ border: '1px solid #FFFFFF' }}
            >Main Dashboard</button>
            <button onClick={() => navigate('/about')}
                style={{ border: '1px solid #FFFFFF' }}>About</button>
        </nav>

    )
}