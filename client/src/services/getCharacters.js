export default async function getCharacters() {
  try {
    const response = await fetch('https://hp-api.herokuapp.com/api/characters')
    const characters = await response.json()
    return characters
  } catch (error) {
    console.error(error.message)
  }
}
