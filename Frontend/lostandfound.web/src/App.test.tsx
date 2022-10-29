import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders lost and found text", () => {
	render(<App />);
	const linkElement = screen.getByText(/lost and found/i);
	expect(linkElement).toBeInTheDocument();
});
