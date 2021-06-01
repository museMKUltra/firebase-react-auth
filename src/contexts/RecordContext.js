import React, { useContext } from "react";
import useRecords from "../hooks/useRecords.js";

const RecordContext = React.createContext();

export function useRecordContext() {
	return useContext(RecordContext);
}

const RecordProvider = ({ children }) => {
	const [records, dispatchRecord] = useRecords([]);
	const value = {
		records,
		dispatchRecord,
	};

	return <RecordContext.Provider value={value}>{children}</RecordContext.Provider>;
};

export default RecordProvider;
