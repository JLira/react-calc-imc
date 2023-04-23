import { useState } from 'react'
import styles from './App.module.css'
import poweredImage from './assets/powered.png'
import leftArroImage from './assets/leftarrow.png'
import { levels, calculateImc, Level } from './helpers/imc'
import { GridITem } from './components/GridItem'

const App = () => {
  const [heightField, setHeightField] = useState<number>(0)
  const [weightField, setWeightField] = useState<number>(0)
  const [toShow, setToshow] = useState<Level | null>(null)

  const handleCalcularImc = () => {
    if (heightField && weightField) {
      setToshow(calculateImc(heightField, weightField));
    } else {
      alert('Digite todos os campos!')
    }
  }

  const handleBackButton = () => {
       setToshow(null);
       setHeightField(0);
       setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container} >
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>IMC é a sigla para Indice de Massa Corpórea</p>
          <input
            type="number"
            placeholder='Digite a sua altura. Ex 1.5(em metros)'
            value={heightField > 0 ? heightField : ''}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />
          <input
            type="number"
            placeholder='Digite o seu peso. Ex 75,3(em kg)'
            value={weightField > 0 ? weightField : ''}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false}
          />

          <button onClick={handleCalcularImc} disabled={toShow ? true : false}>Calcular</button>
        </div>

        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridITem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArroImage} alt="" width={25} />
              </div>
              <GridITem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div >
  )
}

export default App;