const { mongoose } = require("common");
const { Schema } = mongoose;
const externalnotificationconfigSchema = new mongoose.Schema(
  {
    providerType: {
      type: String,
      required: true,
      defaultValue: "email",
    },
    name: {
      type: String,
      required: true,
    },
    settings: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      required: true,
      defaultValue: "enabled",
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

externalnotificationconfigSchema.set("versionKey", "recordVersion");
externalnotificationconfigSchema.set("timestamps", true);

externalnotificationconfigSchema.set("toObject", { virtuals: true });
externalnotificationconfigSchema.set("toJSON", { virtuals: true });

module.exports = externalnotificationconfigSchema;
