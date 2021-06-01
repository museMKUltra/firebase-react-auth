import React, { Component } from "react";
import { Badge, Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";
import Title from "./Title.js";
import StartedButton from "./StartedButton.js";
import moment from "moment";

function formattedTime(milliSecs) {
	if (!isNaN(milliSecs) || milliSecs >= 0) {
		return moment(milliSecs, "x").format("mm:ss:SS");
	}
	return "";
}

let timer = null;

class StopWatchClass extends Component {
	state = {
		milliSeconds: 0,
		isStarted: false,
		records: [],
	};
	recordsListRef = React.createRef();

	componentDidMount() {
		if (this.state.isStarted) {
			timer = setInterval(() => {
				this.setState({
					...this.state,
					milliSeconds: this.state.milliSeconds + 10,
				});
			}, 10);
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.state.isStarted !== prevState.isStarted) {
			if (this.state.isStarted) {
				timer = setInterval(() => {
					this.setState({
						...this.state,
						milliSeconds: this.state.milliSeconds + 10,
					});
				}, 10);
			} else {
				clearInterval(timer);
			}
		}
		this.recordsListRef.current.scrollTop = this.recordsListRef.current?.scrollHeight ?? 0;
	}

	componentWillUnmount() {
		clearInterval(timer);
	}

	handleStarted() {
		this.setState({
			...this.state,
			isStarted: !this.state.isStarted,
		});
	}

	handleReset() {
		this.setState({
			...this.state,
			isStarted: false,
			records: [],
		});
		process.nextTick(() => {
			this.setState({
				...this.state,
				milliSeconds: 0,
			});
		});
	}

	handleRecord() {
		this.setState({
			...this.state,
			records: [
				...this.state.records,
				{
					milliSeconds: this.state.milliSeconds,
					milliSecsDiff: this.state.records.length === 0 ? 0 : this.state.milliSeconds - this.state.records[0].milliSeconds,
				},
			],
		});
	}

	render() {
		const time = formattedTime(this.state.milliSeconds);
		const isTimeZero = this.state.milliSeconds === 0;
		const startedText = this.state.isStarted ? "pause" : "start";
		const listItems = this.state.records.map((record, index) => (
			<ListGroup.Item key={`${record}-${index}`} className="d-flex justify-content-between align-items-center">
				<span>{formattedTime(record.milliSeconds)}</span>
				<div className="d-flex align-items-center">
					<span className="text-secondary mr-2">{`+${formattedTime(record.milliSecsDiff)}`}</span>
					<Badge variant="secondary">{index + 1}</Badge>
				</div>
			</ListGroup.Item>
		));

		return (
			<Card>
				<Card.Body>
					<Title title="Stop Watch"></Title>
					<div className="d-flex align-items-center my-4">
						<div className="text-center ml-4">
							<span>{time}</span>
						</div>
						<div className="ml-auto">
							<ButtonGroup>
								<StartedButton startedText={startedText} handleStarted={() => this.handleStarted()} />
								<Button variant="outline-primary" disabled={isTimeZero} onClick={() => this.handleRecord()}>
									record
								</Button>
							</ButtonGroup>
							<Button variant="link" disabled={isTimeZero} onClick={() => this.handleReset()}>
								reset
							</Button>
						</div>
					</div>
					<ListGroup style={{ height: "200px", overflow: "scroll" }} ref={this.recordsListRef}>
						{listItems}
					</ListGroup>
				</Card.Body>
			</Card>
		);
	}
}

export default StopWatchClass;
