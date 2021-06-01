import React, { useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

function LoginAnonymously(props) {
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { loginAnonymously } = useAuth();
	const history = useHistory();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setIsLoading(true);
			await loginAnonymously();
			history.push("/");
		} catch (e) {
			setError(e.message);
			setIsLoading(false);
		}
	}

	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Anonymously</h2>
				{error && <Alert variant="danger">{error}</Alert>}
				<Form onSubmit={handleSubmit}>
					<Button disabled={isLoading} className="w-100 mt-2" type="submit">
						Log In Anonymously
					</Button>
					<div className="w-100 text-center mt-3">
						<Link to="/login">Cancel</Link>
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}

export default LoginAnonymously;
