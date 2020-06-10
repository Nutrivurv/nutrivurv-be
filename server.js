import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, fragmentReplacements } from './resolvers/index';
import prisma from './prisma';
import authorization from './utils/authorization.js';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  middlewares: [authorization],
  context(request) {
    return {
      pubsub,
      prisma,
      request,
    };
  },
  fragmentReplacements,
});

export { server as default };
