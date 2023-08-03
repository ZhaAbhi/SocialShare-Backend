const posts = require("../../models/post/post.mongo");
const users = require("../../models/user/user.mongo");

async function httpCreatePost(req, res) {
  const { id } = req.user;
  console.log(id);
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

module.exports = {
  httpCreatePost,
};
