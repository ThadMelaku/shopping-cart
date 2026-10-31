export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}) {
  return (
    <article className="cart-item">
      <img
        src={item.image}
        alt={item.title}
        width="100"
      />

      <h2>{item.title}</h2>
      <p>${item.price.toFixed(2)}</p>
      <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>

      <div className="quantity-controls">
        <button
          onClick={() => onUpdateQuantity(item.id, -1)}
          aria-label={`Decrease ${item.title} quantity`}
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => onUpdateQuantity(item.id, 1)}
          aria-label={`Increase ${item.title} quantity`}
        >
          +
        </button>
      </div>

      <button onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </article>
  );
}