const { mongoose } = require("common");
const { Schema } = mongoose;
const systembackupauditSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      defaultValue: "backup",
    },
    config: {
      type: Schema.Types.Mixed,
      required: true,
    },
    initiatedByUserId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      defaultValue: "started",
    },
    resultDetails: {
      type: Schema.Types.Mixed,
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

systembackupauditSchema.set("versionKey", "recordVersion");
systembackupauditSchema.set("timestamps", true);

systembackupauditSchema.set("toObject", { virtuals: true });
systembackupauditSchema.set("toJSON", { virtuals: true });

module.exports = systembackupauditSchema;
