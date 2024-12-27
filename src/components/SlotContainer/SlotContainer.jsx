import { useState,useEffect } from "react"
import Slot from "../Slot/Slot"
import styles from "./SlotContainer.module.css"
import useResults from "../../hooks/useResults"
import getRandomRounds from "../../utils/getRandomRounds"
import clsx from 'clsx';
import { WIN_RATE } from "../../config/winrate"


const SlotContainer = () => {
  const [status, setStatus] = useState('uninitalized')
  const [rounds, setRounds] = useState(0)
  const {roundResult, setResultOne, setResultTwo, setResultThree} = useResults(rounds)
  const [label, setLabel] = useState('')
  const [counter, setCounter] = useState(0)
  const [disabledButton, setDisabledButton] = useState(false)

  const stylesFromLabel = (roundResult) => {
    if(roundResult === 'lose') return styles.lose 
    return roundResult === WIN_RATE.HIGTH ? styles.higth : styles.low
  }


  useEffect(()=>{
    const timer = setTimeout(()=>{

      //console.log('nico roundResult',roundResult)
      if(!roundResult.win){
        setCounter(counter-1)
        setDisabledButton(false)
        return setLabel('Lose -1')
      }
      if(roundResult.win && roundResult.rate ===  WIN_RATE.HIGTH){
        setCounter(counter+9)
        setDisabledButton(false)
        return  setLabel('Win + 9')
      }
      if(roundResult.win && roundResult.rate ===  WIN_RATE.LOW){
        setCounter(counter+1)
      setDisabledButton(false)
      return setLabel( 'Win + 1')
      }
      
    },500)
    return ()=> {
      setLabel( '...')
      setRounds(0)
      setDisabledButton(true)
      return clearTimeout(timer)
    }
  },[roundResult])

  const handlerClick = ()=>{
    setStatus('start')
    setRounds(0)
    setLabel('...')
    setDisabledButton(true)
    setRounds(getRandomRounds())
    return ''
  }
  


  if(status === 'uninitalized')return (
    <section className={styles.slotPage}>
      <h1 className={clsx(styles.message, stylesFromLabel(roundResult.rate))}>{'READY...'}</h1>
      <h1 className={clsx(styles.message)}>{'CREDITS: '+counter}</h1>
      <div className={styles.slotContainer}>
      <div  className={styles.templateContainer}>
        <div className={styles.slotsSection}>
          <span className={styles.winLine}/> 
          <Slot rounds={rounds} setResult={setResultOne}/>
          <Slot rounds={rounds} setResult={setResultTwo}/>
          <Slot rounds={rounds} setResult={setResultThree}/>
        </div>
      </div>
        <button className={clsx(styles.slotButton, disabledButton && styles.disabled)}onClick={() => handlerClick()}>Girar</button>
      </div>
    </section>
  )
  return (
    <section className={styles.slotPage}>
      <h1 className={clsx(styles.message, stylesFromLabel(roundResult.rate))}>{label}</h1>
      <h1 className={clsx(styles.message)}>{'CREDITS: '+counter}</h1>
      <div className={styles.slotContainer}>
      <div  className={styles.templateContainer}>
        <div className={styles.slotsSection}>
          <span className={styles.winLine}/> 
          <Slot rounds={rounds} setResult={setResultOne}/>
          <Slot rounds={rounds} setResult={setResultTwo}/>
          <Slot rounds={rounds} setResult={setResultThree}/>
        </div>
      </div>
        <button className={clsx(styles.slotButton, disabledButton && styles.disabled)}onClick={() => handlerClick()}>Split</button>
      </div>
    </section>
  )
}

export default SlotContainer
