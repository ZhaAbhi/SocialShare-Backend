const posts = require("./post.mongo");

async function savePost({ content, postedBy }) {
  try {
    const createPost = await posts.create({
      content,
      postedBy,
    });
    return await createPost.save();
  } catch (error) {
    throw new Error("Internal server error");
  }
}

async function findAllPost() {
  try {
    const getAllPosts = await posts
      .find({})
      .populate("postedBy")
      .select("-password");
    return getAllPosts;
  } catch (error) {
    throw new Error("Internal server error");
  }
}

module.exports = {
  savePost,
  findAllPost,
};
