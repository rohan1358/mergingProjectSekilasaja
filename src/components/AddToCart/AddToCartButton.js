import React from "react";

// Custom components
import Button from "../Button";
import data from "../../data/bookData";

export default function AddToCartButton(props) {
  // Add to Cart Feature
  const { products } = data;
  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        // cartItems.map((x) =>
        //   x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        // )
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };
  return (
    <div>
      <Button onClick={() => onAdd(product)} round>
        Masukkan ke keranjang
      </Button>
    </div>
  );
}
