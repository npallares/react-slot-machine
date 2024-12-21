import Slot from "../Slot/Slot"

const SlotContainer = () => {
  return (
    <section>
        <p>{'Slot Container'}</p>
    <div>
      <Slot/>
      <Slot/>
      <Slot/>
    </div>
    </section>
  )
}

export default SlotContainer
