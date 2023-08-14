const posts = require("../../models/post/post.mongo");
const users = require("../../models/user/user.mongo");

async function httpPostContent(req, res) {
  const { content } = req.body;
  const imageFile = req.file;
  const { id } = req.user;
  if (!content && !imageFile) {
    return res.status(400).json({ error: "No content to post!" });
  }
  const filePath = imageFile ? imageFile.originalname : null;
  const savePostContent = await posts.create({
    content: content,
    contentImage: filePath,
    postedBy: id,
  });
  if (!savePostContent) {
    return res.status(400).json({ error: "Error creating a content!" });
  }
  await users.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { posts: savePostContent._id } }
  );

  return res.status(201).json({ message: "Content posted successfully!" });
}

module.exports = {
  httpPostContent,
};
