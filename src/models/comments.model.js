import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
    },
    author: {
      type: String,
    },
    blog_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
