import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Container } from "react-bootstrap";

export default function Login() {
const [formData, setFormData] = useState({
  email:"",
  password:""
})


const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const [isLoading, setIsLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState(null);
const [error, setError] = useState(null)
const handleSubmit = async (e) => {
  e.preventDefault();
      if(isLoading){
          return
      }

      setIsLoading(true);

      try{
          const response = await axios.post("http://127.0.0.1:8000/api/login/", formData)
          console.log("Success!", response.data)
          setSuccessMessage("Login Successful!")
          localStorage.setItem("accessToken", response.data.tokens.access);
          localStorage.setItem("refreshToken", response.data.tokens.refresh)
      }
      catch(error){
          console.log("Error during Login!", error.response?.data);
          if(error.response && error.response.data){
              Object.keys(error.response.data).forEach(field => {
                  const errorMessages = error.response.data[field];
                  if(errorMessages && errorMessages.length > 0){
                      setError(errorMessages[0]);
                  }
              })
          }
      }
      finally{
          setIsLoading(false)
      }

};
const containerStyle = {

  width: '40%',
  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for form
  padding: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  maxWidth: '400px', // Optional: set a max width for larger screens
  margin: 'auto', // Center the container
    marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '50vh', // Full height of the viewport
  backgroundImage: 'url(path/to/your/image.jpg)', // Background image
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
};
  return (
    <div style={containerStyle}>
    {error && <Alert variant="danger">{error}</Alert>}
    {successMessage && <Alert variant="success">{successMessage}</Alert>}
    <h2 className="text-center">Login</h2>
    <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
            />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
            />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading} className="mt-4 w-100">
            {isLoading ? "Logging in..." : "Login"}
        </Button>
    </Form>
</div>
  )
}
