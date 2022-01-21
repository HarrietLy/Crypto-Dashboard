import { useParams } from "react-router";

export default function Coin(){
    
    const {baseMoneyURL,coinID}=useParams()
    //console.log(useParams())
    //fetch once upon load historical price, descriptions and likes based on coinID and baseMoney

    return (
        <> 
        <h1>coinID: {coinID}</h1>
        <p> baseMoneyURL param should also be {baseMoneyURL}</p>
        </>
    )
}