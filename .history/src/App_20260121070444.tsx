import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { PairingGuide } from './pages/PairingGuide';
import { FloatingCart } from './components/FloatingCart';
import type { Cereal } from './data/mockData';

interface CartItem {
  cereal: Cereal;
  quantity: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'pairing'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (cereal: Cereal) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.cereal.id === cereal.id);
      if (existing) {
        return prev.map(item =>
          item.cereal.id === cereal.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { cereal, quantity: 1 }];
    });
  };

  const removeFromCart = (cerealId: string) => {
    setCartItems(prev => prev.filter(item => item.cereal.id !== cerealId));
  };

  const handleCheckout = () => {
    alert('🎉 Thanks for pretending to buy cereal! This is a portfolio project. No actual transaction will occur. But your taste in nostalgia is impeccable!');
    setCartItems([]);
  };

  return (
    <div className="bg-void min-h-screen text-cream font-body selection:bg-slime selection:text-black">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>
        {currentPage === 'home' && <Home onAddToCart={addToCart} />}
        {currentPage === 'pairing' && <PairingGuide />}
      </main>
      <FloatingCart 
        items={cartItems}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
