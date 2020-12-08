import styled from 'styled-components/macro'
import Character from '../Character/Character'

export default function Characters({ characters }) {
  return (
    <Container>
      <h2>Characters:</h2>
      {characters.map((character) => (
        <Character character={character} key={character.name} />
      ))}
    </Container>
  )
}

const Container = styled.ul`
  background: #17141d;

  color: #fff;
  display: grid;
  font-family: sans-serif;
  gap: 4px;
  justify-content: center;
  padding: 0;
`
