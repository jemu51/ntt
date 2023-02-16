import { render, screen } from "@testing-library/react";

import About from "@/pages/about";

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe("About page", () => {
  describe("Render method", () => {
    it("should have text `Collaborative Board`", () => {
      render(<About />);

      const paragraph = screen.getByText(/Collaborative Board/);

      expect(paragraph).toBeInTheDocument();
    });
  });
});
