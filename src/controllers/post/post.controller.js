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

// async function httpGetPostById(req,res){}
// async function httpRemovePost(req,res){}
// async function httpAddComment(req,res){}
// async function httpRemoveComment(req,res){}
//async function httpLikePost(req,res){}

module.exports = {
  httpCreatePost,
  httpGetAllPost,
};
