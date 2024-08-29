const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dbConnect = require('./models/mongodb');
const Players = require('./models/Player');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});


let games = {}; 

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinGame', (gameId, player) => {
    socket.join(gameId);

    if (!games[gameId]) {
      games[gameId] = { board: Array(9).fill(null), isXNext: true };
    } else if (!games[gameId].player1) {
      games[gameId].player1 = player;
      // console.log(`Player 1 joined game: ${player}`);
    } else if(!games[gameId].player2) {
      games[gameId].player2 = player
      console.log(`Player 2 joined game: ${player}`);
    }

    socket.emit('updateGame', games[gameId]);

    socket.on('makeMove', ({ index, gameId, player }) => {
      let game = games[gameId];
      if (!game) return;

      // if ((game.isXNext && player !== 'X') || (!game.isXNext && player !== 'O')) {
      //   return;
      // }

      if (game.board[index] || calculateWinner(game.board)) return

      game.board[index] = game.isXNext ? 'X' : 'O';
      game.isXNext = !game.isXNext;
      io.to(gameId).emit('updateGame', game);
    });
  });

  socket.on('restart', (gameId) => {
    console.log(`Game ${gameId} Restarted!`)
    games[gameId] = { board: Array(9).fill(null), isXNext: true}
    io.to(gameId).emit('updateGame', games[gameId])
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};


app.get('/', (req, res) => {

  console.log('Welcome To Tic Tac Toe API')
  res.status(200).send('Welcom to Tic Tac Toe API')
})

app.get('/players', async (req, res) => {
  await dbConnect();
  try {
    const allPlayers  = await Players.find();
    res.status(200).send(allPlayers)
  } catch (err) {
    res.status(400).send('An Error Occurred', err);
  }
})

app.post('/players', async (req, res) => {  
  await dbConnect();

  const body = req.body;
  console.log("BODY::", body); 
  try {
    const data = await Players.create(body);
    res.status(201).json({ message: 'Player data received', data });
  } catch (err) {
    res.status(400).json({message: err})
  }
});

app.get('/leaderboard', async (req, res) => {
  await dbConnect();

  try {
    const data = await Players.find({}).sort({ points: -1}).limit(5)
    res.status(200).json(data);
  } catch(err) {
    res.status(400).send(err);
  }
})

server.listen(3001, () => {
  console.log(`Server is running on http://localhost:3001`);
});
