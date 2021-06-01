import React from "react";

function Title({ title }) {
	return <h2 className="text-center">{title}</h2>;
}

export default React.memo(Title);
