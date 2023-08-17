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

async function httpGetAllPosts(req, res) {
  const { id } = req.user;
  const existsUser = await users.findById({ _id: id });
  if (!existsUser) {
    return res.status(400).json({ error: "User does not exists!" });
  }
  const getposts = await posts
    .find()
    .sort({ createdAt: -1 })
    .populate("postedBy", "-password -posts -__v");
  return res.status(200).json(getposts);
}

async function httpGetPost(req, res) {
  const { id } = req.user;
  const { postId } = req.params;
  const existsUser = await users.findById({ _id: id });
  if (!existsUser) {
    return res.status(400).json({ error: "User does not exists!" });
  }

  const getPost = await posts
    .findById({ _id: postId })
    .populate("postedBy", "-password -posts -__v")
    .populate("comments.commentsBy", "-password -posts -likes");
  if (!getPost) {
    return res.status(400).json({ error: "Could not found post!" });
  }
  return res.status(200).json(getPost);
}

async function httpLikePost(req, res) {
  const { id } = req.user;
  const { postId } = req.params;
  const getUser = await users.findById({ _id: id });
  const isLiked = getUser?.likes.includes(postId);
  const option = isLiked ? "$pull" : "$addToSet";
  const updatedPost = await posts.findByIdAndUpdate(
    { _id: postId },
    { [option]: { likes: id } },
    { new: true }
  );

  req.user = await users.findByIdAndUpdate(
    { _id: id },
    { [option]: { likes: postId } },
    { new: true }
  );
  return res.status(200).json(updatedPost);
}

async function httpComment(req, res) {
  const { id } = req.user;
  const { postId } = req.params;
  const { commentContent } = req.body;
  if (!commentContent) {
    return res.status(400).json({ error: "No comment to post!" });
  }
  const post = await posts
    .findByIdAndUpdate(
      { _id: postId },
      {
        $addToSet: {
          comments: [{ commentContent: commentContent, commentsBy: id }],
        },
      },
      { new: true }
    )
    .populate("comments.commentsBy", "-password -posts -likes");

  await users.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { comments: post._id } }
  );

  return res.status(201).json(post);
}

module.exports = {
  httpPostContent,
  httpGetAllPosts,
  httpGetPost,
  httpLikePost,
  httpComment,
};
