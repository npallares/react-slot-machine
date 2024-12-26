import { useEffect, useState } from 'react'
import { WIN_RATE } from '../config/winrate'


const useResults = () => {
 //const [resultsStatus, setResultsStatus] = useState([])
 const [resultOne, setResultOne] = useState([])
 const [resultTwo, setResultTwo] = useState([])
 const [resultThree, setResultThree] = useState([])
 const [roundResult, setRoundResult] = useState({})

 useEffect(()=>{
    const getResult = () =>{
        const results = [resultOne,resultTwo,resultThree]
        return results
    }

    const checkLowWin = (results) =>{
        const uniqueValues = new Set(results);
        return uniqueValues.size !== results.length;
    }

    const checkWinner = () => {
        const results = getResult()
        //console.log('Results', results)
        if (results.length !== 3 ) return setRoundResult({win:false, rate:null})
        if (results[0] === results[1] && results[0] === results[2] ) return setRoundResult({win:true, rate: WIN_RATE.HIGTH})
        if (checkLowWin(results)) return setRoundResult({win:true, rate: WIN_RATE.LOW})
        return setRoundResult({win:false, rate:WIN_RATE.LOSE})
    }
    checkWinner()

 },[resultOne,resultTwo,resultThree])
 
 return {roundResult, setResultOne, setResultTwo, setResultThree}
 
}

export default useResults