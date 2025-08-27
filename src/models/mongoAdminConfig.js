const { mongoose } = require("common");
const { Schema } = mongoose;
const mongoadminconfigSchema = new mongoose.Schema(
  {
    configType: {
      type: String,
      required: true,
      defaultValue: "other",
    },
    targetObject: {
      type: String,
      required: true,
    },
    configDetails: {
      type: Schema.Types.Mixed,
      required: true,
    },
    status: {
      type: String,
      required: true,
      defaultValue: "active",
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

mongoadminconfigSchema.set("versionKey", "recordVersion");
mongoadminconfigSchema.set("timestamps", true);

mongoadminconfigSchema.set("toObject", { virtuals: true });
mongoadminconfigSchema.set("toJSON", { virtuals: true });

module.exports = mongoadminconfigSchema;
