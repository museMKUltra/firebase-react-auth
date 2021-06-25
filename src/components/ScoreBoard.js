import React, { useEffect, useState } from "react";
import { Badge, Button, Card, ListGroup } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function ScoreBoard(props) {
	const [users, setUsers] = useState([]);
	const items = users.map(user => {
		return (
			<ListGroup.Item key={user.uuid} style={{ display: "flex", justifyContent: "space-between" }}>
				<span>{`${user.name}: ${user.score}`}</span>
				<Badge
					variant="secondary"
					style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
					onClick={() => handleDeletePoint(user.uuid)}
				>
					X
				</Badge>
			</ListGroup.Item>
		);
	});

	useEffect(() => {
		setUsers([
			{ name: "roller", score: 3, uuid: uuidv4() },
			{ name: "coaster", score: 5, uuid: uuidv4() },
		]);
	}, []);

	const handleAddPoint = () => {
		const uuid = uuidv4();
		const user = {
			name: uuid.substr(0, 5),
			score: ~~(Math.random() * 10),
			uuid,
		};
		setUsers([...users, user]);
	};

	const handleDeletePoint = uuid => {
		const remainedUser = user => user.uuid !== uuid;
		setUsers(users.filter(user => remainedUser(user)));
	};

	return (
		<Card>
			<Card.Body>
				<ListGroup style={{ width: "400px", height: "200px", overflow: "scroll" }}>{items}</ListGroup>
			</Card.Body>
			<Card.Footer className="text-right">
				<Button variant="primary" onClick={handleAddPoint}>
					add
				</Button>
			</Card.Footer>
		</Card>
	);
}

export default ScoreBoard;
