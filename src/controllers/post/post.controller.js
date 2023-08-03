const posts = require("../../models/post/post.mongo");
const users = require("../../models/user/user.mongo");

async function httpCreatePost(req, res) {
  const { id } = req.user;
  const { content, uploadedImage } = req.body;
  if (!content && !uploadedImage) {
    return res.status(400).json({ error: "Post cannot be created!" });
  }
  const existsUser = await users.findById({ _id: id });
  if (!existsUser) {
    return res.status(400).json({ error: "User does not exists!" });
  }
  const createdPost = await posts.create({
    content,
    contentImage: uploadedImage,
    postedBy: id,
  });
  existsUser.posts.push(createdPost._id);
  await existsUser.save();

  return res.status(201).json({ message: "Post created successfully!" });
}

async function httpGetAllPost(req, res) {
  const allPosts = await posts
    .find({})
    .populate("postedBy", "-password -posts");
  return res.status(200).json(allPosts);
}

async function httpGetPostById(req, res) {
  const { postId } = req.params;
  const post = await posts
    .findById({ _id: postId })
    .populate("postedBy", "-password -posts");
  if (!post) {
    return res.status(400).json({ error: "No post found!" });
  }
  return res.status(200).json({ post });
}

async function httpGetMyPost(req, res) {
  const { id } = req.user;
  const myPost = await users
    .findById({ _id: id })
    .populate("posts", "-postedBy")
    .select("-password");
  return res.status(200).json({ myPost });
}
async function httpRemovePost(req, res) {
  const { id } = req.user;
  const { postId } = req.params;
  //Checking if the user has the postId in posts array or not
  const existsPostId = await users.findOne({ _id: id, posts: { _id: postId } });
  if (!existsPostId) {
    return res.status(400).json({ error: "No posts" });
  }
  await posts.findByIdAndRemove({ _id: postId });
  return res.status(200).json({ message: "Post removed successfully!" });
}
// async function httpAddComment(req,res){}
// async function httpRemoveComment(req,res){}
//async function httpLikePost(req,res){}

module.exports = {
  httpCreatePost,
  httpGetAllPost,
  httpGetPostById,
  httpGetMyPost,
  httpRemovePost,
};
