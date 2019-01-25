const express = require('express');
const cors = require('cors');
const io = require('socket.io')();
var bodyParser = require('body-parser');
const app = express();


const userById = (id) => {
  for(const index in users) {
    if(users[index].id == id) {
      return users[index];
    }
  }
}

const userByEmailOrPhone = (emailOrPhone) => {
  for(const index in users) {
    if(users[index].emailOrPhone == emailOrPhone) {
      return users[index];
    }
  }
}

const conversationsByUserId = (userId) => {
  const conversationsList = [];

  for(const index in conversations) {
    const conversation = conversations[index];
    if(conversation.from == userId || conversation.to == userId) {
      const interlocutorId = conversation.from == userId ? conversation.to : conversation.from;
      conversationsList.push({
        id: conversation.id,
        interlocutorId,
        interlocutor: userById(interlocutorId),
        unread: 0,
        lastMessage: {
          text: 'asd',
        },
      });
    }
  }

  return conversationsList;
}

const users = [
  {
    id: 1000,
    firstName: 'Sergey',
    lastName: 'Papayan',
    emailOrPhone: 'sergey_p94@mail.ru',
    gender: 'male',
    birthDay: '04/15/1994',
    avatar: 'https://scontent.fevn1-1.fna.fbcdn.net/v/t1.0-1/c27.0.160.160a/p160x160/37345044_1887554554635989_5187192484832215040_n.jpg?_nc_cat=102&_nc_ht=scontent.fevn1-1.fna&oh=56cbe66e57afebe8916fdcf7b5b3263a&oe=5CB8CC9C',
  },
  {
    id: 1001,
    firstName: 'asd',
    lastName: 'asd',
    emailOrPhone: 'asd@asd.asd',
    gender: 'male',
    birthDay: '04/15/1994',
    avatar: 'https://scontent.fevn1-2.fna.fbcdn.net/v/t1.0-9/541507_627956453929145_1372892583_n.jpg?_nc_cat=100&_nc_ht=scontent.fevn1-2.fna&oh=bca677d0fd807176d84a7ae86883e6b6&oe=5CC3C205',
  },
  {
    id: 1002,
    firstName: 'sdf',
    lastName: 'sdf',
    emailOrPhone: 'sdf@sdf.sdf',
    gender: 'male',
    birthDay: '04/15/1994',
  },
];

const conversations = [
  {
    id: 1,
    from: 1000,
    to: 1001,
  },
  {
    id: 2,
    from: 1000,
    to: 1002,
  },
  {
    id: 3,
    from: 1000,
    to: 1001,
  }
];


app.use(cors());
app.use(bodyParser.json())

app.post('/auth/sign-in', (req, res) => {
  if(usersByEmail[req.body.emailOrPhone]) {
    res.send({token: req.body.emailOrPhone}, 200);
    return res.end();
  }
  res.status(400).end();
})

app.post('/auth/sign-up', (req, res) => {
  res.end();
})

app.get('/users/current', (req, res) => {
  const token = req.header('Authorization');
  const user = userByEmailOrPhone(token);
  if(user) {
    res.send(user, 200);
    return res.end();
  }
  res.status(400).end();
})

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;
  const user = userById(userId);
  if(user) {
    res.send(user, 200);
    return res.end();
  }
  res.status(400).end();
})

app.get('/chat/conversations', (req, res) => {
  const token = req.header('Authorization');
  const user = userByEmailOrPhone(token);
  if(user) {
    const conversationsList = conversationsByUserId(user.id);
    res.send(conversationsList, 200);
    return res.end();
  }
  res.status(400).end();
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something broke!');
})

app.listen(3000);







//////////////////////////////////////////////////////////////////////////////////////////////


io.on('connection', (socket) => {
  console.log('CLIENT CONNECTED', socket.id);

  setInterval(() => {
    socket.emit('server:chat:new-message', {
      message: {
        conversationId: Math.floor(Math.random() * conversations.length) + 1,
        from: 1001,
        to: 1000,
        text:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      },
    })
  }, 5000);

  socket.on('client:chat:start', (data) => {
    socket.join('room:on-hold', () => {  
      const { adapter: { rooms } } = io.sockets;
      const onHoldRoom = rooms['room:on-hold'];
      console.log(onHoldRoom);
      if(onHoldRoom.length > 1) {
        const { connected } = io.sockets;
        const socketKeys = Object.keys(onHoldRoom.sockets);

        const user1SocketId = socketKeys.pop();
        const user2SocketId = socketKeys.pop();

        const user1Socket = connected[user1SocketId];
        const user2Socket = connected[user2SocketId];

        user1Socket.leave('room:on-hold', () => {
          user2Socket.leave('room:on-hold', () => {
            user1Socket.emit('server:chat:started', { bbb: 'bbb'});
            user2Socket.emit('server:chat:started', { bbb: 'bbb'});
          });
        });
      }
    });
  });

  socket.on('disconnect', (reason) => {
    console.log('CLIENT DISCONNECTED', socket.id);
  });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
