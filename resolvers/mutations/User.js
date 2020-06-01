import thirdPartyAuth from '../../utils/thirdPartyAuth.js';

import generateToken from '../../utils/generateToken.js';
import hashPassword from '../../utils/hashPassword.js';
import validateLogin from '../../utils/validateLogin.js';

const User = {
  async createUser(parent, args, { request, prisma }, info) {
    // auth0token will be passed into the headers if the user went 
    // through an auth0 signup process
    // const auth0Token = request.request.headers.auth0;

    // If I am reading this correctly if the auth0 token exists that is then 
    // calls the thirdPartyAuth function with the auth0 token from the header &
    // sets the result of that function to the the auth0user
    // if there is not auth0 token the auth0 user is set to an empty string
    // const auth0User = auth0Token
    //   ? await thirdPartyAuth(request.request.headers.auth0)
    //   : '';

    // if auth0 user is truthty string that means that auth0 was successful &
    // we set the data passed in through the args to the auth0user details
    // other wise we are setting args.data to args.data
    // args.data = auth0User
    //   ? {
    //       name: auth0User.nickname,
    //       email: auth0User.name,
    //     }
    //   : args.data;
    // if auth0 token was sent throught the headers we are hashing auth0.sub &
    // setting the hassehd aut0.sub to the password constant
    // otherwise we are hashing that password that was sent with the data &
    // setting the hashed args.data.password to the password constant
    const password = await hashPassword(args.data.password);

    // sending request to the prisma server to create a user using the details:
    // data - object with args.data spread out and the passsword constant added
    // if the auth0 token was passed the data object is actually the auth0 user
    // otherwise it is the data that was sent in as args
    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password,
      },
    });

    return {
      user,
      token: generateToken(user.id),
    };
  },
  async login(parent, args, { request, prisma }, info) {
    // const auth0Token = request.request.headers.auth0;
    // just as in the createUser function we 
    // const auth0User = auth0Token
    //   ? await thirdPartyAuth(request.request.headers.auth0)
    //   : '';
    const user = await prisma.query.user({
      where: {
        email: args.data.email,
      },
    });

    return validateLogin(args.data.password, user);
  },
  async deleteUser(parent, args, { prisma, request }, info) {
    return prisma.mutation.deleteUser(
      {
        where: {
          id: request.user_id,
        },
      },
      info
    );
  },
  async updateUser(parent, args, { prisma, request }, info) {
    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password);
    }

    return prisma.mutation.updateUser(
      {
        where: {
          id: request.user_id,
        },
        data: args.data,
      },
      info
    );
  },
};

export default User;
