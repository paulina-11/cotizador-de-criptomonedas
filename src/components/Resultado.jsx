import styled from '@emotion/styled'
const Resultados = styled.div`
  color: #fff;
  font-family: "poppins", sans-serif;

  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 10px;
`
const Imagen = styled.img`
  display: block;
  width: 120px;
`
const Texto = styled.p`
  font-size: 18px;
  span {
    font-weight: 700;
  }
`
const Precio = styled.p`
  font-size: 35px;
  word-spacing: 4px;
  letter-spacing: 2px;
  text-align: center;
  color: #fff;
  font-family: "poppins", sans-serif;
  margin-bottom: 0;

  p {
    margin: 0;
    font-weight: 700;
  }
`
const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`

const Resultado = ({ resultado }) => {
  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } =
    resultado
  return (
    <Contenedor>
      <Precio>
        El precio es de: <p>{PRICE}</p>{' '}
      </Precio>
      <Resultados>
        <Imagen
          src={`https://cryptocompare.com/${IMAGEURL}`}
          alt='logocripto'
        />
        <div>
          <Texto>
            Precio más alto del día: <span>{HIGHDAY}</span>{' '}
          </Texto>
          <Texto>
            Precio más bajo del día: <span>{LOWDAY}</span>{' '}
          </Texto>
          <Texto>
            Variación ultimas 24 horas: <span>{CHANGEPCT24HOUR}</span>{' '}
          </Texto>
          <Texto>
            Última actualización: <span>{LASTUPDATE}</span>{' '}
          </Texto>
        </div>
      </Resultados>
    </Contenedor>
  )
}

export default Resultado
