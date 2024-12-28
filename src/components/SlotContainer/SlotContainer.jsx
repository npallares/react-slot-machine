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
  const [actionLabel, setActionLabel] = useState('ADD CREDITS...')
  const [counter, setCounter] = useState(0)
  const [disabledButton, setDisabledButton] = useState(false)
  const [disabledSecondaryButton, setDisabledSecondaryButton] = useState(true)

  const stylesFromLabel = (roundResult) => {
    if(roundResult === 'lose') return styles.lose 
    return roundResult === WIN_RATE.HIGTH ? styles.higth : styles.low
  }

  useEffect(()=>{
    if(counter===0) {
      setDisabledButton(true)
      setDisabledSecondaryButton(false)
      setActionLabel('Add Credits')
      return setStatus('uninitalized')
      }
    if(counter===9 && status === 'uninitalized') setCounter(0)
      setDisabledButton(false)
    setDisabledSecondaryButton(true)
  },[counter,status])


  useEffect(()=>{
    const timer = setTimeout(()=>{
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
    },450)
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

  const handlerSecondaryClick =()=>{
    setCounter(8)
    setActionLabel('Good Luck')
  }
  


  if(status === 'uninitalized')return (
    <section className={styles.slotPage}>
      <div className={styles.slotContainer}>
      <h1 className={clsx(styles.message, stylesFromLabel(roundResult.rate))}>{actionLabel}</h1>
        <div  className={styles.templateContainer}>
          <div className={styles.slotsSection}>
            <span className={styles.winLine}/> 
            <span className={styles.winLine2}/> 
            <Slot rounds={rounds} setResult={setResultOne}/>
            <Slot rounds={rounds} setResult={setResultTwo}/>
            <Slot rounds={rounds} setResult={setResultThree}/>
          </div>
      <h1 className={clsx(styles.credits, styles.neonText)}>{'Credits: '+counter}</h1>
          <div className={styles.buttonSection}>
            <button disabled={disabledButton} className={clsx(styles.slotButton, disabledButton && styles.disabled)}onClick={() => handlerClick()}>Spin</button>
            <button disabled={disabledSecondaryButton} className={clsx(styles.secondaryButton, styles.slotButton, disabledSecondaryButton && styles.disabled)}onClick={() => handlerSecondaryClick()}>Credits</button>
          </div>
        </div>
      </div>
    </section>
  )
  return (
    <section className={styles.slotPage}>
      <div className={styles.slotContainer}>
      <h1 className={clsx(styles.message, styles.neonText,stylesFromLabel(roundResult.rate))}>{label}</h1>
        <div  className={styles.templateContainer}>
          <div className={styles.slotsSection}>
            <span className={styles.winLine}/> 
            <span className={styles.winLine2}/> 
            <Slot rounds={rounds} setResult={setResultOne}/>
            <Slot rounds={rounds} setResult={setResultTwo}/>
            <Slot rounds={rounds} setResult={setResultThree}/>
          </div>
      <h1 className={clsx(styles.credits, styles.neonText)}>{'Credits: '+counter}</h1>
          <div className={styles.buttonSection}>
            <button disabled={disabledButton} className={clsx(styles.slotButton, disabledButton && styles.disabled)}onClick={() => handlerClick()}>Spin</button>
            <button disabled={disabledSecondaryButton} className={clsx(styles.slotButton, styles.secondaryButton, disabledSecondaryButton && styles.disabled)}onClick={() => handlerSecondaryClick()}>Credits</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SlotContainer
