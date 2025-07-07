import axios from 'axios';

const API_URL = '/api/courses/';

// Create request config with auth header
const createConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all courses
const getCourses = async (token) => {
  const response = await axios.get(API_URL, createConfig(token));
  return response.data;
};

// Get my enrolled courses
const getMyCourses = async (token) => {
  const response = await axios.get(API_URL + 'my-courses', createConfig(token));
  return response.data;
};

// Get teaching courses (for faculty)
const getTeachingCourses = async (token) => {
  const response = await axios.get(API_URL + 'teaching', createConfig(token));
  return response.data;
};

// Get available courses
const getAvailableCourses = async (token) => {
  const response = await axios.get(API_URL + 'available', createConfig(token));
  return response.data;
};

// Create course
const createCourse = async (courseData, token) => {
  const response = await axios.post(API_URL, courseData, createConfig(token));
  return response.data;
};

// Enroll in course
const enrollInCourse = async (courseId, token) => {
  const response = await axios.post(
    API_URL + `${courseId}/enroll`,
    {},
    createConfig(token)
  );
  return response.data;
};

// Get course by ID
const getCourseById = async (courseId, token) => {
  const response = await axios.get(API_URL + courseId, createConfig(token));
  return response.data;
};

const courseService = {
  getCourses,
  getMyCourses,
  getTeachingCourses,
  getAvailableCourses,
  createCourse,
  enrollInCourse,
  getCourseById,
};

export default courseService;