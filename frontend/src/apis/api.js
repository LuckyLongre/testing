import axios from 'axios';
import {toast} from 'sonner';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: `${backendUrl}/api/v1`, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Global response interceptor: show a toast for network errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network / CORS / server down
      toast.error('Network error. Please check your connection or backend server.');
    }
    return Promise.reject(error);
  }
);

const _extractMessage = (resp) => {
  if (!resp) return null;
  if (resp.data && typeof resp.data === 'object' && 'message' in resp.data) return resp.data.message;
  if (typeof resp === 'object' && 'message' in resp) return resp.message;
  return null;
};


/*

all methods of user

post /users - create user
post /users/login - login user
get /users - get all users
delete /users/:id - delete a specific user
delete /users - delete all users


 */

export const createUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    const msg = _extractMessage(response) || "User created successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error creating user:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to create user";
    toast.error(errMsg);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    const msg = _extractMessage(response) || "Login successful";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error logging in:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to login";
    toast.error(errMsg);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users');
    const msg = _extractMessage(response) || "Users fetched successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error fetching users:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to fetch users";
    toast.error(errMsg);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    const msg = _extractMessage(response) || "User deleted successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error deleting user:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to delete user";
    toast.error(errMsg);
    throw error;
  }
};

export const deleteAllUsers = async () => {
  try {
    const response = await api.delete('/users');
    const msg = _extractMessage(response) || "All users deleted successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error deleting all users:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to delete all users";
    toast.error(errMsg);
    throw error;
  }
};





/*

all methods of project

post /projects - create project
get /projects/user/:userId - get projects by user ID
get /projects/:projectId - get a project by ID
put /projects/:projectId - update a project
delete /projects/:projectId - delete a project
post /projects/:projectId/files - upload project files
post /projects/:projectId/stakeholders - map stakeholders
post /projects/:projectId/map-facts - map facts
post /projects/:projectId/increament-status - increament project status
 */


export const createProject = async (projectData) => {
  try {
    const response = await api.post('/projects', projectData);
    const msg = _extractMessage(response) || "Project created successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error creating project:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to create project";
    toast.error(errMsg);
    throw error;
  }
};

export const getProjectsByUserId = async (userId) => {
  try {
    const response = await api.get(`/projects/user/${userId}`);
    const msg = _extractMessage(response) || "Projects fetched successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error fetching projects:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to fetch projects";
    toast.error(errMsg);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await api.get(`/projects/${projectId}`);
    const msg = _extractMessage(response) || "Project fetched successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error fetching project:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to fetch project";
    toast.error(errMsg);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/projects/${projectId}`, projectData);
    const msg = _extractMessage(response) || "Project updated successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error updating project:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to update project";
    toast.error(errMsg);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/projects/${projectId}`);
    const msg = _extractMessage(response) || "Project deleted successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error deleting project:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to delete project";
    toast.error(errMsg);
    throw error;
  }
};

export const uploadProjectFiles = async (projectId, files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post(`/projects/${projectId}/files`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const msg = _extractMessage(response) || "Files uploaded successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error uploading files:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to upload files";
    toast.error(errMsg);
    throw error;
  }
};

export const mapStakeholders = async (projectId, relevantChats) => {
  try {
    const response = await api.post(`/projects/${projectId}/stakeholders`, { relevantChats });
    const msg = _extractMessage(response) || "Stakeholders mapped successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error mapping stakeholders:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to map stakeholders";
    toast.error(errMsg);
    throw error;
  }
};

export const increamentProjectStatus = async (projectId) => {
  try {
    const response = await api.post(`/projects/${projectId}/increament-status`);
    const msg = _extractMessage(response) || "Project status increamented successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error increamenting project status:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to increament project status";
    toast.error(errMsg);
    throw error;
  }
};


export const mapFacts = async (projectId, userData) => {
  try {
    // Send full `userData` in the request body (backend expects `userData`)
    const response = await api.post(`/projects/${projectId}/map-facts`, { userData });
    const msg = _extractMessage(response) || "Facts mapped successfully";
    toast.success(msg);
    return response.data ?? response;
  } catch (error) {
    console.error('Error mapping facts:', error);
    const errMsg = error?.response ? (error.response.data?.message ?? error.response.message) : "Failed to map facts";
    toast.error(errMsg);
    throw error;
  }
};





