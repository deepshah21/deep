import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTeachingCourses } from '../../store/slices/courseSlice';

const FacultyDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { teachingCourses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getTeachingCourses());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Faculty Dashboard</h1>
          <p className="lead">Welcome back, Professor {user?.lastName}!</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-primary">{teachingCourses?.length || 0}</h3>
              <p className="text-muted mb-0">Teaching Courses</p>
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
              <h3 className="text-warning">0</h3>
              <p className="text-muted mb-0">Pending Grading</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-info">0</h3>
              <p className="text-muted mb-0">Assignments</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">My Teaching Courses</h5>
              <Button as={Link} to="/courses/create" variant="primary" size="sm">
                Create New Course
              </Button>
            </Card.Header>
            <Card.Body>
              {teachingCourses && teachingCourses.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Credits</th>
                      <th>Enrollment</th>
                      <th>Semester</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachingCourses.map((course) => (
                      <tr key={course.id}>
                        <td>
                          <strong>{course.courseCode}</strong>
                        </td>
                        <td>{course.courseName}</td>
                        <td>{course.credits}</td>
                        <td>
                          <Badge bg="info">
                            {course.currentEnrollment || 0}/{course.maxEnrollment}
                          </Badge>
                        </td>
                        <td>{course.semester} {course.academicYear}</td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">You haven't created any courses yet.</p>
                  <Button as={Link} to="/courses/create" variant="primary">
                    Create Your First Course
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button as={Link} to="/courses/create" variant="outline-primary">
                  Create Course
                </Button>
                <Button variant="outline-success">
                  Manage Assignments
                </Button>
                <Button variant="outline-warning">
                  Grade Submissions
                </Button>
                <Button variant="outline-info">
                  Schedule Exams
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h6 className="mb-0">Recent Activities</h6>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-3">
                <p className="text-muted mb-0">No recent activities</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FacultyDashboard;