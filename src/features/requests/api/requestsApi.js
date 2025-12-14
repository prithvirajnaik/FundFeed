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

export const getRequest = async (id) => {
    const response = await api.get(`/api/requests/${id}/`);
    return response.data;
};

export const startMeeting = async (id) => {
    const response = await api.post(`/api/requests/${id}/start_meeting/`);
    return response.data;
};

export const endMeeting = async (id) => {
    const response = await api.post(`/api/requests/${id}/end_meeting/`);
    return response.data;
};

export const generateSummary = async (id, summary = '') => {
    const response = await api.post(`/api/requests/${id}/generate_summary/`, { summary });
    return response.data;
};

export const generateStructuredSummary = async (id, summaryData) => {
    const response = await api.post(`/api/requests/${id}/generate_structured_summary/`, summaryData);
    return response.data;
};

export const rescheduleMeeting = async (id, rescheduleData) => {
    const response = await api.post(`/api/requests/${id}/reschedule/`, rescheduleData);
    return response.data;
};

export const getUpcomingMeetings = async () => {
    const response = await api.get('/api/requests/upcoming_meetings/');
    return response.data;
};

export const downloadSummaryPDF = async (id) => {
    const response = await api.get(`/api/requests/${id}/download_summary_pdf/`, {
        responseType: 'blob'
    });
    return response.data;
};