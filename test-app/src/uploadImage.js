// uploadImage.js
import axios from "axios";

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post("http://127.0.0.1:5000/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.hash; // Flask returns {"hash": "..."}
}
