import clsx from 'clsx'
import styles from './Info.module.css'

const textInfo = 'Esta aplicación sencilla simula una "slot machine" que funciona directamente en el navegador web. El objetivo principal fue poner a prueba el uso de referencias al DOM (useRef) en React, permitiendo modificar estilos y valores en tiempo real. Además, se calculan los resultados dinámicamente para actualizar un estado específico: Credits.'
const Info = () => {
  return (
    <>
    <div className={styles.infoPageContainer}>
        <div className={styles.infoContainer}>
            <span className={clsx( styles.infoTitle )}>{'React Slot Machine'}</span>
            <span className={styles.infoText}>{textInfo}</span>
        </div>
    </div>
    </>
  )
}

export default Info
