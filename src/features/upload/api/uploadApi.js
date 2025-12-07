import api from "../../../api/apiClient";

export async function uploadPitch(formData) {
  try {
    const res = await api.post("/pitches/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return { success: true, data: res.data };
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return { success: false, message: err.response?.data || "Upload failed" };
  }
}
