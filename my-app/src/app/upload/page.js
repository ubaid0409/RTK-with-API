"use client";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/uploadSlice";
import { useState } from "react";

export default function UploadPage() {
  const dispatch = useDispatch();
  const { url, thumbUrl, loading, error } = useSelector((state) => state.upload);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (file) {
      const res = await dispatch(uploadImage(file)).unwrap();
      console.log("API Response:", res);
    }
  };

  console.log("FULL URL =>", url);
  console.log("THUMBNAIL URL =>", thumbUrl);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Upload Image (Redux)</h1>
      <input
        className="border cursor-pointer"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded ml-2 cursor-pointer"
      >
        Upload
      </button>

      {loading && <p>Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {thumbUrl && (
        <div className="mt-4">
          <p>Thumbnail (fast preview):</p>
          <img src={thumbUrl} alt="thumbnail" className="w-40 h-40 object-cover" />
        </div>
      )}

      {url && (
        <div className="mt-4">
          <p>Uploaded:</p>
          <img src={url} alt="full-resolution" className="w-80 h-auto object-contain" />
        </div>
      )}
    </div>
  );
}
