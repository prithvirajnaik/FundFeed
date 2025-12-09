import api from "../../../api/apiClient";

export const fetchMyPitches = async () => {
    const response = await api.get("/api/pitches/?developer=me");
    return response.data.results || response.data;
};

export const deletePitch = async (id) => {
    await api.delete(`/api/pitches/${id}/`);
};

export const updatePitch = async (id, formData) => {
    const response = await api.patch(`/api/pitches/${id}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
