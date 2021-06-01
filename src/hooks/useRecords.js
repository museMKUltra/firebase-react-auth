import { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export const RECORD_TYPES = {
	ADD_RECORD: "add-record",
	DELETE_RECORD: "delete-record",
	RESET_RECORD: "reset-record",
};

function getFirstRecord(record) {
	return { ...record, milliSecsDiff: 0 };
}

function getRestRecord(first, record) {
	return { ...record, milliSecsDiff: record.milliSeconds - first.milliSeconds };
}

function calculatedDiffRecords(records) {
	if (records.length === 0) return [];

	const firstRecord = getFirstRecord(records[0]);
	return records.map((record, index) => (index === 0 ? firstRecord : getRestRecord(firstRecord, record)));
}

function addedRecords(records, { milliSeconds }) {
	const newRecord = { key: uuidv4(), milliSeconds };
	return calculatedDiffRecords([...records, newRecord]);
}

function deletedRecords(records, { key }) {
	const isSaved = record => record.key !== key;
	return calculatedDiffRecords(records.filter(record => isSaved(record)));
}

function reducer(state, { payload, type }) {
	switch (type) {
		case RECORD_TYPES.ADD_RECORD:
			return addedRecords(state, payload);
		case RECORD_TYPES.DELETE_RECORD:
			return deletedRecords(state, payload);
		case RECORD_TYPES.RESET_RECORD:
		default:
			return [];
	}
}

export default function useRecords(initializerArg) {
	return useReducer(reducer, initializerArg);
}
