import { useState,useEffect } from "react"
import Slot from "../Slot/Slot"
import styles from "./SlotContainer.module.css"
import useResults from "../../hooks/useResults"
import getRandomRounds from "../../utils/getRandomRounds"
import clsx from 'clsx';
import { WIN_RATE } from "../../config/winrate"


const SlotContainer = () => {
  const [rounds, setRounds] = useState(getRandomRounds())
  const {roundResult, setResultOne, setResultTwo, setResultThree} = useResults()
  const [label, setLabel] = useState('')

  const stylesFromLabel = (roundResult) => {
    if(!roundResult) return styles.lose 
    return roundResult === WIN_RATE.HIGTH ? styles.higth : styles.low
  }

  useEffect(()=>{
    if(!roundResult.win) return setLabel('LOSE -1')
    setLabel(roundResult.win && roundResult.rate ===  WIN_RATE.HIGTH ? 'WIN + 9' : 'WIN + 1')
    console.log('Nico roundResult', roundResult, label)
  },[rounds, roundResult,label])

  if(!rounds) return
  return (
    <section className={styles.slotPage}>
      <h1 className={clsx(styles.message, stylesFromLabel(roundResult.rate))}>{label}</h1>
      <div className={styles.slotContainer}>
      <div  className={styles.templateContainer}>
        <div className={styles.slotsSection}>
          <span className={styles.winLine}/> 
          <Slot rounds={rounds} setResult={setResultOne}/>
          <Slot rounds={rounds} setResult={setResultTwo}/>
          <Slot rounds={rounds} setResult={setResultThree}/>
        </div>
      </div>
        <button className={styles.slotButton}onClick={() => setRounds(getRandomRounds())}>Girar</button>
      </div>
    </section>
  )
}

export default SlotContainer
