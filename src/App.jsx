import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Spinner from './components/Spinner'
import Resultado from './components/Resultado'
const Contenedor = styled.div`
  max-width:900px;
  margin: 0 auto;
  width: 90%;
`
const Heading = styled.h1`
  font-family: 'poppins', sans-serif;
  color: #FFF;
  text-align:center;
  font-weight:700;
  margin-top:80px;
  margin-bottom:50px;
  font-size:34px;

  &::after{
    content:'';
    width:100px;
    height: 6px;
    background-color:#273947;
    display:block;
    margin: 10px auto 0 auto;
  }
`

function App () {
  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizarCripto = async () => {
        setLoading(true)
        // reset
        setResultado({})
        const { moneda, criptomoneda } = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setResultado(resultado.DISPLAY[criptomoneda][moneda])
        setLoading(false)
      }
      cotizarCripto()
    }
  }, [monedas])
  return (
    <Contenedor>
      <div>
        <Heading>Cotizador de Criptomonedas</Heading>
        <Formulario
          setMonedas={setMonedas}
        />
        {loading && <Spinner />}
        {/* se muestra cuando se tiene una cotizacion en el state */}
        {resultado.PRICE &&
          <Resultado
            resultado={resultado}
          />}
      </div>

    </Contenedor>
  )
}

export default App
