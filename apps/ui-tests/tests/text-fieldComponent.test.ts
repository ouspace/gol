import { test, expect, type MountOptions } from "@playwright/experimental-ct-react";
import React from "react";
import { TextField } from "../../ui/src/components/textfield/text-field";

type Mount = (jsx: React.ReactNode, options?: MountOptions) => Promise<any>;

test.describe("TextField Component", () => {

  test("renders correctly with default props", async ({ mount }: { mount: Mount }) => {
    const component = await mount(<TextField label="Username" />);
    await expect(component).toBeVisible();
    await expect(component).toContainText("Username");
  });

  test("supports user input", async ({ mount }: { mount: Mount }) => {
    const component = await mount(<TextField label="Email" />);
    const input = component.locator("input");

    await input.fill("test@example.com");
    await expect(input).toHaveValue("test@example.com");
  });

  test("applies error state correctly", async ({ mount }: { mount: Mount }) => {
    const component = await mount(
      <TextField label="Password" error={true} />
    );

    const input = component.locator("input");
    await expect(input).toHaveClass(/error/); 
  });

  test("renders with leading icon", async ({ mount }: { mount: Mount }) => {
    const component = await mount(
      <TextField label="Search" leadingIcon="search" />
    );
    await expect(component.locator(".textfield__icon--leading")).toBeVisible();
  });

  test("renders with trailing icon button", async ({ mount }: { mount: Mount }) => {
    const component = await mount(
      <TextField label="Password" trailingIcon="visibility" />
    );
    await expect(component.locator(".textfield__icon--trailing")).toBeVisible();
  });
});
