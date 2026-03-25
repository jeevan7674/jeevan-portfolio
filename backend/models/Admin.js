const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin", enum: ["admin", "editor"] },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

AdminSchema.methods.comparePassword = async function (plainPassword) {
  return bcryptjs.compare(plainPassword, this.password);
};

AdminSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("Admin", AdminSchema);
