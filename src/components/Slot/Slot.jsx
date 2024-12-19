import { useEffect, useRef, useState } from 'react'
import styles from "./Slot.module.css"
import getRounds from './utils/getRounds';

const options ={ minOptions:3, maxOptions:9 }
const iconHeight = 79;
const timePerIcon = 100; // time
const itemsInitialState=['SIETE','BANANA','MELON','LIMON','BAR','CAMPANA','NARANJA','UVA','CEREZA']

/* const getRandomArray = (items,newFirstIndex) =>{
    const antes = items.slice(newFirstIndex-1, items.length);
       const despues = items.slice(0,newFirstIndex-1);
       const nuevoArray = [...antes,...despues];
       return nuevoArray
} */

const Slot = () => {
    const rounds = getRounds({options})
    const slotRef = useRef()
    const [items, setItems] = useState(itemsInitialState)
    const [positionIndex, setPositionIndex] = useState(0)
    const [vueltas, setVueltas] = useState(rounds) 

    const getNewArray = (newFirstIndex) => {
       const antes = items.slice(newFirstIndex-1, items.length);
       const despues = items.slice(0,newFirstIndex-1);
       const nuevoArray = [...antes,...despues];
       setItems(nuevoArray)
       return nuevoArray;
    };

    const getNewFirstIndex = (winner) =>{
        let newFitstIndex = 0; 
        for (let i=0;i<items.length;i++) {
            if (items[i] === winner) {
                newFitstIndex = i;
                break;
            }
        }
        return newFitstIndex
    }
     
    const getWinner = () => {     
        const winner =  items[vueltas + 1] ? items[vueltas + 1] : items[1]
        //console.log("WINNER", winner)
        
        const newFirstIndex = items[vueltas] ?  items[vueltas] : items[0]
        //console.log("newFirstIndex", newFirstIndex)
        
        const newFitstIndex = getNewFirstIndex(winner) 
        const newArray = getNewArray(newFitstIndex) 
        
        console.log({winner, newFirstIndex, newArray})
        //return {winner, newFirstIndex, newArray}
    }
    
    const roll = async() => {        
        return new Promise ((resolve)=>{
            const rounds = positionIndex + vueltas * iconHeight;
            const totalTime = vueltas * timePerIcon;
            slotRef.current.style.transition = `background-position-y ${totalTime}ms`;
            slotRef.current.style.backgroundPositionY = `-${rounds*10}px`;
            
            setTimeout(()=>{
                console.log('vueltas',vueltas)
                getWinner()
                resolve(vueltas)
                setPositionIndex(79 * vueltas + positionIndex)
                setVueltas(getRounds({options}))
            }, totalTime)
        })
        
    }

    const handleCLick = async() => {
        try {
            const data = await roll()
            const result = data.then((items)=> items[vueltas])
            return result
        } catch (error) {
            return error
        }
    }

    useEffect(()=>{
          console.log('useEffect items')  
    },[items])

  
 
    return (
       <>
        <div ref={slotRef} className={styles.reel}></div>
        <button onClick={handleCLick}>Girar</button>
        <img className={styles.slotreel} src={'/public/images/slotreel.png'}/>
       </>
    )
}

export default Slot
