import mongoose, {Document, Schema} from "mongoose";

export interface ICampaign extends Document
{
    name : string;
    advertiser : string;
    startDate : Date;
    endDate : Date;
    budget : number;
    impressionsServed : number;
    targetCountries : string[];
    status : "active" | "paused" | "ended";
    createdAt: Date;
    updateAt: Date;
}

const campaignSchema = new Schema<ICampaign>(
 
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
 
    advertiser: {
      type: String,
      required: true,
      trim: true,
    },
 
    startDate: {
      type: Date,
      required: true,
    },
 
    endDate: {
      type: Date,
      required: true,
    },
 
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
 
    impressionsServed: {
      type: Number,
      default: 0,
      min: 0,
    },
 
    targetCountries: {
      type: [String],
      default: [],
    },
 
    status: {
      type: String,
      enum: ["active", "paused", "ended"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);
 
export default mongoose.model<ICampaign>("Campaign", campaignSchema);
 