import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [page , setPage] = useState(1)
  const [bgColor, setBgColor] = useState("lightblue")
  //  const currentPageRef = useRef(1)
  let postPerPage=5
  
  function chengeBg(){
    setBgColor(bgColor ==="lightblue" ?"lightgreen" :"lightblue")
  }

  async function getData(){
       try{
          let res =  await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
          let data = await res.json()
          setData(data.results)
          setError("")
       }catch(err){
         setError("ERROR:", err.message)
       }
  }
 
  useEffect(()=>{
    getData()
  },[page])
 
  let lastPage = page * postPerPage 
  let firstPage =  lastPage - postPerPage
  let post = data.slice(firstPage,lastPage)

  if(data==null || data.length <= 0) {
    return <h1>Loding ...</h1>
  }
  
  return (

     
    <div style={{ padding: '20px' }} onClick={chengeBg}>
      <h2>Page: {page}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {post.map((char) => (
          <div
            key={char.id}
            style={{
              background: '#eee',
              padding: '10px',
              borderRadius: '8px',
              color:"black",
              textAlign: 'center'
            }}
          >
            <img src={char.image} alt={char.name} style={{ width: '100%', borderRadius: '8px' }} />
            <h4>{char.name}</h4>
          </div>
        ))}
      </div>

      {error && <p>{error}</p>}

       <button onClick={()=> setPage(page => page-1)} disabled={page===1}> prev</button>
       <button onClick={()=> setPage(page => page+1)}>next</button>
       
    </div>
  )
}

export default App
