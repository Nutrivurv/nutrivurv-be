const formatDate = require("../../utils/formatDate.js");

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
  },
  async todaysRecords(parent, args, { prisma, request }, info) {
    const today = formatDate(Date.now());
    const records = await prisma.query.dailyRecords({
      where: {
        user_id: request.user_id
      }
    });

    return records.filter(cv => {
      return cv.date.includes(today);
    });
  }
};
export default DailyRecords;
