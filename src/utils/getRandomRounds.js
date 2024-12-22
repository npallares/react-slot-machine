import getRounds from "../components/Slot/utils/getRounds"

const getRandomRounds = () =>{
    const options ={ minOptions:3, maxOptions:9 }
    const newRounds = getRounds({options})
    return newRounds
  }

export default getRandomRounds
  