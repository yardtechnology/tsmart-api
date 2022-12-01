import { AboutUsModel } from "../models/aboutUs.model";
import MediaLogic from "./media.logic";

class BillingLogic extends MediaLogic {
  /**
   *create aboutUs
   */
  public async createAboutUs({
    title,
    description,
    imageFile,
  }: {
    title: string;
    description: string;
    imageFile?: any;
  }): Promise<any> {
    // upload image
    const filePath = `store`;
    const imageData: any | undefined =
      imageFile && !Array.isArray(imageFile)
        ? await super.uploadMedia(imageFile, filePath)
        : undefined;
    const newsData = await new AboutUsModel({
      title,
      description,
      image: imageData?.url,
      imagePath: imageData?.path,
    }).save();
    return newsData;
  }

  /**
   * update aboutUs
   */
  public async updateAboutUs({
    id,
    title,
    description,
    imageFile,
  }: {
    id: string;
    title: string;
    description: string;
    imageFile?: any;
  }): Promise<any> {
    // upload image
    const filePath = `store`;
    const imageData: any | undefined =
      imageFile && !Array.isArray(imageFile)
        ? await super.uploadMedia(imageFile, filePath)
        : undefined;
    const updatedData = await AboutUsModel.findByIdAndUpdate(
      id,

      {
        title,
        description,
        image: imageData?.url,
        imagePath: imageData?.path,
      }
    );
    if (!updatedData) throw new Error("AboutUs not found");
    //remove old image if exist
    updatedData?.imagePath &&
      imageData?.path &&
      (await super.deleteMedia(updatedData.imagePath));
    return updatedData;
  }

  /**
   * get all aboutUss
   */
  public async getAllAboutUss({ type }: { type?: string }): Promise<any> {
    const query = { type: type?.toString()?.toUpperCase() };
    !type && delete query.type;
    const aboutUss = await AboutUsModel.find(query).sort({ createdAt: -1 });
    return aboutUss;
  }

  /**
   * delete aboutUs
   */
  public async deleteAboutUs(id: string): Promise<any> {
    const aboutUs = await AboutUsModel.findById(id);
    if (!aboutUs) throw new Error("AboutUs not found");
    const deleteAboutUs = AboutUsModel.findByIdAndDelete(id);
    //remove old image if exist
    aboutUs.imagePath && (await super.deleteMedia(aboutUs.imagePath));
    return deleteAboutUs;
  }
}

export default BillingLogic;
