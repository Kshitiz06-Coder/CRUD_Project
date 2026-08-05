import apiClient from "../api/postService";

export const authService = {
  login: async (username, password) => {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
      expiresInMins: 60, // 60 = 1 hour. Use 1440 for 24 hours.
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};