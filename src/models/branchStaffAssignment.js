const { mongoose } = require("common");
const { Schema } = mongoose;
const branchstaffassignmentSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      defaultValue: "librarian",
    },
    assignedByUserId: {
      type: String,
      required: true,
    },
    isActive: {
      // isActive property will be set to false when deleted
      // so that the document will be archived
      type: Boolean,
      default: true,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
  },
);

branchstaffassignmentSchema.set("versionKey", "recordVersion");
branchstaffassignmentSchema.set("timestamps", true);

branchstaffassignmentSchema.set("toObject", { virtuals: true });
branchstaffassignmentSchema.set("toJSON", { virtuals: true });

module.exports = branchstaffassignmentSchema;
