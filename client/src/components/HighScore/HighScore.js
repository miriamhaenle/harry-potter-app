import styled from 'styled-components/macro'

export default function HighScore({ scores }) {
  return (
    <div>
      <h2>Hogwarts Houses High Score</h2>
      <div>Griffindor: {scores.griffindor}</div>
      <div>Ravenclaw: {scores.ravenclaw}</div>
      <div>Hufflepuff: {scores.hufflepuff}</div>
      <div>Slytherin: {scores.slytherin}</div>
    </div>
  )
}
