import express from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Post from '../models/postModel';

export type PostType = {
  _id: string;
  createdAt: number;
  updatedAt?: number;
  title: string;
  body: string;
  image: string;
  like: number;
  publish: boolean;
};

/**
 * Fetch all posts
 * GET /posts
 */

export const getPosts = asyncHandler(async (req: express.Request, res: express.Response) => {
  await Post.find({}, (error, post) => {
    if (error) res.send(error);
    res.json(post);
  });
});

/**
 * Add new post
 * POST /posts
 */

export const addPost = asyncHandler(async (req: express.Request, res: express.Response) => {
  const newPost = new Post(req.body as PostType);

  await newPost.save((error, post) => {
    if (error) res.send(error);
    res.json(post);
  });
});

/**
 * Delete post
 * DELETE /posts/:postId
 */

export const deletePost = asyncHandler(async (req: express.Request, res: express.Response) => {
  await Post.deleteOne(
    {
      _id: req.params.postId,
    },
    (error) => {
      if (error) res.send(error);
      res.json({ message: 'Post successfully deleted' });
    },
  );
});

/**
 * Update post
 * PATCH /posts/:postId
 */

export const updatePost = asyncHandler(async (req: express.Request, res: express.Response) => {
  await Post.findOneAndUpdate(
    {
      _id: req.params.postId,
    },
    req.body,
    { new: true },
    (error, post) => {
      if (error) res.send(error);
      res.json(post);
    },
  );
});
