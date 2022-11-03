import './App.css'


import { BrowserRouter as Router } from "react-router-dom";


import Navbar  from './component/navbar/Navbar'

function App() {

  return (
    <Router>
      <div className={`font-noto_sans`}>
        <Navbar />
      </div>
    </Router>
  )
}

export default App
