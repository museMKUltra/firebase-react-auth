import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

function UpdateProfile(props) {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { currentUser, updateEmail, updatePassword } = useAuth();
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const passwordConfirm = passwordConfirmRef.current.value;

		const isPasswordDiff = password !== passwordConfirm;
		if (isPasswordDiff) {
			setError("Passwords do not match!");
			return;
		}

		try {
			const isEmailChanged = email !== currentUser.email;
			const emailPromise = isEmailChanged ? [updateEmail(email)] : [];
			const passwordPromise = password ? [updatePassword(password)] : [];
			const promises = [...emailPromise, ...passwordPromise];

			setError("");
			setIsLoading(true);
			await Promise.all(promises);
			history.push("/");
		} catch (e) {
			setError(e.message);
			setIsLoading(false);
		}
	}

	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Update Profile</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="mail" ref={emailRef} required defaultValue={currentUser.email}></Form.Control>
					</Form.Group>
					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} placeholder="leave blank to keep the same"></Form.Control>
					</Form.Group>
					<Form.Group id="password-confirm">
						<Form.Label>Password Confirmation</Form.Label>
						<Form.Control type="password" ref={passwordConfirmRef} placeholder="leave blank to keep the same"></Form.Control>
					</Form.Group>
					<Button variant="primary" disabled={isLoading} className="w-100 mt-3" type="submit">
						Update Profile
					</Button>
					<div className="w-100 text-center mt-3">
						<Link to="/">Cancel</Link>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default UpdateProfile;
