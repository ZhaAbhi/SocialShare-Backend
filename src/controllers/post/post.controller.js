const {
  findAllPost,
  savePost,
  findPostById,
  findPostByUserId,
  deletePost,
} = require("../../models/post/post.model");
const posts = require("../../models/post/post.mongo");
const { findUser } = require("../../models/user/user.model");

async function checkUserId(userId) {
  if (!userId) {
    return res.status(400).json({ error: "Could not found user!" });
  }
  return userId;
}

async function httpCreatePost(req, res) {
  const userId = await checkUserId(req.user.userId);
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ error: "Content is required!" });
  }
  try {
    const getUser = await findUser({ _id: userId });
    if (!getUser) {
      return res.status(400).json({ error: "Could not found user!" });
    }
    const createPost = await savePost({ content: content, postedBy: userId });
    return res.status(201).json({ post: createPost });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function httpGetAllPosts(req, res) {
  await checkUserId(req.user.userId);
  try {
    const getAllPost = await findAllPost();
    return res.status(200).json({ posts: getAllPost });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function httpGetPostById(req, res) {
  await checkUserId(req.user.userId);
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: "Could not found post!" });
  }
  try {
    const getPost = await findPostById({ _id: postId });
    if (!getPost) {
      return res.status(400).json({ error: "Could not found post!" });
    }
    return res.status(200).json({ post: getPost });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function httpGetPostByUserId(req, res) {
  const userId = await checkUserId(req.user.userId);
  try {
    const getPost = await findPostByUserId({ postedBy: { _id: userId } });
    if (!getPost) {
      return res.status(400).json({ error: "Post not found!" });
    }
    return res.status(200).json(getPost);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

async function httpDeletePost(req, res) {
  const userId = await checkUserId(req.user.userId);
  const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: "Could not found post!" });
  }
  try {
    const getPost = await deletePost({
      _id: postId,
      postedBy: { _id: userId },
    });
    if (!getPost) {
      return res.status(400).json({ error: "Not Authorized to delete!" });
    }
    return res.status(200).json(getPost);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
}

module.exports = {
  httpCreatePost,
  httpGetAllPosts,
  httpGetPostById,
  httpGetPostByUserId,
  httpDeletePost,
};
