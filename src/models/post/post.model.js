const posts = require("./post.mongo");

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
  findAllPost,
};
