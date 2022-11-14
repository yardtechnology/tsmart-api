import { CommentSchema } from "../models/comment.model";
import { NewsModel } from "../models/news.model";
import MediaLogic from "./media.logic";

class NewsLogic extends MediaLogic {
  public async createNews({
    title,
    description,
    author,
    posterFile,
    tags,
    article,
    link,
  }: {
    title: string;
    description: string;
    author: string;
    posterFile: any;
    tags: string[];
    article: string;
    link?: string;
  }) {
    const filePath = `news`;
    const poster: any | undefined =
      posterFile && !Array.isArray(posterFile)
        ? await super.uploadMedia(posterFile, filePath)
        : undefined;
    const newsData = await new NewsModel({
      title,
      description,
      author,
      poster: poster?.url,
      posterPath: poster?.path,
      tags,
      article,
      link,
    }).save();
    return newsData;
  }
  public async updateNews({
    newsId,
    title,
    description,
    author,
    posterFile,
    tags,
    article,
    link,
  }: {
    newsId: string;
    title: string;
    description: string;
    author: string;
    posterFile: any;
    tags: string[];
    article: string;
    link?: string;
  }) {
    const filePath = `news`;
    const poster: any | undefined =
      posterFile && !Array.isArray(posterFile)
        ? await super.uploadMedia(posterFile, filePath)
        : undefined;
    const newsData = await NewsModel.findByIdAndUpdate(newsId, {
      title,
      description,
      author,
      poster: poster?.url,
      posterPath: poster?.path,
      tags,
      article,
      link,
    });
    poster?.path &&
      newsData?.posterPATH &&
      (await super.deleteMedia(newsData?.posterPATH));
    return newsData;
  }
  public async getNews(id: string) {
    const newsData = await NewsModel.findById(id);
    return newsData;
  }
  public async deleteNews(newsId: string) {
    await CommentSchema.deleteMany({ news: newsId });
    //TODO: delete all images related to this
    const newsData = await NewsModel.findByIdAndDelete(newsId);
    return newsData;
  }
}

export default NewsLogic;
