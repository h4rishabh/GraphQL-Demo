var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

require("dotenv").config();

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    age: Int
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    
  hello: () => {
    return 'Hello world!';
  },
  age:  25
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

var { PORT } = process.env;

app.listen(PORT);
console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);