export default function Pagination({handleChangePage, handlePrevNextPage,pageNum}) {
   const total_pages = 20

   const activePageBttnStyle={
        border:'1px solid #982c61',
        color: 'white',
        backgroundColor: '#982c61'
   }
    return (
        <div className='paginationBttns' >
                <button onClick={()=>handlePrevNextPage(-1,total_pages)} >Prev</button>

                {[...Array(total_pages+1).keys()].map((page)=>
                (page>0)?
                <button key={page} 
                        onClick={()=>handleChangePage(page)}
                        style={(page===parseInt(pageNum))? activePageBttnStyle : null}
                        >{page}</button> : null)}

                <button onClick={()=>handlePrevNextPage(1,total_pages)}>Next</button>
          
        </div>

    )
}
