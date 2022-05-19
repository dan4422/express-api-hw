const characterDropdown = document.querySelector('#sopranos')
function renderCharacters(characters) {
  const characterHtml = characters.map(character => {
    return `
    <option value="${character.name}">${character.name}</option>
    `
  }).join('')
  characterDropdown.insertAdjacentHTML('beforeend', characterHtml)
}

const infoSection = document.querySelector('.info')
function renderCharacterInfo(character) {
  const characterHtml = 
    `
    <p>The character ${character.name} is played by the actor ${character.actor}! ${character.name} is in episodes ${character.episodes}.</p>
    `
  infoSection.innerHTML = characterHtml
}

fetch('/api/v1/characters')
  .then(res => res.json())
  .then(data => {
    renderCharacters(data)
  })

characterDropdown.addEventListener('change', (e) => {
  const characterName = e.target.value
  fetch(`/api/v1/characters/${characterName}`)
    .then(res => res.json())
    .then(data => {
      renderCharacterInfo(data)
    })
})
