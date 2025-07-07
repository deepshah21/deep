import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, getAvailableCourses, enrollInCourse, reset } from '../../store/slices/courseSlice';

const CourseList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { courses, availableCourses, isLoading, isSuccess, message } = useSelector((state) => state.course);
  const [enrollingCourse, setEnrollingCourse] = useState(null);

  useEffect(() => {
    if (user?.roles?.includes('ROLE_STUDENT')) {
      dispatch(getAvailableCourses());
    } else {
      dispatch(getCourses());
    }
    
    if (isSuccess && message) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [dispatch, user, isSuccess, message]);

  const handleEnroll = async (courseId) => {
    setEnrollingCourse(courseId);
    await dispatch(enrollInCourse(courseId));
    setEnrollingCourse(null);
    // Refresh available courses after enrollment
    dispatch(getAvailableCourses());
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role);
  };

  const coursesToShow = hasRole('ROLE_STUDENT') ? availableCourses : courses;

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">
            {hasRole('ROLE_STUDENT') ? 'Available Courses' : 'All Courses'}
          </h1>
          {hasRole('ROLE_STUDENT') && (
            <p className="lead">Browse and enroll in available courses</p>
          )}
        </Col>
      </Row>

      {isSuccess && message && (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      )}

      {isLoading ? (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {coursesToShow && coursesToShow.length > 0 ? (
            coursesToShow.map((course) => (
              <Col md={6} lg={4} key={course.id} className="mb-4">
                <Card className="course-card h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title text-primary">{course.courseCode}</h5>
                      <Badge bg="secondary">{course.credits} Credits</Badge>
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{course.courseName}</h6>
                    <p className="card-text flex-grow-1">
                      {course.description || 'No description available.'}
                    </p>
                    
                    <div className="course-info mb-3">
                      <small className="text-muted d-block">
                        <strong>Instructor:</strong>{' '}
                        {course.instructor
                          ? `${course.instructor.firstName} ${course.instructor.lastName}`
                          : 'TBD'}
                      </small>
                      <small className="text-muted d-block">
                        <strong>Semester:</strong> {course.semester} {course.academicYear}
                      </small>
                      <small className="text-muted d-block">
                        <strong>Enrollment:</strong> {course.currentEnrollment || 0}/{course.maxEnrollment}
                      </small>
                    </div>

                    <div className="mt-auto">
                      {hasRole('ROLE_STUDENT') ? (
                        <Button
                          variant="primary"
                          className="w-100"
                          onClick={() => handleEnroll(course.id)}
                          disabled={
                            enrollingCourse === course.id ||
                            course.currentEnrollment >= course.maxEnrollment
                          }
                        >
                          {enrollingCourse === course.id ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Enrolling...
                            </>
                          ) : course.currentEnrollment >= course.maxEnrollment ? (
                            'Course Full'
                          ) : (
                            'Enroll Now'
                          )}
                        </Button>
                      ) : (
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm">
                            View Details
                          </Button>
                          {(hasRole('ROLE_ADMIN') || 
                            (hasRole('ROLE_FACULTY') && course.instructor?.id === user.id)) && (
                            <Button variant="outline-warning" size="sm">
                              Edit
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <div className="text-center py-5">
                <h4 className="text-muted">
                  {hasRole('ROLE_STUDENT')
                    ? 'No available courses at the moment'
                    : 'No courses found'}
                </h4>
                <p className="text-muted">
                  {hasRole('ROLE_STUDENT')
                    ? 'Check back later for new course offerings.'
                    : 'Create your first course to get started.'}
                </p>
                {(hasRole('ROLE_FACULTY') || hasRole('ROLE_ADMIN')) && (
                  <Button variant="primary" href="/courses/create">
                    Create Course
                  </Button>
                )}
              </div>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default CourseList;