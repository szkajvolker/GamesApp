import Statistics from "../models/statistics/Statistics.model.js";

export const logVisit = async () => {
  try {
    let stats = await Statistics.findOne({ id: "pageviews" });

    if (!stats) {
      stats = new Statistics({ id: "pageviews", count: 1 });
    } else {
      stats.count += 1;
    }

    await stats.save();
  } catch (error) {
    console.log("Visit tracking error:", error);
  }
};
