
import { CartProvider } from '@/src/context/CartContext';

function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default App;
