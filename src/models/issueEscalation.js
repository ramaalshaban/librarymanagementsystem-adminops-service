const { mongoose } = require("common");
const { Schema } = mongoose;
const issueescalationSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
    },
    raisedByUserId: {
      type: String,
      required: true,
    },
    assignedToUserId: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      defaultValue: "open",
    },
    escalationType: {
      type: String,
      required: true,
      defaultValue: "other",
    },
    description: {
      type: String,
      required: true,
    },
    log: {
      type: [Schema.Types.Mixed],
      required: false,
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

issueescalationSchema.set("versionKey", "recordVersion");
issueescalationSchema.set("timestamps", true);

issueescalationSchema.set("toObject", { virtuals: true });
issueescalationSchema.set("toJSON", { virtuals: true });

module.exports = issueescalationSchema;
