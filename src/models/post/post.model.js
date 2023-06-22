const posts = require("./post.mongo");

async function savePost({ content, postImage, postedBy }) {
  try {
    const createPost = await posts.create({
      content,
      postImage,
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
      .find()
      .populate("postedBy", "-password")
      .sort({ createdAt: -1 });
    return getAllPosts;
  } catch (error) {
    throw new Error("Internal server error");
  }
}

async function findPostById(query) {
  try {
    const getPostById = await posts
      .findById(query)
      .populate("postedBy", "-password")
      .populate("commentsBy.user", "-password");
    return getPostById;
  } catch (error) {
    throw new Error("Internal server error");
  }
}

async function findPostByUserId(query) {
  try {
    const getPostByUserId = await posts.find(query).populate("postedBy");
    return getPostByUserId;
  } catch (error) {
    throw new Error("Internal server error");
  }
}

async function deletePost(query) {
  try {
    const deletedPost = await posts.findOneAndDelete(query);
    return deletedPost;
  } catch (error) {
    throw new Error("Internal server error");
  }
}

module.exports = {
  savePost,
  findAllPost,
  findPostById,
  findPostByUserId,
  deletePost,
};
