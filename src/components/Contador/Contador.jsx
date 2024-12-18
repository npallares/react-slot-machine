import  { useRef } from 'react'

const Contador = () => {
    const menuRefBtn = useRef()
    const menuRef = useRef()

    

    const hanldeToggleMenu=()=>{
        if(menuRefBtn.current.textContent === 'Menu'){
            menuRefBtn.current.textContent = 'Cerrar'
            menuRef.current.style.display = 'none'
        }else{
            menuRefBtn.current.textContent = 'Menu'
            menuRef.current.style.display = 'block'
        }
    }

  return (
    <>
        <button ref={menuRefBtn} onClick={hanldeToggleMenu}>
            Menu
        </button>
        <nav ref={menuRef}>
            <a href="#">
                Seccion 1
            </a>
        </nav>
    </>
  )
}

export default Contador