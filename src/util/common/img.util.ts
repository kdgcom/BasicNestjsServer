import sharp from "sharp";

export class ImgUtil
{
    constructor()
    {

    }

    /**
     * buffer로 들어온 이미지를 webp로 변환한다.
     * @param buffer 
     * @returns 
     */
    static async convertImageToWebP(buffer: Buffer): Promise<Buffer> 
    {
        try {
          const webpBuffer = await sharp(buffer)
            .webp({ quality: 90 })  // 품질 설정, 0에서 100 사이의 값을 지정
            .toBuffer();
          return webpBuffer;
        } catch (error: any) {
          throw new Error('Failed to convert image to WebP format: ' + error.message);
        }
    }
}