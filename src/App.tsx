import { useState } from "react"
import Movies from "./components/Ui/Movies"
import Navbar from "./components/Ui/Navbar"

function App() { 
  const [search , setSearch] = useState('')

  return (
    <div>
      <Navbar setSearch={setSearch}/>
      <Movies search={search}/>
    </div>
  )
}

export default App
