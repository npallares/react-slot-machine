import styles from "./App.module.css";
import Info from "./components/Info/Info";
import SlotContainer from "./components/SlotContainer/SlotContainer";

function App() {

  return (
    <div className={styles.app}>
      <Info/>
      <SlotContainer/>
    </div>
  )
}

export default App
