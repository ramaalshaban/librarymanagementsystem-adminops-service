const { mongoose } = require("common");
const { Schema } = mongoose;
const branchpurchaseorderSchema = new mongoose.Schema(
  {
    branchId: {
      type: String,
      required: true,
    },
    requestedByUserId: {
      type: String,
      required: true,
    },
    items: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    status: {
      type: String,
      required: true,
      defaultValue: "pending",
    },
    approvedByUserId: {
      type: String,
      required: false,
    },
    approvalDate: {
      type: Date,
      required: false,
    },
    note: {
      type: String,
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

branchpurchaseorderSchema.set("versionKey", "recordVersion");
branchpurchaseorderSchema.set("timestamps", true);

branchpurchaseorderSchema.set("toObject", { virtuals: true });
branchpurchaseorderSchema.set("toJSON", { virtuals: true });

module.exports = branchpurchaseorderSchema;
