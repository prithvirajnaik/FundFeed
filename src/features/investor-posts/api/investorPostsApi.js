import api from "../../../api/apiClient";

export const fetchInvestorPosts = async (params) => {
    const response = await api.get("/api/investor-posts/", { params });
    return response.data;
};

export const getInvestorPost = async (id) => {
    const response = await api.get(`/api/investor-posts/${id}/`);
    return response.data;
};

export const fetchMyInvestorPosts = async () => {
    const response = await api.get("/api/investor-posts/?investor=me");
    return response.data.results || response.data;
};

export const createInvestorPost = async (data) => {
    // Use multipart/form-data if logo is present, otherwise json
    const config = {
        headers: {
            "Content-Type": data instanceof FormData ? "multipart/form-data" : "application/json",
        },
    };
    const response = await api.post("/api/investor-posts/", data, config);
    return response.data;
};

export const deleteInvestorPost = async (id) => {
    await api.delete(`/api/investor-posts/${id}/`);
};

export const saveInvestorPost = async (id) => {
    const response = await api.post(`/api/investor-posts/${id}/save/`);
    return response.data;
};

export const unsaveInvestorPost = async (id) => {
    const response = await api.delete(`/api/investor-posts/${id}/unsave/`);
    return response.data;
};

export const getSavedInvestorPosts = async () => {
    const res = await api.get("/api/investor-posts/saved/");
    return res.data; // [{ id, post }]
};
