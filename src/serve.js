const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const name = "LambdaChan"

db = require('knex')(require('../knexfile')['development']);

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Board {
    id: Int
    name: String
    description: String
    threads: [Thread]
  }

  type Thread {
    id: Int
    name: String
    posts: [Post]
  }

  type Post {
    id: Int
    author: String
    message: String
  }

  type Query {
    name: String
    boards: [Board]
    threads(id: Int): [Thread]
    posts(id: Int): [Post]
  }

  type Mutation {
    addBoard(name: String, description: String): Int
    addThread(boardID: Int, name: String, message: String, author: String): Int
    addPost(threadID: Int, message: String, author: String): Int
    nuke: Boolean
  }
`;

const addBoard = (name, description) =>
  db('boards').insert({name, description}, 'boardID')
    .then((x) => x[0])

const addThread = (boardID, name, message, author) =>
  db('threads').insert({name, boardID}, 'threadID')
    .then((id) => addPost(id[0], message, author))

const addPost = (threadID, message, author) =>
  db('posts').insert({message, author, threadID}, 'postID')
    .then((x) => x[0])

const getBoards = () =>
  db('boards').select()

const getThreads = (id) =>
  db('threads').select().where({boardID: id})

const getPosts = (id) =>
  db('posts').select().where({threadID: id})

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    name: () => name,
    boards: () => getBoards(),
    threads: (root, args) => getThreads(args.id),
    posts: (root, args) => getPosts(args.id),
  },

  Mutation: {
    addBoard: (root, args) => addBoard(args.name, args.description),
    addThread: (root, args) => addThread(args.boardID, args.name, args.message, args.author),
    addPost: (root, args) => addPost(args.threadID, args.message, args.author),
    nuke: (root, args) =>
      Promise.all([
        db('boards').del(),
        db('threads').del(),
        db('posts').del(),
      ]).then(() => true)
  },

  Board: {
    id: (root) => root.boardID,
    threads: (root) => getThreads(root.boardID),
  },

  Thread: {
    id: (root) => root.threadID,
    posts: (root) => getPosts(root.threadID),
  },

  Post: {
    id: (root) => root.postID,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

var app = express();

server.applyMiddleware({ app });

app.use(express.static('public'))
app.get('/',
  (req, res) => res.sendFile('public/index.html')
)

app.listen(4000);
