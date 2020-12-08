import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import getCharacters from '../services/getCharacters'

import Character from '../components/Character/Character'

function WizardMatch() {
  const [playerA, setPlayerA] = useState({})
  const [playerB, setPlayerB] = useState({})
  const [spells, setSpells] = useState([])
  const [matchStarted, setMatchStarted] = useState(false)

  const fetchStudentsFromApi = async () => await getCharacters()
  const setupPlayers = async () => {
    const students = (await fetchStudentsFromApi()).filter(
      (student) => student.hogwartsStudent
    )
    const spells = await getSpells()

    const playerA = pickRandomArrayElement(students)
    playerA.spell = randomSpell(spells)
    setPlayerA(playerA)

    const studentsFromOtherHouses = students.filter(
      (student) => student.house !== playerA.house
    )
    const shuffledStudents = studentsFromOtherHouses.sort(
      () => Math.random() - 0.5
    )

    const playerB = shuffledStudents[0]
    playerB.spell = randomSpell(spells)

    setPlayerB(playerB)
  }

  async function getSpells() {
    const response = await fetch('http://localhost:4000/api/spells')
    const spells = await response.json()
    return spells
  }
  useEffect(() => setupPlayers(), [])

  return (
    <Container>
      {playerA && playerB && (
        <Match>
          <Character character={playerA} />
          <h3>{matchStarted && playerA?.spell?.spell}</h3>
          <BattleField>
            <span>✨</span>
            <h2>{matchStarted && showWinningPoints(playerA, playerB)}</h2>
          </BattleField>
          <Character character={playerB} />
          <h3>{matchStarted && playerB?.spell?.spell}</h3>
        </Match>
      )}
      <SpellButton onClick={() => castSpells()} disabled={matchStarted}>
        Cast spells
      </SpellButton>
    </Container>
  )

  function castSpells() {
    setMatchStarted(true)
  }

  function pickRandomArrayElement(array) {
    return array[Math.floor(Math.random() * array.length)]
  }

  function randomSpell(spells) {
    const randomSpell = pickRandomArrayElement(spells)
    const points = [5, 10, 15, 20, 25, 30, 40, 50]
    randomSpell.points = pickRandomArrayElement(points)
    return randomSpell
  }

  function showWinningPoints(playerA, playerB) {
    return playerA?.spell.points > playerB?.spell.points
      ? playerA.spell.points
      : playerB.spell.points
  }
}

export default WizardMatch

const Container = styled.div`
  background: #17141d;
  color: ivory;
  margin: 0;
  padding-bottom: 140px;
  width: 100%;
`

const Match = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
  div:first-child {
    margin-right: 2rem;
  }
`

const BattleField = styled.div`
  font-size: 4rem;
  margin-right: 2rem;
`
const SpellButton = styled.button`
  color: var(--font-color);
  font-size: 1.5rem;
  padding: 0.5rem 2rem;
  border: none;
  background: #7100d3;

  &[disabled] {
    background: #340061;
  }
`
