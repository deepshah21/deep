import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCourse, reset } from '../../store/slices/courseSlice';

const CourseCreate = () => {
  const [formData, setFormData] = useState({
    courseCode: '',
    courseName: '',
    description: '',
    credits: '',
    semester: '',
    academicYear: '',
    maxEnrollment: '',
  });

  const { courseCode, courseName, description, credits, semester, academicYear, maxEnrollment } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.course);

  useEffect(() => {
    if (isSuccess) {
      navigate('/courses');
    }

    if (isError || isSuccess) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [isSuccess, isError, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      courseCode,
      courseName,
      description,
      credits: parseInt(credits),
      semester,
      academicYear,
      maxEnrollment: parseInt(maxEnrollment),
    };

    dispatch(createCourse(courseData));
  };

  const hasRole = (role) => {
    return user?.roles?.includes(role);
  };

  if (!hasRole('ROLE_FACULTY') && !hasRole('ROLE_ADMIN')) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          You don't have permission to create courses.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header>
              <h3 className="mb-0">Create New Course</h3>
            </Card.Header>
            <Card.Body>
              {isError && (
                <Alert variant="danger" className="mb-3">
                  {message}
                </Alert>
              )}

              <Form onSubmit={onSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Course Code *</Form.Label>
                      <Form.Control
                        type="text"
                        name="courseCode"
                        value={courseCode}
                        onChange={onChange}
                        placeholder="e.g., CS101"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Credits *</Form.Label>
                      <Form.Control
                        type="number"
                        name="credits"
                        value={credits}
                        onChange={onChange}
                        placeholder="3"
                        min="1"
                        max="6"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Course Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="courseName"
                    value={courseName}
                    onChange={onChange}
                    placeholder="Introduction to Computer Science"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={description}
                    onChange={onChange}
                    placeholder="Course description..."
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Semester *</Form.Label>
                      <Form.Select name="semester" value={semester} onChange={onChange} required>
                        <option value="">Select Semester</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Fall">Fall</option>
                        <option value="Winter">Winter</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Academic Year *</Form.Label>
                      <Form.Control
                        type="text"
                        name="academicYear"
                        value={academicYear}
                        onChange={onChange}
                        placeholder="2024"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Maximum Enrollment *</Form.Label>
                  <Form.Control
                    type="number"
                    name="maxEnrollment"
                    value={maxEnrollment}
                    onChange={onChange}
                    placeholder="30"
                    min="1"
                    max="200"
                    required
                  />
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading}
                    className="flex-grow-1"
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Creating...
                      </>
                    ) : (
                      'Create Course'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={() => navigate('/courses')}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CourseCreate;