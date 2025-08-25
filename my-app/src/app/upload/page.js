"use client";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/uploadSlice";
import { useState } from "react";

export default function UploadPage() {
  const dispatch = useDispatch();
  const { url, loading, error } = useSelector((state) => state.upload);
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (file) {
      const res = await dispatch(uploadImage(file)).unwrap();
      console.log("API Response:", res);
    }
  };

  return (
    <div className="min-h-screen flex justify-center p-4">
      <div> 
        <h1 className="text-3xl font-bold text-black">Upload Image (RTK)</h1>
        <input
          className="border border-black cursor-pointer"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          onClick={handleUpload}
          className=" ml-2 cursor-pointer bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 "
        >
          Upload
        </button>

        {loading && <p>Uploading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {url && (
          <div className="mt-4">
            <p>Uploaded:</p>
            <img src={url} alt="full-resolution" className="w-80 h-auto object-contain" />
          </div>
        )}
      </div>
    </div>
  )
};
