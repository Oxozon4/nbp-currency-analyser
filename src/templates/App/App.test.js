import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app container", () => {
  render(<App />);
  const appElement = screen.queryByTestId("loader-element");
  expect(appElement).toBeInTheDocument();
});
