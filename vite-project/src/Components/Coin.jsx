import { useParams } from "react-router";

export default function Coin({baseMoney}){
    
    const {coinID}=useParams()

    //fetch once upon load historical price, descriptions and likes

    return (
        <> 
        <h1>{coinID} data in {baseMoney}</h1>
        </>
    )
}