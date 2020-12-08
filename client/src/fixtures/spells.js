function castSpell(spells) {
  const index = Math.floor(Math.random() * spells.length)
  return `Harry casts: ${spells[index].spell.toUpperCase()}!`
}
