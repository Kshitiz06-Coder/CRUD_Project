import apiClient from "../api/postService";

export const authService = {
  login: async (username, password) => {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  },
  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};
