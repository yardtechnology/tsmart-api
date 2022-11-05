import { BlogModel } from "../models/blog.model";
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
    poster?.path &&
      blogData?.posterPATH &&
      (await super.deleteMedia(blogData?.posterPATH));
    return blogData;
  }
  public async deleteBlog(blogId: string) {}
}

export default BlogLogic;
