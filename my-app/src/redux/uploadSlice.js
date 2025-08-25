import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Google Drive link converter
function convertDriveLink(driveUrl) {
  if (!driveUrl) return null;

  // regex se file id nikalna
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  if (match && match[1]) {
    const fileId = match[1];
    // 👇 Thumbnail endpoint (500px size) use karo
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w500`;
  }

  return driveUrl; // agar match na mile to original return kar do
}

// Async thunk for uploading image
export const uploadImage = createAsyncThunk(
  "upload/image",
  async (file) => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxN2I0NGIyLTNlYzUtNDNkMC1hMzFjLWE5MDUxOTczYTM1ZSIsImVtYWlsIjoid2FpemFuc2FyaTAxQGdtYWlsLmNvbSIsImlhdCI6MTc1NTAxMzIzOX0.0KvffINCp0k0lCcSN-UsZ5j5QXv6KOMobxvF8bb8ZeE";
    const token = "your_api_token";
    const formData = new FormData();
    formData.append("file", file);
    // const res = await fetch("https://conclavity-api.sochai.ai/api/v1/service/upload", {
    const res = await fetch("https://api.sochai.ai/api/upload-media", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      throw new Error("Upload failed!");
    }

    return await res.json();
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    url: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;

        const imageObj = action.payload?.data?.imageUrls?.[0];
        let url = imageObj?.url || null;

        // 🔹 Agar Google Drive link hai to convert karo
        if (url && url.includes("drive.google.com")) {
          url = convertDriveLink(url);
        }

        state.url = url;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default uploadSlice.reducer;
