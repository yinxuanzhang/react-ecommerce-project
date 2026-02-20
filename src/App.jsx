import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Homepage } from '../pages/HomePage';
import './App.css'

function App() {
  

  return (
   
    <Routes>
      <Route index element={<Homepage/>}/>
    </Routes>
    
  )
}

export default App
