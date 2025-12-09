import api from "../../../api/apiClient";

export const fetchRequests = async (box = "inbox") => {
    const response = await api.get(`/api/requests/?box=${box}`);
    return response.data;
};

export const createRequest = async (data) => {
    // data should contain { pitch: id, message, ... } OR { investor_post: id, message, ... }
    const response = await api.post("/api/requests/", data);
    return response.data;
};

export const markRequestViewed = async (id) => {
    const response = await api.post(`/api/requests/${id}/mark_viewed/`);
    return response.data;
};
