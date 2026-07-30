import axios from "axios";

// ⚠️ Must have TWO slashes after "https:"
const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const getAllPosts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(BASE_URL, postData);
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

// ============================================
// TODO: YOUR FRIEND WILL IMPLEMENT THESE
// ============================================
 // this is meant to be replace by you , kshitiz
export const updatePost = async (id, updatedData) => {
  throw new Error(
    `updatePost(id=${id}) is not implemented yet - ${updatedData} waiting for friend's PR 😄`,
  );
};

export const deletePost = async (id) => {
  throw new Error(
    `deletePost(id=${id}) is not implemented yet - waiting for friend's PR 😄`,
  );
};
