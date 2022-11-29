import { paginationHelper } from "../helper";
import { BlogModel } from "../models/blog.model";
import { CommentSchema } from "../models/comment.model";
import MediaLogic from "./media.logic";

class BlogLogic extends MediaLogic {
  public async createBlog({
    title,
    description,
    author,
    posterFile,
    tags,
    article,
  }: {
    title: string;
    description: string;
    author: string;
    posterFile: any;
    tags: string[];
    article: string;
  }) {
    const filePath = `blog`;
    const poster: any | undefined =
      posterFile && !Array.isArray(posterFile)
        ? await super.uploadMedia(posterFile, filePath)
        : undefined;
    const blogData = await new BlogModel({
      title,
      description,
      author,
      poster: poster?.url,
      posterPath: poster?.path,
      tags,
      article,
    }).save();
    return blogData;
  }
  public async updateBlog({
    blogId,
    title,
    description,
    author,
    posterFile,
    tags,
    article,
  }: {
    blogId: string;
    title: string;
    description: string;
    author: string;
    posterFile: any;
    tags: string[];
    article: string;
  }) {
    const filePath = `blog`;
    const poster: any | undefined =
      posterFile && !Array.isArray(posterFile)
        ? await super.uploadMedia(posterFile, filePath)
        : undefined;
    const blogData = await BlogModel.findByIdAndUpdate(blogId, {
      title,
      description,
      author,
      poster: poster?.url,
      posterPath: poster?.path,
      tags,
      article,
    });
    poster?.path &&
      blogData?.posterPATH &&
      (await super.deleteMedia(blogData?.posterPATH));
    return blogData;
  }
  public async getBlog(id: string) {
    const blogData = await BlogModel.findById(id);
    return blogData;
  }
  //add comment
  public async addComment({
    blogId,
    commentId,
    comment,
  }: {
    blogId: string;
    commentId: string;
    comment: string;
  }) {
    const commentData = await new CommentSchema({
      blogId,
      commentId,
      comment,
    }).save();
    return commentData;
  }
  //delete comment
  public async deleteComment({ commentId }: { commentId: string }) {
    const commentData = await CommentSchema.findByIdAndDelete(commentId);
    return commentData;
  }
  //get comment
  public async getComments({
    blogId,
    commentId,
    limit,
    chunk,
  }: {
    blogId?: string;
    commentId?: string;
    limit?: number | string;
    chunk?: number | string;
  }) {
    const query = { blogId: blogId, commentId: commentId };
    !blogId && delete query.blogId;
    !commentId && delete query.commentId;
    const commentData = await paginationHelper({
      model: CommentSchema,
      query,
      chunk,
      limit,
      sort: { createdAt: -1 },
    });

    return commentData;
  }
  public async deleteBlog(blogId: string) {
    await CommentSchema.deleteMany({ blog: blogId });
    const blogData = await BlogModel.findByIdAndDelete(blogId);
    return blogData;
  }
}

export default BlogLogic;
