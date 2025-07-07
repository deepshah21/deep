import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourses } from '../../store/slices/courseSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Admin Dashboard</h1>
          <p className="lead">Welcome back, {user?.firstName}!</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-primary">{courses?.length || 0}</h3>
              <p className="text-muted mb-0">Total Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-success">0</h3>
              <p className="text-muted mb-0">Total Students</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-info">0</h3>
              <p className="text-muted mb-0">Faculty Members</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-warning">0</h3>
              <p className="text-muted mb-0">Pending Approvals</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">All Courses</h5>
              <Button as={Link} to="/courses/create" variant="primary" size="sm">
                Create New Course
              </Button>
            </Card.Header>
            <Card.Body>
              {courses && courses.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Instructor</th>
                      <th>Enrollment</th>
                      <th>Semester</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.slice(0, 5).map((course) => (
                      <tr key={course.id}>
                        <td>
                          <strong>{course.courseCode}</strong>
                        </td>
                        <td>{course.courseName}</td>
                        <td>
                          {course.instructor
                            ? `${course.instructor.firstName} ${course.instructor.lastName}`
                            : 'Unassigned'}
                        </td>
                        <td>
                          {course.currentEnrollment || 0}/{course.maxEnrollment}
                        </td>
                        <td>{course.semester} {course.academicYear}</td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No courses available.</p>
                  <Button as={Link} to="/courses/create" variant="primary">
                    Create First Course
                  </Button>
                </div>
              )}
              {courses && courses.length > 5 && (
                <div className="text-center">
                  <Button as={Link} to="/courses" variant="link">
                    View All Courses
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Header>
              <h5 className="mb-0">Admin Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button as={Link} to="/courses/create" variant="outline-primary">
                  Create Course
                </Button>
                <Button variant="outline-success">
                  Manage Users
                </Button>
                <Button variant="outline-warning">
                  System Reports
                </Button>
                <Button variant="outline-info">
                  Settings
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h6 className="mb-0">System Statistics</h6>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Active Users</span>
                <strong>0</strong>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom">
                <span>Total Enrollments</span>
                <strong>0</strong>
              </div>
              <div className="d-flex justify-content-between py-2">
                <span>System Uptime</span>
                <strong>99.9%</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;