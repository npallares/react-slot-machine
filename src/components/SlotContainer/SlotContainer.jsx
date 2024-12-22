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
  const [label, setLabel] = useState('HOLA')

  const stylesFromLabel = (roundResult) => {
    if(!roundResult) return styles.lose 
    return roundResult === WIN_RATE.HIGTH ? styles.higth : styles.low
  }

  useEffect(()=>{
    setLabel(roundResult.win ? 'WIN' : 'LOSE')
    console.log('Nico roundResult', roundResult, label)
  },[rounds, roundResult,label])

  if(!rounds) return
  return (
    <section className={styles.slotContainer}>
      <h1 className={clsx(styles.message, stylesFromLabel(roundResult.rate))}>{label}</h1>
      <div className={styles.slotsSection}>
        <Slot rounds={rounds} setResult={setResultOne}/>
        <Slot rounds={rounds} setResult={setResultTwo}/>
        <Slot rounds={rounds} setResult={setResultThree}/>
      </div>
      <button onClick={() => setRounds(getRandomRounds())}>Girar</button>
    </section>
  )
}

export default SlotContainer
