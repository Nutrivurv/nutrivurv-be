import getUserId from "../../utils/getUserId";
const DailyRecords = {
  myDailyRecords(parent, args, { prisma, request }, info) {
    const userId = getUserId(request);

    return prisma.query.dailyRecords({
      where: {
        user_id: userId
      }
    });
  }
};
export default DailyRecords;
