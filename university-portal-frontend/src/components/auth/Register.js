import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, reset } from '../../store/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    role: 'student',
  });

  const { username, email, password, firstName, lastName, phoneNumber, role } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (isSuccess) {
      navigate('/login');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      role: [role],
    };

    dispatch(register(userData));
  };

  return (
    <div className="login-container">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="login-card">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="text-primary">🎓 University Portal</h2>
                  <p className="text-muted">Create your account</p>
                </div>

                {isError && (
                  <Alert variant="danger" className="mb-3">
                    {message}
                  </Alert>
                )}

                {isSuccess && (
                  <Alert variant="success" className="mb-3">
                    Registration successful! Please login.
                  </Alert>
                )}

                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={onChange}
                          placeholder="Enter your first name"
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={onChange}
                          placeholder="Enter your last name"
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={username}
                      onChange={onChange}
                      placeholder="Choose a username"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={onChange}
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name="role" value={role} onChange={onChange} required>
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Administrator</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      placeholder="Create a password"
                      required
                      minLength="6"
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </Form>

                <div className="text-center">
                  <p className="mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;