const express = require('express');
const games = require('../src/games/gamesModel.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/games', async (req, res) => {
  const rows = await games.getAll();
  res.status(200).json(rows);
});

server.post('/games', async (req, res) => {
  try {
    if(!req.body.title || !req.body.genre ){
      res.status(422).json({message:'title and genre are required fields'})
    }
    const lastId = await games.insert(req.body)
    res.status(201).json(lastId)
  }
  catch(e){
    res.status(500).json({error:e});
  }
})

module.exports = server;
