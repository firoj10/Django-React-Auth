import React, { useState } from "react";
import axios from "axios";

export default function Register() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	});

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
            const response = await axios.post("http://127.0.0.1:8000/api/register/", formData)
            console.log("Success!", response.data)
            setSuccessMessage("Registration Successful!")
        }
        catch(error){
            console.log("Error during registration!", error.response?.data);
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
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        margin: 'auto',
		  marginTop: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundImage: 'url(path/to/your/image.jpg)', // Background image
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    };

    return (
        <div style={containerStyle}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <label>Username:</label>
                <br />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '15px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                
                <label>Email:</label>
                <br />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '15px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                
                <label>Password:</label>
                <br />
                <input
                    type="password"
                    name="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '15px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                
                <label>Confirm Password:</label>
                <br />
                <input
                    type="password"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    style={{ width: '100%', marginBottom: '15px', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                
                <button 
                    type="submit" 
                    disabled={isLoading} 
                    style={{
                        padding: '10px 15px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        cursor: 'pointer',
                        width: '100%',
                        marginTop: '10px'
                    }}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
	);
}
