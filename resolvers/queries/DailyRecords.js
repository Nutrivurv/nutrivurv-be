const DailyRecords = {
  myDailyRecords(parent, args, { prisma, request }, info) {
    return prisma.query.dailyRecords({
      where: {
        user_id: request.user_id
      }
    });
  }
};
export default DailyRecords;
