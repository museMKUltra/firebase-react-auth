import { useState } from "react";
import { Alert, Button, Card, Row } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useHistory } from "react-router-dom";

function Profile(props) {
	const [errorMessage, setErrorMessage] = useState("");
	const history = useHistory();
	const { logout, currentUser } = useAuth();

	async function handleLogOut(e) {
		e.preventDefault();

		try {
			setErrorMessage("");
			await logout();
			history.push("/login");
		} catch (e) {
			setErrorMessage(e.message);
		}
	}

	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Profile</h2>
				{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
				<p className="text-center">
					<strong>Email: </strong>
					{currentUser.email}
				</p>
				<div className="text-center mt-4">
					<Link to="/update-profile">Update Profile</Link>
				</div>
				<div className="w-100 text-center mt-4">
					<Button variant="outline-secondary" size="sm" onClick={handleLogOut}>
						Log Out
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}

export default Profile;
