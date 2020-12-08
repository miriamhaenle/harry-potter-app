import styled from 'styled-components/macro'

export default function Character({ character }) {
  if (!character || !character.name) return null
  return (
    <PlayerCard>
      <img
        src={character.image.replace('http', 'https')}
        alt={character.name}
      />
      <div>{character.name}</div>
      <HouseContainer color={houseColor(character.house)}>
        {character.house}
      </HouseContainer>
    </PlayerCard>
  )

  function houseColor(houseName) {
    if (houseName === 'Gryffindor') return '#740001'
    if (houseName === 'Slytherin') return '#1A472A'
    if (houseName === 'Ravenclaw') return '#0E1A40'
    if (houseName === 'Hufflepuff') return '#FFDB00'
  }
}

const PlayerCard = styled.div`
  background: #17141d;
  border-radius: 5px;
  box-shadow: -1rem 0 3rem #000;
  padding: 20px 10px;
  text-align: center;
  transform: translateY(-0.5rem);
  transition: 0.2s ease-in;

  img {
    width: 70px;
  }
`

const HouseContainer = styled.div`
  background-color: ${(props) => props.color};
  color: ${(props) => (props.color === '#FFDB00' ? '#000' : '#FFF')};
`
