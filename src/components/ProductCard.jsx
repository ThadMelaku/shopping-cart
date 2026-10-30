import { useState } from "react";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  function incrementQuantity() {
    setQuantity((prev) => Number(prev || 0) + 1);
  }

  function decrementQuantity() {
    setQuantity((prev) => Math.max(1, Number(prev || 1) - 1));
  }

  function handleQuantityChange(e) {
    const value = e.target.value;

    if (value === "") {
      setQuantity("");
    } else {
      const number = Number(value);

      if (Number.isInteger(number) && number >= 1) {
        setQuantity(number);
      }
    }
  }

  return (
    <article className="product-card">
      <img
        src={product.image}
        alt={product.title}
        width="150"
        height="150"
      />

      <h2>{product.title}</h2>
      <p>${product.price.toFixed(2)}</p>

      <div className="quantity-controls">
        <button onClick={decrementQuantity}>-</button>

        <input
          type="number"
          min="1"
          step="1"
          aria-label={`Quantity for ${product.title}`}
          value={quantity}
          onChange={handleQuantityChange}
          onBlur={() => {
            if (quantity === "") setQuantity(1);
          }}
        />

        <button onClick={incrementQuantity}>+</button>
      </div>
    </article>
  );
}