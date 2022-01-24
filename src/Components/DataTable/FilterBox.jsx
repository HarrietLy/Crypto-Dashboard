
export default function FilterBox({ filterQ,handleChangeFilter }) {

    return (
        <>
            <input placeholder='Filter by Name/ Symbol' value={filterQ} 
            onChange={(e)=>handleChangeFilter(e)} ></input>
        </>
    )
}