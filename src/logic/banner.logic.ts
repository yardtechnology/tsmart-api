import { BannerModel } from "../models/banner.model";
import MediaLogic from "./media.logic";

class BillingLogic extends MediaLogic {
  /**
   *create banner
   */
  public async createBanner({
    title,
    description,
    imageFile,
    data,
    type,
    link,
    themeColor,
    textColor,
  }: {
    title: string;
    description: string;
    imageFile?: any;
    data: {
      screen: string;
      id: string;
    };
    type: string;
    link: string;
    themeColor?: string;
    textColor?: string;
  }): Promise<any> {
    // upload image
    const filePath = `store`;
    const imageData: any | undefined =
      imageFile && !Array.isArray(imageFile)
        ? await super.uploadMedia(imageFile, filePath)
        : undefined;
    const newsData = await new BannerModel({
      title,
      description,
      image: imageData?.url,
      imagePath: imageData?.path,
      "data.screen": data.screen,
      "data.id": data.id,
      link,
      type: type?.toString()?.toUpperCase(),
      themeColor,
      textColor,
    }).save();
    return newsData;
  }

  /**
   * update banner
   */
  public async updateBanner({
    id,
    title,
    description,
    imageFile,
    data,
    type,
    link,
    themeColor,
    textColor,
  }: {
    id: string;
    title: string;
    description: string;
    imageFile?: any;
    data: {
      screen: string;
      id: string;
    };
    type: string;
    link: string;
    themeColor?: string;
    textColor?: string;
  }): Promise<any> {
    // upload image
    const filePath = `store`;
    const imageData: any | undefined =
      imageFile && !Array.isArray(imageFile)
        ? await super.uploadMedia(imageFile, filePath)
        : undefined;
    const updatedData = await BannerModel.findByIdAndUpdate(
      id,

      {
        title,
        description,
        image: imageData?.url,
        imagePath: imageData?.path,
        "data.screen": data.screen,
        "data.id": data.id,
        link,
        type: type?.toString()?.toUpperCase(),
        themeColor,
        textColor,
      }
    );
    if (!updatedData) throw new Error("Banner not found");
    //remove old image if exist
    updatedData?.imagePath &&
      imageData?.path &&
      (await super.deleteMedia(updatedData.imagePath));
    return updatedData;
  }

  /**
   * get all banners
   */
  public async getAllBanners({ type }: { type?: string }): Promise<any> {
    const query = { type: type?.toString()?.toUpperCase() };
    !type && delete query.type;
    const banners = await BannerModel.find(query).sort({ createdAt: -1 });
    return banners;
  }

  /**
   * delete banner
   */
  public async deleteBanner(id: string): Promise<any> {
    const banner = await BannerModel.findById(id);
    if (!banner) throw new Error("Banner not found");
    const deleteBanner = BannerModel.findByIdAndDelete(id);
    //remove old image if exist
    banner.imagePath && (await super.deleteMedia(banner.imagePath));
    return deleteBanner;
  }
}

export default BillingLogic;
