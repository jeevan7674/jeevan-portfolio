const toError = (res, error) => res.status(500).json({ message: error.message || "Server error" });

const createCrudController = (Model) => ({
  getAll: async (_req, res) => {
    try {
      const rows = await Model.find().sort({ createdAt: -1 });
      return res.json(rows);
    } catch (error) {
      return toError(res, error);
    }
  },

  create: async (req, res) => {
    try {
      const row = await Model.create(req.body);
      return res.status(201).json(row);
    } catch (error) {
      return toError(res, error);
    }
  },

  update: async (req, res) => {
    try {
      const row = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!row) return res.status(404).json({ message: "Not found" });
      return res.json(row);
    } catch (error) {
      return toError(res, error);
    }
  },

  remove: async (req, res) => {
    try {
      const row = await Model.findByIdAndDelete(req.params.id);
      if (!row) return res.status(404).json({ message: "Not found" });
      return res.json({ message: "Deleted" });
    } catch (error) {
      return toError(res, error);
    }
  },
});

module.exports = { createCrudController };
