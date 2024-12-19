//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import styles from "./App.module.css";
//import './App.css'
//import Contador from './components/Contador/Contador'
import Slot from './components/Slot/Slot'

function App() {

  return (
    <div className={styles.app}>
     <Slot/>
     <Slot/>
     <Slot/>
    </div>
  )
}

export default App
