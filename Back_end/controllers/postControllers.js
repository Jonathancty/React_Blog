const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");

// ================================================================CREATE POST=========================================================
// POST : api/posts
// UNPROTECTED
const createPost = async (req, res, next) => {
  try {
    let { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(
        new HttpError("Find in all fields and choose thumbnail", 422)
      );
    }

    const { thumbnail } = req.files;
    // Check file size
    if (thumbnail.size > 2000000) {
      return next(new HttpError("Thumbnail size must not exceed 2MB", 422));
    }

    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFileName =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    thumbnail.mv(
      path.join(__dirname, "../uploads", newFileName),
      async (err) => {
        if (err) {
          return next(new HttpError("Failed to upload thumbnail"));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFileName,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(
              new HttpError("Creating post failed, please try again", 422)
            );
          }

          // find user and increase post count by 1
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

          res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    next(new HttpError("Creating post failed, please try again"));
  }
};

// ================================================================GET ALL POST=========================================================
// GET : api/posts/
// UNPROTECTED
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ================================================================GET SINGLE POST=========================================================
// GET : api/posts/:id
// UNPROTECTED
const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ================================================================GET POST BY CATEGORY=========================================================
// GET : api/posts/categories/:category
// UNPROTECTED
const getCatPost = async (req, res, next) => {
  try {
    const { category } = req.params;
    const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
    res.status(200).json(catPosts);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ================================================================GET USER/AUTHOR POST=========================================================
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userPosts = await Post.find({ creator: id }).sort({ createdAt: -1 });
    res.status(200).json(userPosts);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ================================================================EDIT POST=========================================================
// PATCH : api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
  try {
    let fileName;
    let newFilename;
    let updatedPost;
    const postId = req.params.id;
    let { title, category, description } = req.body;

    if (!title || !category || description.length < 12) {
      return next(new HttpError("Fill in all fields", 422));
    }

    const allowedCategories = [
      "Agriculture",
      "Business",
      "Education",
      "Entertainment",
      "Art",
      "Investment",
      "Uncategorized",
      "Weather",
    ];
    // validate category
    if (!allowedCategories.includes(category)) {
      return next(new HttpError("Please select a valid category", 422));
    }

    // get old post from database
    const oldPost = await Post.findById(postId);
    if (req.user.id == oldPost.creator) {
      if (!req.files) {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description },
          { new: true }
        );
      } else {
        // delete old thumbnail from upload
        fs.unlink(
          path.join(__dirname, "..", "uploads", oldPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );

        // upload new thmbnail
        const { thumbnail } = req.files;
        if (thumbnail.size > 2000000) {
          return next(new HttpError("Thumbnail size must not exceed 2MB", 422));
        }
        fileName = thumbnail.name;
        let splittedFilename = fileName.split(".");
        newFilename =
          splittedFilename[0] +
          uuid() +
          "." +
          splittedFilename[splittedFilename.length - 1];
        thumbnail.mv(
          path.join(__dirname, "..", "uploads", newFilename),
          async (err) => {
            if (err) {
              return next(new HttpError("Failed to upload thumbnail"));
            }
          }
        );

        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description, thumbnail: newFilename },
          { new: true }
        );
      }
    } else {
      return next(new HttpError("Post couldn't be updated", 403));
    }

    if (!updatedPost) {
      return next(new HttpError("Failed to update post", 400));
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(new HttpError(error));
  }
};

// ================================================================DELETE POST=========================================================
// DELETE : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    if (!postId) {
      return next(new HttpError("Post not available", 400));
    }
    const post = await Post.findById(postId);
    const filename = post.thumbnail;

    if (req.user.id == post.creator) {
      // delete thumbnail from uploads
      fs.unlink(
        path.join(__dirname, "..", "uploads", filename),
        async (err) => {
          if (err) {
            return next(new HttpError(err));
          }
        }
      );
      await Post.findByIdAndDelete(postId);
      // find user and reduce post count by 1
      const currentUser = await User.findById(req.user.id);
      const userPostCount = currentUser.posts - 1;
      await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
      res.json(`Post with id ${postId} deleted successfully`);
    } else {
      return next(new HttpError("Post couldn't be deleted", 403));
    }
  } catch (error) {
    next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  getCatPost,
  getUserPost,
  editPost,
  deletePost,
};
