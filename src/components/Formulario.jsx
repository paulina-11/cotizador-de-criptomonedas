import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #273947;
    border:none;
    width:100%;
    padding:10px;
    color: #FFF;
    font-weight:700;
    text-transform:uppercase;
    font-size:20px;
    border-radius:5px;
    transition:background-color .3s ease;
    margin-top:30px;
    font-family: 'poppins', sans-serif;

    &:hover{
        background-color:#20263E;
        cursor: pointer;
    }
`

const Formulario = ({ setMonedas }) => {
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tú moneda', monedas)
  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tú Criptomoneda', criptos)
  useEffect(() => {
    const consultarApi = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
      const respuesta = await fetch(url)
      const resultado = await respuesta.json()
      //   console.log(resultado.Data)
      //   creacion de arreglo
      const arrayCriptos = resultado.Data.map(cripto => {
        const objeto = {
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto
      })
      setCriptos(arrayCriptos)
    }
    consultarApi()
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault()
    if ([moneda, criptomoneda].includes('')) {
      setError(true)
      // eslint-disable-next-line no-useless-return
      return
    }
    // Todos los campos ingresados vuelve
    setError(false)
    // validación aprobada
    setMonedas({
      moneda,
      criptomoneda
    })
  }
  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCriptomoneda />
        <InputSubmit
          type='submit'
          value='cotizar'
        />
      </form>
    </>
  )
}

export default Formulario
