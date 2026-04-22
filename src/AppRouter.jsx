import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import App from './parte-1/App.jsx';
import App2 from './parte-2/App2.jsx';

const Home = () => {
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
    .home-container {
      min-height: 100vh;
      width: 100%;
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 20px;
      background: #06080C;
      color: #F0F4FF;
      font-family: 'DM Sans', sans-serif;
    }

    .home-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(32px, 8vw, 60px);
      font-weight: 700;
      line-height: 1.05;
      color: #F0F4FF;
      margin: 0;
      text-align: center;
    }

    .home-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      max-width: 520px;
    }

    .home-link {
      flex: 1 1 180px;
      padding: 14px 24px;
      background: #00E676;
      color: #060A08;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 700;
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s ease, opacity 0.2s ease;
      min-width: 120px;
    }

    .home-link:hover {
      transform: translateY(-1px);
      opacity: 0.95;
    }

    @media (max-width: 600px) {
      .home-container { padding: 30px 18px; }
      .home-actions { flex-direction: column; gap: 12px; }
      .home-link { width: 100%; }
    }
  `;

  return (
  <div className="home-container">
    <style>{styles}</style>
    <h1 className="home-title">Escolha uma página:</h1>
    <div className="home-actions">
      <Link to="/app1" className="home-link">App.jsx</Link>
      <Link to="/app2" className="home-link">App2.jsx</Link>
    </div>
  </div>
  );
};

export default function AppRouter() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/app1" element={<App />} />
        <Route path="/app2" element={<App2 />} />
      </Routes>
    </BrowserRouter>
  );
}
