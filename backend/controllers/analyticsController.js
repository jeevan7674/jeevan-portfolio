const PageVisit = require("../models/PageVisit");

const trackVisit = async (req, res) => {
  try {
    const { page = "/", deviceType = "desktop" } = req.body;
    const visit = await PageVisit.create({ page, deviceType, timestamp: new Date() });
    return res.status(201).json(visit);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getStats = async (_req, res) => {
  try {
    const totalVisits = await PageVisit.countDocuments();

    const pageViews = await PageVisit.aggregate([
      { $group: { _id: "$page", count: { $sum: 1 } } },
      { $project: { _id: 0, page: "$_id", count: 1 } },
      { $sort: { count: -1 } },
    ]);

    const deviceRows = await PageVisit.aggregate([
      { $group: { _id: "$deviceType", count: { $sum: 1 } } },
    ]);

    const deviceBreakdown = { desktop: 0, mobile: 0, tablet: 0 };
    for (const row of deviceRows) {
      if (row._id in deviceBreakdown) deviceBreakdown[row._id] = row.count;
    }

    const recentVisits = await PageVisit.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .select({ _id: 0, page: 1, timestamp: 1, deviceType: 1 });

    return res.json({ totalVisits, pageViews, deviceBreakdown, recentVisits });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { trackVisit, getStats };
