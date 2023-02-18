import mongoose, { Schema } from "mongoose";
const likeSchema = Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  blog_id: {
    type: Schema.Types.ObjectId,
    ref: "Blog"
  }
  // likeCount: { type: number },
});

const blogLike = mongoose.model("blogLike", likeSchema);
export default blogLike;