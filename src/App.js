import { useState } from "react";
import "./App.css";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <Row style={{ justifyContent: "center" }}>
        <Col xs="3" className="mt-5">
          <Card className="p-4">
            <h1 className="mb-4">Sign Up</h1>
            <RegistrationForm />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;

function RegistrationForm() {
  const { values, handleInput, reset, validate, errors } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (validate()) {
      alert("Sign Completed Successfully");
    }
  };

  return (
    <Form onSubmit={submitForm}>
      <InputField
        label="Full Name"
        type="Name"
        name="fullname"
        placeholder="Enter your Full Name"
        value={values.fullname}
        onChange={handleInput}
        error={errors.fullname}
      />
      <InputField
        label="Email Address"
        type="email"
        name="email"
        placeholder="Enter your Email"
        value={values.email}
        onChange={handleInput}
        error={errors.email}
      />
      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Create a Password"
        value={values.password}
        onChange={handleInput}
        error={errors.password}
        showToggleIcon
        onToggle={togglePasswordVisibility}
      />
      <InputField
        label="Repeat Password"
        type={showRepeatPassword ? "text" : "password"}
        name="repeatpassword"
        placeholder="Repeat the Password"
        value={values.repeatpassword}
        onChange={handleInput}
        error={errors.confirmPassword}
        showToggleIcon
        onToggle={toggleRepeatPasswordVisibility}
      />
      <div className="mt-2">
        <Button type="submit">Sign Up</Button>{" "}
        <Button type="reset" variant="outline-secondary" onClick={reset}>
          Reset
        </Button>
      </div>
    </Form>
  );
}

const InputField = ({ label, error, showToggleIcon, onToggle, ...props }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="input-container">
        <Form.Control {...props} className={error ? "is-invalid" : ""} />
        {showToggleIcon && (
          <div className="toggle-icon" onClick={onToggle}>
            {props.type === "password" ? <FaEye /> : <FaEyeSlash />}
          </div>
        )}
      </div>
      {error && <div className="text-danger">{error}</div>}
    </Form.Group>
  );
};

const useForm = () => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const reset = () => {
    setValues({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validate = () => {
    setErrors({});
    const newErrors = {};
    if (values.fullname.length < 3) {
      newErrors.fullname = "too short";
    }
    if (!values.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      newErrors.email = "please enter a valid email id";
    }
    if (values.password.length < 8) {
      newErrors.password = "too short";
    } else if (!values.password === values.confirmPassword) {
      newErrors.confirmPassword = "password doesn't match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { values, handleInput, reset, validate, errors };
};
