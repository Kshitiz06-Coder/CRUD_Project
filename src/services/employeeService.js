import apiClient from "../api/postService";

export const employeeService = {
  getAll: async (limit = 10, skip = 0, search = "") => {
    const endpoint = search
      ? `/user/search?q=${search}&limit=${limit}&skip=${skip}`
      : `/user?limit=${limit}&skip=${skip}`;

    const response = await apiClient.get(endpoint);
    return response.data;
  },
  create: async (employeeData) => {
    const response = await apiClient.post("/users/add", employeeData);
    return response.data;
  },
  update: async (id, employeeData) => {
    const response = await apiClient.put(`/users/${id}`, employeeData);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/user/${id}`);
    return response.data;
  },
};
