import { render } from "@testing-library/react";
import App from "../src/app/App";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test("smoke: App se renderiza sin fallar", () => {
  render(<App />);
});
