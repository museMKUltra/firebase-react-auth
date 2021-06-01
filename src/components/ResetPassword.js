import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

function ResetPassword(props) {
	const emailRef = useRef();

	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { resetPassword } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setIsLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("Check your inbox for further instruction.");
		} catch (e) {
			setError(e.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Reset Password</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				{message && <Alert variant="success">{message}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="mail" ref={emailRef}></Form.Control>
					</Form.Group>
					<Button variant="primary" disabled={isLoading} className="w-100 mt-3" type="submit">
						Reset Password
					</Button>
					<div className="w-100 text-center mt-3">
						<Link to="/login">Cancel</Link>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default ResetPassword;
