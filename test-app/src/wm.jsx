import { useState } from "react";
import ImageDropzone from "./ImageDropzone";
import { uploadImage } from "./uploadImage";
import { useSession } from "./SessionContext";

function WatermarkPage() {
  const [lastHash, setLastHash] = useState(null);
  const [watermark, setWatermark] = useState("");

  // >>> Use secure auth-enabled API calls <<<
  const { postWithAuth } = useSession();

  const handleDrop = async (files) => {
    if (files.length === 0) return;

    const file = files[0];

    try {
      const hash = await uploadImage(file);
      console.log("Uploaded:", file.name, "Hash:", hash);

      const ext = file.name.split(".").pop();
      setLastHash(`${hash}.${ext}`);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const handleEncode = async () => {
    if (!lastHash) {
      alert("Please upload an image first.");
      return;
    }
    if (!watermark) {
      alert("Please enter a watermark text.");
      return;
    }

    try {
      const response = await postWithAuth("/encode", {
        watermark: watermark,
        name: lastHash,
      });

      console.log(response.data);
      alert("Watermark added successfully!");
    } catch (err) {
      console.error("Encode failed:", err);
      alert("Failed to add watermark.");
    }
  };

  return (
    <>
      <h2>Upload Image</h2>
      <ImageDropzone onDrop={handleDrop} />

      <h3>Last uploaded file:</h3>
      <p>{lastHash ?? "None yet"}</p>

      <hr />

      <h2>Steganography — Add Watermark</h2>

      <label>Watermark text:</label>
      <input
        type="text"
        value={watermark}
        onChange={(e) => setWatermark(e.target.value)}
        style={{ margin: "10px" }}
      />

      <button onClick={handleEncode}>Apply watermark</button>

      <hr />

      <h2>Steganography — Get Watermark</h2>
      <button disabled>TODO: implement decode</button>
    </>
  );
}

export default WatermarkPage;
