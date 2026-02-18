import axios from "axios";
import { toast } from "sonner";

// Initialize Axios instance

const api = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

/**
 * USER API METHODS
 */

// 1. Signup
export const signupUser = async (userData) => {
  try {
    const response = await api.post("/user/signup", userData);
    toast.success(response.data.message || "Account created successfully!");
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Signup failed";
    toast.error(errorMsg);
    throw error; // Re-throwing so the calling component can handle local loading states
  }
};

// 2. Login
export const loginUser = async (email,password) => {
  try {
    // Note: You're currently using POST for login with just the email per your specs
    const response = await api.post("/user/login", { email , password});
    toast.success(response.data.message || "Welcome back!");
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Login failed";
    toast.error(errorMsg);
    throw error;
  }
};

// 3. Get Profile (Post Method as per your flow)
export const getUserProfile = async (email) => {
  try {
    const response = await api.post("/user/profile", { email });
    // Usually, we don't toast "Success" for every background fetch to avoid spamming the UI,
    // but I'll add it here per your request flow.
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Could not fetch profile";
    toast.error(errorMsg);
    throw error;
  }
};

// 4. Delete User
export const deleteUser = async (email) => {
  try {
    // Note: Axios delete with body requires the 'data' key
    const response = await api.delete("/user/delete", { data: { email } });
    toast.success(response.data.message || "User deleted");
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Delete failed";
    toast.error(errorMsg);
    throw error;
  }
};

// 5. Get All Users
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/all");
    return response.data;
  } catch (error) {
    const errorMsg = error.response?.data?.message || "Failed to load users";
    toast.error(errorMsg);
    throw error;
  }
};

export default api;