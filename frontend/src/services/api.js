import axios from 'axios'

const API_BASE_URL = '/api'

// Users API
export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`)
  return response.data
}
export const createUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/users`, userData)
  return response.data
}

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData)
  return response.data
}

export const deleteUser = async (id) => {
  await axios.delete(`${API_BASE_URL}/users/${id}`)
}

export const fetchUserHistory = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/allocations/user/${userId}`)
  return response.data
}

// Projects API
export const fetchProjects = async () => {
  const response = await axios.get(`${API_BASE_URL}/projects`)
  return response.data
}

export const createProject = async (projectData) => {
  const response = await axios.post(`${API_BASE_URL}/projects`, projectData)
  return response.data
}

export const updateProject = async (id, projectData) => {
  const response = await axios.put(`${API_BASE_URL}/projects/${id}`, projectData)
  return response.data
}

export const deleteProject = async (id) => {
  await axios.delete(`${API_BASE_URL}/projects/${id}`)
}

export const fetchProjectDetails = async (projectId) => {
  const response = await axios.get(`${API_BASE_URL}/allocations/project/${projectId}`)
  return response.data
}

// Allocations API
export const fetchAllocations = async () => {
  const response = await axios.get(`${API_BASE_URL}/allocations`)
  return response.data
}

export const createAllocation = async (allocationData) => {
  const response = await axios.post(`${API_BASE_URL}/allocations`, allocationData)
  return response.data
}

export const updateAllocation = async (id, allocationData) => {
  const response = await axios.put(`${API_BASE_URL}/allocations/${id}`, allocationData)
  return response.data
}

export const deleteAllocation = async (id) => {
  await axios.delete(`${API_BASE_URL}/allocations/${id}`)
}

// Dashboard API
export const fetchDashboardStats = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard/stats`)
  return response.data
}

// History API
export const fetchHistory = async () => {
  const response = await axios.get(`${API_BASE_URL}/history`)
  return response.data
}

