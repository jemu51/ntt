import { render, screen, within } from "@testing-library/react";

import { Main } from "./Main";

describe("Main template", () => {
  describe("Render method", () => {
    it("should have 3 menu items", () => {
      render(<Main meta={null}>{null}</Main>);

      const menuItemList = screen.getAllByRole("listitem");

      expect(menuItemList).toHaveLength(4);
    });

    it("should have a link to support creativedesignsguru.com", () => {
      render(<Main meta={null}>{null}</Main>);

      const copyrightSection = screen.getByText(/© Copyright/);
      const copyrightLink = within(copyrightSection).getByRole("link");

      expect(copyrightLink).toHaveAttribute(
        "href",
        "https://github.com/jemu51/tution-live-web"
      );
    });
  });
});
