import styled from 'styled-components/macro'
import { houseColor } from '../../services/houseColor'

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
}

const PlayerCard = styled.div`
  background: #17141d;
  border-radius: 5px;
  box-shadow: -1rem 0 1.4rem #000;
  padding: 20px 10px;
  text-align: center;
  transform: translateY(-0.5rem);
  transition: 0.2s ease-in;
  width: 160px;
  height: 215px;

  img {
    margin-bottom: 1.4rem;
    width: 100px;
  }
`

const HouseContainer = styled.div`
  background-color: ${(props) => props.color};
  color: ${(props) => (props.color === '#FFDB00' ? '#000' : '#FFF')};
`
