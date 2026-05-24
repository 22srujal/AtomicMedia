import { apiRequest } from './apiClient.js'

export function getFeaturedProjects() {
  return apiRequest('/projects/featured')
}
