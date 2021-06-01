import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Badge, Button, ButtonGroup, Card, ListGroup } from "react-bootstrap";
import moment from "moment";
import StartedButton from "./StartedButton.js";
import Title from "./Title.js";
import useRecords, { RECORD_TYPES } from "../hooks/useRecords.js";
import AnotherWatch from "./AnotherWatch.js";
import { useRecordContext } from "../contexts/RecordContext.js";

const { RESET_RECORD, ADD_RECORD, DELETE_RECORD } = RECORD_TYPES;

function formattedTime(milliSecs) {
	if (!isNaN(milliSecs) || milliSecs >= 0) {
		return moment(milliSecs, "x").format("mm:ss:SS");
	}
	return "";
}

function StopWatch(props) {
	const [milliSeconds, setMilliSeconds] = useState(0);
	const time = formattedTime(milliSeconds);
	const isTimeZero = milliSeconds === 0;

	const [isStarted, setIsStarted] = useState(false);
	const startedText = isStarted ? "pause" : "start";
	const timerRef = useRef(null);

	useEffect(() => {
		if (isStarted) {
			timerRef.current = setInterval(() => {
				setMilliSeconds(prevState => prevState + 10);
			}, 10);
		}
		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [isStarted]);

	const recordsListRef = useRef();
	// const [records, dispatchRecord] = useRecords([]);
	const { records, dispatchRecord } = useRecordContext();

	const handleStarted = useCallback(() => {
		setIsStarted(prevState => !prevState);
	}, []);

	const handleReset = () => {
		setIsStarted(false);
		dispatchRecord({ type: RESET_RECORD });
		setMilliSeconds(0);
		process.nextTick(() => {
			if (!isTimeZero) {
				setMilliSeconds(0);
			}
		});
	};

	const handleRecord = () => {
		dispatchRecord({ type: ADD_RECORD, payload: { milliSeconds } });
		process.nextTick(() => {
			recordsListRef.current.scrollTop = recordsListRef.current?.scrollHeight ?? 0;
		});
	};

	const handleDelete = useCallback(
		key => {
			dispatchRecord({ type: DELETE_RECORD, payload: { key } });
		},
		[dispatchRecord]
	);

	const listItems = useMemo(() => {
		return records.map((record, index) => (
			<ListGroup.Item key={record.key} className="d-flex justify-content-between align-items-center">
				<div className="d-flex align-items-center">
					<Badge variant="secondary" className="mr-3">
						{index + 1}
					</Badge>
					<span>{formattedTime(record.milliSeconds)}</span>
				</div>
				<div className="d-flex align-items-center">
					<span className="text-secondary mr-3">{`+${formattedTime(record.milliSecsDiff)}`}</span>
					<Button variant="outline-danger" size="sm" onClick={() => handleDelete(record.key)}>
						x
					</Button>
				</div>
			</ListGroup.Item>
		));
	}, [records, handleDelete]);

	return (
		<>
			<Card>
				<Card.Body>
					<Title title="Stop Watch"></Title>
					<div className="d-flex align-items-center my-4">
						<div className="text-center ml-4">
							<span>{time}</span>
						</div>
						<div className="ml-auto">
							<ButtonGroup>
								<StartedButton startedText={startedText} handleStarted={handleStarted} />
								<Button variant="outline-primary" disabled={isTimeZero} onClick={handleRecord}>
									record
								</Button>
							</ButtonGroup>
							<Button variant="link" disabled={isTimeZero} onClick={handleReset}>
								reset
							</Button>
						</div>
					</div>
					<ListGroup style={{ height: "200px", overflow: "scroll", scrollBehavior: "smooth" }} ref={recordsListRef}>
						{listItems}
					</ListGroup>
				</Card.Body>
			</Card>
			{/*<AnotherWatch />*/}
		</>
	);
}

export default StopWatch;
