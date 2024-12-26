import { useState,useEffect } from "react"
import Slot from "../Slot/Slot"
import styles from "./SlotContainer.module.css"
import useResults from "../../hooks/useResults"
import getRandomRounds from "../../utils/getRandomRounds"
import clsx from 'clsx';
import { WIN_RATE } from "../../config/winrate"


const SlotContainer = () => {
  //const [status, setStatus] = useState('uninitalized')
  const [rounds, setRounds] = useState(0)
  const {roundResult, setResultOne, setResultTwo, setResultThree} = useResults()
  const [label, setLabel] = useState('')
  const [counter, setCounter] = useState(0)

  const stylesFromLabel = (roundResult) => {
    if(!roundResult) return styles.lose 
    return roundResult === WIN_RATE.HIGTH ? styles.higth : styles.low
  }

  useEffect(()=>{
    console.log('CHANGE ROUNDS', rounds)
  },[rounds])

  useEffect(()=>{
    const timer = setTimeout(()=>{

      console.log('nico roundResult',roundResult)
      if(!roundResult.win){
        setCounter(counter-1)
        return setLabel('Lose -1')
      }
      if(roundResult.win && roundResult.rate ===  WIN_RATE.HIGTH){
        setCounter(counter+9)
        return  setLabel('Win + 9')
      }
      setCounter(counter+1)
      return setLabel( 'Win + 1')
    },500)
    return ()=>{
      setLabel( '...')
      return clearTimeout(timer)
    }
  },[roundResult])


  
  return (
    <section className={styles.slotPage}>
      <h1 className={clsx(styles.message)}>{'CREDITS: '+counter}</h1>
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
