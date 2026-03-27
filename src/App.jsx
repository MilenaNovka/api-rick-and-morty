import { api } from './api/api'
import s from  './App.module.css'
import { useEffect, useState } from 'react'

import logo from '/logoRM.png'
import { Card } from './components/card'

function App() {
  const [data, setData] = useState([])
  const [searchPage, setSearchPage] = useState(1)
  const [searchName, setSearchName] = useState("")
  const [erro, setErro] = useState("")

  useEffect(() => {
    setErro(false)
    api.get(`/character/?page=${searchPage}&name=${searchName}`).then((res) => {
      setData(res.data.results)
    }).catch((er) => {
      setErro(true)
      console.error(er)
    })
  }, [searchPage, searchName])

  return (
    <main>
      <img className={s.logo} src={logo} alt="Logo RM" />
      <div>
        <input type="number" value={searchPage} onChange={(e) => setSearchPage(e.target.value)} placeholder='1/42' />
        <input type="text" value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder='Digite um nome' />
      </div>
      {erro ? <h4 style={{color: 'red', backgroundColor: 'lightgray', padding: '5px', borderRadius: "999px"}}>Não foi possível acessar o personagem</h4>
      :
      <div className={s.wrapCards} >
        {data.map((item, index) => {
          return(
            <div key={index}>
              <Card 
              image={item.image} 
              name={item.name}
              status={item.status} 
              gender={item.gender} 
              species={item.species}/>
            </div>
          )
        })}
      </div>}
    </main>
  )
}

export default App