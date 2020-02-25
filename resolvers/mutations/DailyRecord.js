import getUserId from "../../utils/getUserId";

const DailyRecord = {
  async deleteDailyRecord(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const recordExists = await prisma.query.dailyRecords({
        where: {
          id: args.id
        }
      });
      if (recordExists[0].user_id == userId) {
        return prisma.mutation.deleteDailyRecord(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      } else {
        throw new Error("Can't find record with that ID");
      }
    } else {
      throw new Error("Can't find record with that ID");
    }
  },

  async updateDailyRecord(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    if (userId) {
      const recordExists = await prisma.query.dailyRecords({
        where: {
          id: args.id
        }
      });
      if (recordExists[0].user_id == userId) {
        return prisma.mutation.updateDailyRecord(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      } else {
        throw new Error("Can't find record with that ID");
      }
    } else {
      throw new Error("Can't find record with that ID");
    }
  },

  async createDailyRecord(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);
    return prisma.mutation.createDailyRecord(
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

export default DailyRecord;
