import React from "react";
import StopWatchClass from "./StopWatchClass.js";
import StopWatchFunction from "./StopWatchFunction.js";
import AnotherWatch from "./AnotherWatch.js";
import { Col, Container, Row } from "react-bootstrap";

function StopWatchContainer(props) {
	return (
		<Container>
			<Row>
				<Col xs={5}>
					<StopWatchClass />
				</Col>
				<Col xs={5}>
					<StopWatchFunction />
				</Col>
				<Col xs={2}>
					<AnotherWatch />
				</Col>
				<Col xs={2}></Col>
			</Row>
		</Container>
	);
}

export default StopWatchContainer;
