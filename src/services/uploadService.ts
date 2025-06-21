import { HttpService } from "@/services/httpService";

class UploadService {
  private request = new HttpService();

  async uploadImage(file: File, cookieName: string) {
    return this.request.upload<{ url: string; phash: string }>(
      "/static/upload",
      file,
      cookieName
    );
  }
}

const uploadService = new UploadService();
export default uploadService;
