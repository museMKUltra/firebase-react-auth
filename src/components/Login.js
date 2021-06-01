import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

function Login(props) {
	const emailRef = useRef();
	const passwordRef = useRef();

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth();
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setIsLoading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch (e) {
			setError(e.message);
			setIsLoading(false);
		}
	}

	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Log In</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="mail" ref={emailRef}></Form.Control>
					</Form.Group>
					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef}></Form.Control>
					</Form.Group>
					<Button disabled={isLoading} className="w-100 mt-3" type="submit">
						Log In
					</Button>
					<div className="w-100 text-center mt-3">
						<Link to="/reset-password">Reset Password</Link>
					</div>
					<div className="w-100 text-center mt-2">
						Login in anonymously? <Link to="/login-anonymously">Anonymously</Link>
					</div>
					<div className="w-100 text-center mt-2">
						Need an account? <Link to="/signup">Sign Up</Link>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default Login;
