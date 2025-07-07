import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import courseService from '../../services/courseService';

const initialState = {
  courses: [],
  myCourses: [],
  teachingCourses: [],
  availableCourses: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Get all courses
export const getCourses = createAsyncThunk(
  'course/getCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await courseService.getCourses(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get my enrolled courses
export const getMyCourses = createAsyncThunk(
  'course/getMyCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await courseService.getMyCourses(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get teaching courses
export const getTeachingCourses = createAsyncThunk(
  'course/getTeachingCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await courseService.getTeachingCourses(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get available courses
export const getAvailableCourses = createAsyncThunk(
  'course/getAvailableCourses',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await courseService.getAvailableCourses(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create course
export const createCourse = createAsyncThunk(
  'course/createCourse',
  async (courseData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await courseService.createCourse(courseData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Enroll in course
export const enrollInCourse = createAsyncThunk(
  'course/enrollInCourse',
  async (courseId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.accessToken;
      return await courseService.enrollInCourse(courseId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMyCourses.fulfilled, (state, action) => {
        state.myCourses = action.payload;
      })
      .addCase(getTeachingCourses.fulfilled, (state, action) => {
        state.teachingCourses = action.payload;
      })
      .addCase(getAvailableCourses.fulfilled, (state, action) => {
        state.availableCourses = action.payload;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.courses.push(action.payload);
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = courseSlice.actions;
export default courseSlice.reducer;