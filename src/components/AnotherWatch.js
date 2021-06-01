import React from "react";
import useRecords, { RECORD_TYPES } from "../hooks/useRecords.js";
import { Button } from "react-bootstrap";
import { useRecordContext } from "../contexts/RecordContext.js";

function AnotherWatch(props) {
	// const [records, dispatchRecord] = useRecords([]);
	const { records, dispatchRecord } = useRecordContext();

	const elements = records.map(record => (
		<div key={record.key}>
			<span className="pr-2">{record.milliSeconds}</span>
			<Button variant="outline-danger" onClick={() => dispatchRecord({ type: RECORD_TYPES.DELETE_RECORD, payload: { key: record.key } })}>
				x
			</Button>
		</div>
	));

	return (
		<>
			<Button onClick={() => dispatchRecord({ type: RECORD_TYPES.ADD_RECORD, payload: { milliSeconds: ~~(Math.random() * 100) } })}>
				add
			</Button>
			{elements}
		</>
	);
}

export default AnotherWatch;
