import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Layout() {
	const styles = {
		backgroundColor: '#007bff', // Full-screen background color
		
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column'
	};

	const contentStyles = {
		flex: 1, 
		display: 'flex',
		justifyContent: 'end', 
		alignItems: 'center' 
	};

	return (
		<div style={styles}>
			<Navbar bg="light" expand="lg">
				<Container>
					<Navbar.Brand as={Link} to="/home">MyApp</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto"  style={contentStyles}>
						
							<Nav.Link as={Link} to="/home">Home</Nav.Link>
							<Nav.Link as={Link} to="/login">Login</Nav.Link>
							<Nav.Link as={Link} to="/register">Register</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
