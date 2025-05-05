// src/hooks/useImageUpload.ts
import { useState } from "react";
import axios from "axios";

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "BookShop"); 

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dw74s1u8t/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};

export default useImageUpload;
