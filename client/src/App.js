import { useEffect, useState } from 'react'
import getCharacters from './services/getCharacters'
import Characters from './components/Characters/Characters'
import styled from 'styled-components/macro'
import HighScore from './components/HighScore/HighScore'
import WizardMatch from './pages/WizardMatch'

function App() {
  const [characters, setCharacters] = useState([])
  const [houseScores, setHouseScores] = useState({
    griffindor: 0,
    hufflepuff: 0,
    slytherin: 0,
    ravenclaw: 0,
  })
  const fetchCharactersFromApi = async () =>
    setCharacters(await getCharacters())

  useEffect(() => fetchCharactersFromApi(), [])

  return (
    <Container>
      <WizardMatch />
      <HighScore scores={houseScores} />
      <Characters characters={characters} />
    </Container>
  )
}

export default App

const Container = styled.div`
  background: #17141d;
  color: ivory;
  margin: 0;
  padding-bottom: 140px;
  text-align: center;
`
