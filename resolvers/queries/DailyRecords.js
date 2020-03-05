const DailyRecords = {
  myDailyRecords(parent, args, { prisma, request }, info) {
    return prisma.query.dailyRecords({
      where: {
        user_id: request.user_id
      }
    });
  },
  async myDailyRecordCount(parent, args, { prisma, request }, info) {
    const count = await prisma.query.dailyRecords({
      where: {
        user_id: request.user_id
      }
    });
    if (count && count.length > 0) {
      return count;
    } else {
      return 0;
    }
  }
};
export default DailyRecords;
