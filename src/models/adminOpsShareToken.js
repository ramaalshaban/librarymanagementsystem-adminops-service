const { mongoose } = require("common");
const { Schema } = mongoose;
const adminopssharetokenSchema = new mongoose.Schema(
  {
    configName: {
      type: String,
      required: true,
    },
    objectName: {
      type: String,
      required: true,
    },
    objectId: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    peopleOption: {
      type: String,
      required: true,
    },
    tokenPermissions: {
      type: String,
      required: true,
    },
    allowedEmails: {
      type: String,
      required: true,
    },
    expireDate: {
      type: Date,
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

adminopssharetokenSchema.set("versionKey", "recordVersion");
adminopssharetokenSchema.set("timestamps", true);

adminopssharetokenSchema.set("toObject", { virtuals: true });
adminopssharetokenSchema.set("toJSON", { virtuals: true });

module.exports = adminopssharetokenSchema;
