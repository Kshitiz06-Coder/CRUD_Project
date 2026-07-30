import axios from "axios";

const BASE_URL = "https:://jsonplaceholder.typicode.com/posts";

// Get all the post
export const getAllPosts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error, fetching post : ", error);
    throw error;
  }
};

// get one post by id given
export const getPostById = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.date;
  } catch (error) {
    console.error("Error found when fetching , ", error);
  }
};

// Post - create a new post
export const createPost = async (postData) => {
  try {
    const response = await axios.post(BASE_URL, postData);
    return response.data;
  } catch (error) {
    console.error("Error found when fetching data", error);
  }
};

// Kshitiz turn , add put and delete here;
