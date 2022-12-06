import AWS, { S3 } from "aws-sdk";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import { ImageType } from "../types/core";
class MediaLogic {
  private s3: S3;
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESSKEYID,
      secretAccessKey: process.env.AWS_SECRETACCESSKEY,
    });
  }

  /** media upload */
  public uploadMedia(
    file: UploadedFile,
    folder?: string
  ): Promise<{ url: string; path: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: `${uuidv4()}.${file.mimetype.split("/")[1]}`,
          Body: file.data,
          ContentType: file.mimetype,
        };
        new AWS.S3({
          accessKeyId: process.env.AWS_ACCESSKEYID,
          secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        })?.upload(params, (err: any, data: any) => {
          if (err) {
            console.log(err.message);
            reject(err);
          }
          resolve({
            url: data?.Location,
            path: data?.key,
          });
        });
        // fs.unlinkSync(file.tempFilePath);
      } catch (error) {
        reject(error);
      }
    });
  }

  /** upload multiple media */
  public uploadMultipleMedia(
    files: UploadedFile[],
    folder?: string
  ): Promise<ImageType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let resultArray: ImageType[] = [];
        for (const file of files) {
          // upload media
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: `${uuidv4()}.${file.mimetype.split("/")[1]}`,
            Body: file.data,
            ContentType: file.mimetype,
          };
          new AWS.S3({
            accessKeyId: process.env.AWS_ACCESSKEYID,
            secretAccessKey: process.env.AWS_SECRETACCESSKEY,
          })?.upload(params, (err: any, data: any) => {
            if (err) {
              console.log(err.message);
              reject(err);
            }
            // push result to result array
            resultArray.push({
              url: data?.Location,
              path: data?.key,
            });
          });
        }
        // send response to client
        resolve(resultArray);
      } catch (error) {
        reject(error);
      }
    });
  }

  // delete media
  public deleteMedia(path: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const params = {
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: path,
        };
        new AWS.S3({
          accessKeyId: process.env.AWS_ACCESSKEYID,
          secretAccessKey: process.env.AWS_SECRETACCESSKEY,
        }).deleteObject(params, function (err, data) {
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  //delete multiple media
  public deleteMultipleMedia(paths: string[]): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        for (const path of paths) {
          const params = {
            Bucket: process.env.AWS_BUCKET_NAME as string,
            Key: path,
          };
          new AWS.S3({
            accessKeyId: process.env.AWS_ACCESSKEYID,
            secretAccessKey: process.env.AWS_SECRETACCESSKEY,
          }).deleteObject(params, function (err, data) {
            if (err) {
              console.log(err);
              reject(err);
            }
          });
        }
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default MediaLogic;
