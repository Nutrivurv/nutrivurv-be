import getUserId from "../../utils/getUserId";

const Profile = {
  async deleteProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.deleteProfile({ where: { user_id: userId } }, info);
  },
  async updateProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.updateProfile(
      {
        where: {
          user_id: userId
        },
        data: args.data
      },
      info
    );
  },
  async createProfile(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.mutation.createProfile(
      {
        data: {
          ...args.data,
          user_id: userId,
          user: {
            connect: {
              id: userId
            }
          }
        }
      },
      info
    );
  }
};

export default Profile