import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { test, expect, vi, afterEach } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

test("adding products updates the cart count and total", async () => {
  const mockProduct = {
    id: 1,
    title: "Test Shirt",
    price: 19.99,
    image: "/shirt.jpg",
  };

  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockProduct],
    })
  );

  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <App />
    </MemoryRouter>
  );

  // Wait for the product to load
  await screen.findByText("Test Shirt");

  // Increase quantity from 1 to 2
  await user.click(screen.getByRole("button", { name: "+" }));

  // Add the products to the cart
  await user.click(
    screen.getByRole("button", { name: "Add to Cart" })
  );

  // Verify the navbar count
  expect(
    screen.getByRole("link", { name: "Cart (2)" })
  ).toBeInTheDocument();

  // Navigate to the cart
  await user.click(
    screen.getByRole("link", { name: "Cart (2)" })
  );

  // Verify the cart total
  expect(
    screen.getByText("Total: $39.98")
  ).toBeInTheDocument();
});

test("updating and removing items changes the cart", async () => {
  const mockProduct = {
    id: 1,
    title: "Test Shirt",
    price: 19.99,
    image: "/shirt.jpg",
  };

  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockProduct],
    })
  );

  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <App />
    </MemoryRouter>
  );

  // Wait for the product to load
  await screen.findByText("Test Shirt");

  // Add 2 shirts
  await user.click(screen.getByRole("button", { name: "+" }));
  await user.click(screen.getByRole("button", { name: "Add to Cart" }));

  // Navigate to cart
  await user.click(screen.getByRole("link", { name: "Cart (2)" }));

  // Increase quantity to 3
  await user.click(
    screen.getByRole("button", {
      name: "Increase Test Shirt quantity",
    })
  );

  expect(screen.getByText("Total: $59.97")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Cart (3)" })).toBeInTheDocument();

  // Decrease quantity to 2
  await user.click(
    screen.getByRole("button", {
      name: "Decrease Test Shirt quantity",
    })
  );

  expect(screen.getByText("Total: $39.98")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Cart (2)" })).toBeInTheDocument();

  // Remove the product
  await user.click(screen.getByRole("button", { name: "Remove" }));

  expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Cart (0)" })).toBeInTheDocument();
});

test("merges duplicate products and removes items at zero quantity", async () => {
  const mockProduct = {
    id: 1,
    title: "Test Shirt",
    price: 19.99,
    image: "/shirt.jpg",
  };

  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [mockProduct],
    })
  );

  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/shop"]}>
      <App />
    </MemoryRouter>
  );

  await screen.findByText("Test Shirt");

  // Add the same product twice
  const addButton = screen.getByRole("button", {
    name: "Add to Cart",
  });

  await user.click(addButton);
  await user.click(addButton);

  expect(
    screen.getByRole("link", { name: "Cart (2)" })
  ).toBeInTheDocument();

  // Navigate to cart
  await user.click(
    screen.getByRole("link", { name: "Cart (2)" })
  );

  // Confirm the product appears only once
  expect(screen.getAllByText("Test Shirt")).toHaveLength(1);
  expect(screen.getByText("Total: $39.98")).toBeInTheDocument();

  // Decrease quantity from 2 to 1
  const decreaseButton = screen.getByRole("button", {
    name: "Decrease Test Shirt quantity",
  });

  await user.click(decreaseButton);

  expect(screen.getByText("Total: $19.99")).toBeInTheDocument();

  // Decrease from 1 to 0, removing the product
  await user.click(decreaseButton);

  expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  expect(
    screen.getByRole("link", { name: "Cart (0)" })
  ).toBeInTheDocument();
});