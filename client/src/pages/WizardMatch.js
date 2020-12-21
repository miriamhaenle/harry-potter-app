import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import Character from '../components/Character/Character'
import getCharacters from '../services/getCharacters'
import { houseColor } from '../services/houseColor'

function WizardMatch() {
  const [playerA, setPlayerA] = useState({})
  const [playerB, setPlayerB] = useState({})
  const [spells, setSpells] = useState([])
  const [matchStarted, setMatchStarted] = useState(false)

  const fetchStudentsFromApi = async () => await getCharacters()

  const createPlayer = (students, spells) => {
    const player = pickRandomArrayElement(students)
    player.spell = randomSpell(spells)
    return player
  }

  const studentsFromOtherHouses = (students, firstPlayer) =>
    students.filter((student) => student.house !== firstPlayer.house)

  const shuffledStudents = (studentsFromOtherHouses) =>
    studentsFromOtherHouses.sort(() => Math.random() - 0.5)

  const setupPlayers = async (winner) => {
    const students = (await fetchStudentsFromApi()).filter(
      (student) => student.hogwartsStudent
    )
    const spells = await getSpells()
    const playerA = winner || createPlayer(students, spells)
    setPlayerA(playerA)

    const playerB = createPlayer(
      shuffledStudents(studentsFromOtherHouses(students, playerA)),
      spells
    )
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
          <PlayerCard
            position="playerA"
            animateOut={
              matchStarted && playerA !== calculateWinner(playerA, playerB)
            }
          >
            <Character character={playerA} />
            <Spell color={houseColor(playerA.house)}>
              {matchStarted && playerA?.spell?.spell}
            </Spell>
          </PlayerCard>
          <BattleField
            matchStarted={matchStarted}
            winner={
              matchStarted && calculateWinner(playerA, playerB) === playerA
                ? 'playerA'
                : 'playerB'
            }
          >
            <h2>✨</h2>
            <h3>{matchStarted && showWinningPoints(playerA, playerB)}</h3>
            <p>
              <strong>
                {matchStarted && calculateWinner(playerA, playerB).name}
              </strong>
            </p>
          </BattleField>
          <PlayerCard
            position="playerB"
            animateOut={
              matchStarted && playerB !== calculateWinner(playerA, playerB)
            }
          >
            <Character character={playerB} />
            <Spell color={houseColor(playerB.house)}>
              {matchStarted && playerB?.spell?.spell}
            </Spell>
          </PlayerCard>
        </Match>
      )}
      <SpellButton
        onClick={() => runMatch(playerA, playerB)}
        disabled={matchStarted}
      >
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

  function runMatch(playerA, playerB) {
    castSpells()
    const winner = calculateWinner(playerA, playerB)
    showWinningPoints(playerA, playerB)
    setTimeout(() => startNewMatch(winner), 1000)
  }

  function startNewMatch(winner) {
    setupPlayers(winner)
    setMatchStarted(false)
  }
  function whoIsTheWinner(playerA, playerB) {
    return playerA?.spell.points > playerB?.spell.points
  }

  function calculateWinner(playerA, playerB) {
    return whoIsTheWinner(playerA, playerB) ? playerA : playerB
  }

  function showWinningPoints(playerA, playerB) {
    return whoIsTheWinner(playerA, playerB)
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
  position: relative;
  height: 300px;
`

const PlayerCard = styled.div`
  margin-right: 2.4rem;
  position: absolute;
  left: ${(props) => (props.position === 'playerA' ? '10%' : '65%')};
  animation: ${(props) => props.animateOut && 'animateOut'} linear 1.5s forwards;
  top: 10%;

  @keyframes animateOut {
    0% {
      left: ${(props) => (props.position === 'playerA' ? '10%' : '65%')};
      opacity: 1;
      transform: rotate(0);
      top: 10%;
    }

    100% {
      left: ${(props) => (props.position === 'playerA' ? '-20%' : '120%')};
      top: 50%;
      opacity: 0;
      transform: ${(props) =>
        props.position === 'playerA' ? 'rotate(-90deg)' : 'rotate(90deg)'};
    }
  }
`

const Spell = styled.h3`
  color: ivory;
`

const BattleField = styled.div`
  font-size: 4rem;
  margin-right: 2.4rem;

  p {
    color: hotpink;
    font-size: 1.2rem;
  }
  h2 {
    animation: ${(props) =>
      props.matchStarted ? 'zoomOut ease-out 1.5s' : ''};
  }

  @keyframes zoomOut {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
      transform: ${(props) =>
        props.winner === 'playerA'
          ? 'translateX(400px) scale(10)'
          : 'translateX(-400px) scale(10)'};
    }
    80% {
      opacity: 0;
    }
    100% {
      opacity: 1;
      transform: ${(props) =>
        props.winner === 'playerA'
          ? 'translateX(0) scale(1)'
          : 'translateX(0) scale(1)'};
    }
  }
`
const SpellButton = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: -2px -2px 1rem #6a00c7, 2px 2px 5px #340061, 6px 6px 1rem #1b0033;
  color: var(--font-color);
  font-size: 1.5rem;
  padding: 0.5rem 2rem;
  background: #7100d3;

  &[disabled] {
    background: #17141d;
    box-shadow: -2px 0 1rem #340061, -4px 4px 1rem #6a00c7,
      -6px 6px 1rem #1b0033;
    color: #613389;
  }
`
