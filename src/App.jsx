import './App.css'
import Navbar from './components/navbar/navbar'
import Form from './components/form/form'
import Cryptosearch from './components/cryptosearch/cryptosearch'
import { useSelector } from 'react-redux'
const App = () => {
const {isModal}= useSelector((state)=>state.form)
  return (
    <div>
      <Navbar />
      <Form />
    {isModal &&  <Cryptosearch />} 
    </div>
  )
}

export default App