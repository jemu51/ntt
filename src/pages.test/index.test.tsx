import { render, screen } from "@testing-library/react";

import Index from "@/pages/index";

// The easiest solution to mock `next/router`: https://github.com/vercel/next.js/issues/7479
// The mock has been moved to `__mocks__` folder to avoid duplication

describe("Index page", () => {
  describe("Render method", () => {
    it("should have a script cdn link of tw-elements", () => {
      render(<Index />);

      const twElementsCdn = screen.getByTestId("twElementsCdn");

      /*
       * PLEASE READ THIS SECTION
       * We'll really appreciate if you could have a link to our website
       * The link doesn't need to appear on every pages, one link on one page is enough.
       * Thank you for your support it'll mean a lot for us.
       */
      expect(twElementsCdn).toHaveAttribute(
        "src",
        "https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"
      );
    });
  });
});
