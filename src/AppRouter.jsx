import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './parte-1/App.jsx';
import App2 from './parte-2/App2.jsx';

const Home = () => {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
  `;

  return (
  <div style={{
    height: '100vh',
    background: '#06080C',
    color: '#F0F4FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'DM Sans', sans-serif",
    flexDirection: 'column',
    gap: '20px',
  }}>
    <style>{styles}</style>
    <h1 style={{
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: 60,
      fontWeight: 700,
      lineHeight: 1.1,
      color: '#F0F4FF',
      margin: 0,
    }}>Escolha uma página:</h1>
    <div style={{ display: 'flex', gap: '16px' }}>
      <Link to="/app1" style={{
        padding: '12px 24px',
        background: '#00E676',
        color: '#060A08',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        App.jsx
      </Link>
      <Link to="/app2" style={{
        padding: '12px 24px',
        background: '#00E676',
        color: '#060A08',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer'
      }}>
        App2.jsx
      </Link>
    </div>
  </div>
  );
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app1" element={<App />} />
        <Route path="/app2" element={<App2 />} />
      </Routes>
    </BrowserRouter>
  );
}
