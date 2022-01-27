import { Link } from "react-router-dom"
import error from './error.png'

export default function NotFound() {
    return (
        <>
        <img src={error} alt='error' height='50px' width='50px'/>
        
        <div>Page Not Found. Let's go{<Link to='/'> Home</Link>}</div>
        </>

    )
}