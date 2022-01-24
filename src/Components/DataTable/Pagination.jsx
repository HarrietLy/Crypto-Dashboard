export default function Pagination({handleChangePage, handlePrevNextPage}) {
   const total_pages = 20
    return (
        <>
                <button onClick={()=>handlePrevNextPage(-1,total_pages)} >Prev</button>

                {[...Array(total_pages+1).keys()].map((pageNum)=>
                (pageNum>0)?
                <button key={pageNum} 
                        onClick={()=>handleChangePage(pageNum)}>{pageNum}</button> : null)}

                <button onClick={()=>handlePrevNextPage(1,total_pages)}>Next</button>
          
        </>

    )
}
