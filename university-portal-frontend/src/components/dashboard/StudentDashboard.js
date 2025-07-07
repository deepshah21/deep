import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyCourses, getAvailableCourses } from '../../store/slices/courseSlice';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { myCourses, availableCourses, isLoading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getMyCourses());
    dispatch(getAvailableCourses());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Student Dashboard</h1>
          <p className="lead">Welcome back, {user?.firstName}!</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-primary">{myCourses?.length || 0}</h3>
              <p className="text-muted mb-0">Enrolled Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-success">{availableCourses?.length || 0}</h3>
              <p className="text-muted mb-0">Available Courses</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card text-center">
            <Card.Body>
              <h3 className="text-info">0</h3>
              <p className="text-muted mb-0">Assignments Due</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">My Enrolled Courses</h5>
            </Card.Header>
            <Card.Body>
              {myCourses && myCourses.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Credits</th>
                      <th>Instructor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCourses.map((course) => (
                      <tr key={course.id}>
                        <td>
                          <strong>{course.courseCode}</strong>
                        </td>
                        <td>{course.courseName}</td>
                        <td>{course.credits}</td>
                        <td>
                          {course.instructor
                            ? `${course.instructor.firstName} ${course.instructor.lastName}`
                            : 'TBD'}
                        </td>
                        <td>
                          <Badge bg="success">Enrolled</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">You haven't enrolled in any courses yet.</p>
                  <Button as={Link} to="/courses" variant="primary">
                    Browse Available Courses
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Button as={Link} to="/courses" variant="outline-primary">
                  Browse Courses
                </Button>
                <Button as={Link} to="/courses" variant="outline-success">
                  View Assignments
                </Button>
                <Button as={Link} to="/courses" variant="outline-info">
                  Check Grades
                </Button>
              </div>
            </Card.Body>
          </Card>

          {availableCourses && availableCourses.length > 0 && (
            <Card className="mt-3">
              <Card.Header>
                <h6 className="mb-0">Available Courses</h6>
              </Card.Header>
              <Card.Body>
                {availableCourses.slice(0, 3).map((course) => (
                  <div key={course.id} className="border-bottom py-2">
                    <strong>{course.courseCode}</strong>
                    <br />
                    <small className="text-muted">{course.courseName}</small>
                  </div>
                ))}
                {availableCourses.length > 3 && (
                  <div className="text-center mt-2">
                    <Button as={Link} to="/courses" variant="link" size="sm">
                      View all available courses
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;