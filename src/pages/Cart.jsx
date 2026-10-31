import CartItem from "../components/CartItem";

export default function Cart({
  cart,
  onUpdateQuantity,
  onRemove,
}) {
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <main>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <section>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </section>

          <h2>Total: ${cartTotal.toFixed(2)}</h2>
        </>
      )}
    </main>
  );
}