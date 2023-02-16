import Comment from "../models/comments.model.js";
import blogModel from "../models/Blogs.model.js";

const createComment = async (req, res) => {
  const blogId = req.params.id;
  const comment = new Comment({
    author: req.body.author,
    commentText: req.body.commentText,
    blog_id: blogId,
  });
  console.log(blogId);
  const blog = blogModel.findOne(blogId);
  if (blog) {
    comment
      .save()
      .then(async (data) => {
        await blogModel.findByIdAndUpdate(blogId, {
          $push: { comments: data._id },
        });
        return res.status(200).json({ comment: data });
      })
      .catch((err) =>
        res.status(404).json({ error: err, message: "Comment not added" })
      );
  } else return res.status(404).json({ error: "Blog not found" });
};
// const getCommentsByBlogId = async (req, res) => {
//   const blogId = req.params.id;
//   blogModel
//     .findOne({ _id: blogId })
//     .then(async (blog) => {
//       const comments = [];
//       const blogComments = blog.comments;
//       for (let i = 0; i < blogComments.length; i++) {
//         const blogComment = await Comment.findById(blogComments[i]);
//         comments.push(blogComment);
//       }
//       res.status(200).json({ comments: comments });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404).json({ error: err });
//     });
// };
export async function getCommentsByBlogId(req, res) {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findOne({ _id: blogId }).populate("comments");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const comments = blog.comments;
    return res.status(200).json({ comments: comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export { createComment };
