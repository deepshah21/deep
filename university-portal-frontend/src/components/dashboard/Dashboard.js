import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const hasRole = (role) => {
    return user?.roles?.includes(role);
  };

  if (hasRole('ROLE_ADMIN')) {
    return <AdminDashboard />;
  } else if (hasRole('ROLE_FACULTY')) {
    return <FacultyDashboard />;
  } else if (hasRole('ROLE_STUDENT')) {
    return <StudentDashboard />;
  }

  return <Navigate to="/login" />;
};

export default Dashboard;