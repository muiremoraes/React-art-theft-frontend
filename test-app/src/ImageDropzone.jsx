// ImageDropzone.jsx
import { useDropzone } from "react-dropzone";

export default function ImageDropzone({ onDrop }) {
 
 /*Creates an object which we destructure to variables, such as isDragActive or isDragReject */
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "image/*": []
      },
      multiple: false,
      onDrop,
    });

    console.log(getRootProps());
  return (
    <div
      {...getRootProps()} /*<div onKeyDown= onFocus= onBlur=f onDragEnter=f>*/
      style={{
        border: "2px solid #020101ff",
        borderRadius: "8px",
        padding: "30px",
        textAlign: "center",
        cursor: "pointer",
        background: isDragReject
          ? "#8226a7ff"
          : isDragActive
          ? "#972b9bff"
          : "#8400ffff",
      }}
    >
      <input {...getInputProps()} />

      {isDragReject ? (
        <p style={{ color: "red" }}>Only image files are allowed</p>
      ) : isDragActive ? (
        <p>Drop the image(s) here…</p>
      ) : (
        <p>Drag & drop image file here, or click to select</p>
      )}
    </div>

  );


}
