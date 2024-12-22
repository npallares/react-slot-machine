import { useState,useEffect } from "react"
import Slot from "../Slot/Slot"
import getRounds from "../Slot/utils/getRounds"
import styles from "./SlotContainer.module.css"

const getRandomRounds = () =>{
  const options ={ minOptions:3, maxOptions:9 }
  const newRounds = getRounds({options})
  return newRounds
}

const SlotContainer = () => {

  const [rounds, setRounds] = useState(getRandomRounds())
  
  useEffect(()=>{
    console.log('Nico', rounds)
  },[rounds])

  if(!rounds) return
  return (
    <section className={styles.slotContainer}>
      <p>{'Slot Container'}</p>
      <div className={styles.slotsSection}>
        <Slot rounds={rounds}/>
        <Slot rounds={rounds}/>
        <Slot rounds={rounds}/>
      </div>
      <button onClick={() => setRounds(getRandomRounds())}>Girar</button>
    </section>
  )
}

export default SlotContainer
