import cloudinary from "../imageUpload/imageUpload.js";
import blogModel from "../models/Blogs.model.js";
import blogLike from "../models/blogLike.model.js";

const getAllBlogs = async (req, res) => {
  const blogs = await blogModel.find();
  return res.json(blogs);
};

const createBlogWithImage = async (req, res) => {
  const blog = new blogModel(req.body);
  await blog.save();
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "portfolio/blogImages",
      public_id: `${blog.title}_image`,
    });
    blog.image = result.url;
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Could not upload image",
    });
    console.log("Error while uploading image: ", error.message);
  }
};

const getBlogId = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });
    if (!blog) {
      res.status(404).json({ error: "Blog doesn't exist" });
      return;
    }
    res.send(blog);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await blogModel.findOne({ _id: req.params.id });

    if (req.body.title) {
      blog.title = req.body.title;
    }
    if (req.body.description) {
      blog.description = req.body.description;
    }
    if (req.body.category) {
      blog.category = req.body.category;
    }
    if (req.file) {
      blog.image = req.file.path;
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "portfolio/blogImages",
        public_id: `${blog.title}_image`,
      });
      blog.image = result.url;
    }
    await blog.save();
    console.log(blog);
    res.send(blog);
  } catch (err) {
    res.status(404);
    res.json({ error: "Blog doesn't exist" });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const result = await blogModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Blog doesn't exist!" });
      return;
    }
    res.status(204).json({ message: "Blog deleted successfully" });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};
// export async function toggleLike(req, res) {
//   const blog = await blogModel.findOne({ _id: req.params.id });
//   if (!blog) return res.status(404).send("Blog not found");

//   const liked = await blogLike.findOne({
//     user_id: req.user.id,
//     blog_id: req.params.id,
//   });
//   if (liked) return res.status(400).send("You've already liked this blog");

//   const like = new blogLike({ user_id: req.user.id, blog_id: req.params.id });
//   await like.save();

//   blog.blog_likes.push(like._id);
//   blog.likesCount++;
//   await blog.save();

//   return res.send("You liked the blog");
// }

export async function toggleLike(req, res) {
  try {
    const blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    const liked = await blogLike.findOne({
      user_id: req.user.id,
      blog_id: req.params.id,
    });
    if (liked) {
      return res.status(400).send("You've already liked this blog");
    }

    const like = new blogLike({ user_id: req.user.id, blog_id: req.params.id });
    await like.save();

    blog.likesCount++;
    await blog.save();

    return res.send("You liked the blog");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export { getAllBlogs, updateBlog, getBlogId, deleteBlog, createBlogWithImage };
