import React from "react";
import { Button } from "react-bootstrap";

function StartedButton({ startedText, handleStarted }) {
	return (
		<Button variant="outline-primary" onClick={handleStarted}>
			{startedText}
		</Button>
	);
}

export default React.memo(StartedButton);
