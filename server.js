const http = require('http')
const express = require('express')
const data = require('./data')

const hostname = '127.0.0.1';
const port = 3000;

const app = express()

const server = http.createServer(app)

app.use(express.static('./public'))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get('/', (req,res) => {
  res.send('hello world!')
})

app.get('/api/v1/episodes', (req,res) => {
  res.send(data.episodes)
})

app.get('/api/v1/characters', (req,res) => {
  res.send(data.characters)
})

app.get('/api/v1/episodes/:episodeId', (req,res) => {
  const episodeId = req.params.episodeId
  let episode = null
  for (let i=0; i < data.episodes.length; i++) {
    if (data.episodes[i].episode == Number(episodeId)) {
      episode = data.episodes[i]
    }
  }
  if (episode !== null) {
    res.json(episode)
  } else {
    res.status(404).json({error: 'could not find episode ' + episodeId})
  }
})

app.get('/api/v1/characters/:characterName', (req,res) => {
  const characterName = req.params.characterName
  const character = data.characters.find((character) => character.name.toLowerCase() == characterName.toLowerCase())

  if (character == null) {
    res.status(404).json({error: 'could not find character ' + characterName})
  } else {
    res.json(character)
  }
})

app.get('*', (req,res) => {
  res.send('Page not found')
})
