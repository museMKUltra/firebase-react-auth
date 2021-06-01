import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

function Signup(props) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { signup } = useAuth();
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			setError("Passwords do not match!");
			return;
		}

		try {
			setError("");
			setIsLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			history.push("/");
		} catch (e) {
			setError(e.message);
			setIsLoading(false);
		}
	}

	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Sign Up</h2>
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
					<Form.Group id="password-confirm">
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control type="password" ref={passwordConfirmRef}></Form.Control>
					</Form.Group>
					<Button variant="primary" disabled={isLoading} className="w-100 mt-3" type="submit">
						Sign Up
					</Button>
					<div className="w-100 text-center mt-3">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default Signup;
