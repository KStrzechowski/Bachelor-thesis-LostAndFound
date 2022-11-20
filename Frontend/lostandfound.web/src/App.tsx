import React from "react";
import { testType } from "commons";

import "./main.scss";

function App() {
	let ty: testType = new testType();

	return (
		<div className="App p-2 bg-light">
			<div className="p-2 m-4 mt-0 bg-primary border">primary</div>
			<div className="p-2 m-4 bg-secondary">secondary</div>
			<div className="p-2 m-4 bg-success">success</div>
			<div className="p-2 m-4 bg-info">info</div>
			<div className="p-2 m-4 bg-warning">warning</div>
			<div className="p-2 m-4 bg-danger">danger</div>
			<div className="p-2 m-4 bg-light">light</div>
			<div className="p-2 m-4 bg-dark text-light">dark</div>
			<div className="p-2 m-4 bg-acc">accent</div>
		</div>
	);
}

export default App;
