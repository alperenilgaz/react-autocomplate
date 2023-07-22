import { useEffect,useRef, useState } from "react";

function App() {
  const data = [
    {
      id:1,
      title:'test 1'
    },
    {
      id:2,
      title:'Test 2'
    },
    {
      id:3,
      title:'deneme'
    },
    {
      id:4,
      title:'Deneme'
    }
  ]
  
  const [search, setsearch] = useState("")
  const [result, setresult] = useState(false)
  const istyping = search.replace(/\s+/,'').length>0
  const searchRef = useRef()
  useEffect(()=>{
    if(istyping){
      const filteredResult = data.filter(item => item.title.toLocaleLowerCase().includes(search))
      setresult(filteredResult.length> 0 ? filteredResult:false)
  

  }else{
    setresult(false)
  }
  },[search])
  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutSide)
      return () => {
       document.removeEventListener('mousedown',handleClickOutSide)
      }
  },[])
  const handleClickOutSide = (e) => {
    if(!searchRef.current.contains(e.target))
    {
      setsearch('')
    }
  }
  return (
    <>
    <div ref={searchRef} className="search">
      <input value={search} className={istyping ? 'typing':null} type="text" onChange={(e)=> {setsearch(e.target.value)}}  />
        
       {istyping && (
        <div className="search-result">
          { result && result.map(item => (
            <div key={item.id} className="search-result-item"> 
              {item.title}
            </div>
          ))}
          {!result &&(
            <div className="result-not-found">
              {search} ile ilgili bir şey bulunamadı!
            </div>
          )}
        </div>
       )}
    </div>
    </>
  );
}

export default App;
