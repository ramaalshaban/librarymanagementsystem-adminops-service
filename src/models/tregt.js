const { mongoose } = require("common");
const { Schema } = mongoose;
const tregtSchema = new mongoose.Schema(
  {
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

tregtSchema.set("versionKey", "recordVersion");
tregtSchema.set("timestamps", true);

tregtSchema.set("toObject", { virtuals: true });
tregtSchema.set("toJSON", { virtuals: true });

module.exports = tregtSchema;
