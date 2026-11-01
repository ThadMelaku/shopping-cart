import { Link } from "react-router";

export default function Home() {
  return (
    <main className="home">
      <h1>Welcome to Shopping Cart</h1>

      <p>
        Browse our collection of clothing, electronics,
        jewelry, and more.
      </p>

      <p>
        This is a demo storefront built with React
        as part of The Odin Project.
      </p>

      <Link to="/shop" className="shop-now">
        Shop Now
      </Link>
    </main>
  );
}