import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Cart from "./Cart";



test("displays a message when the cart is empty", () => {
  render(
    <Cart
      cart={[]}
      onUpdateQuantity={() => {}}
      onRemove={() => {}}
    />
  );

  expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
});

test("displays cart items and the correct total", () => {
  const mockCart = [
    {
      id: 1,
      title: "Test Shirt",
      price: 19.99,
      quantity: 2,
      image: "/shirt.jpg",
    },
  ];

  render(
    <Cart
      cart={mockCart}
      onUpdateQuantity={() => {}}
      onRemove={() => {}}
    />
  );

  expect(screen.getByText("Test Shirt")).toBeInTheDocument();
  expect(screen.getByText("Total: $39.98")).toBeInTheDocument();
});

test("calls the correct functions when cart buttons are clicked", async () => {
  const user = userEvent.setup();
  const mockUpdateQuantity = vi.fn();
  const mockRemove = vi.fn();

  const mockCart = [
    {
      id: 1,
      title: "Test Shirt",
      price: 19.99,
      quantity: 2,
      image: "/shirt.jpg",
    },
  ];

  render(
    <Cart
      cart={mockCart}
      onUpdateQuantity={mockUpdateQuantity}
      onRemove={mockRemove}
    />
  );

  await user.click(
    screen.getByRole("button", {
      name: "Increase Test Shirt quantity",
    })
  );

  expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);

  await user.click(
    screen.getByRole("button", {
      name: "Decrease Test Shirt quantity",
    })
  );

  expect(mockUpdateQuantity).toHaveBeenCalledWith(1, -1);

  await user.click(
    screen.getByRole("button", { name: "Remove" })
  );

  expect(mockRemove).toHaveBeenCalledWith(1);
});