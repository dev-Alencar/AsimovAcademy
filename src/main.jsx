import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './parte-1/App.jsx'
import App2 from './parte-2/App2.jsx'

function MainContainer() {
  const [active, setActive] = useState(null)

  if (active === 'app1') {
    return (
      <div>
        <button onClick={() => setActive(null)} style={{ position: 'fixed', top: '20px', left: '20px', padding: '10px 20px', background: '#00E676', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', zIndex: 1000 }}>
          ← Voltar
        </button>
        <App />
      </div>
    )
  }

  if (active === 'app2') {
    return (
      <div>
        <button onClick={() => setActive(null)} style={{ position: 'fixed', top: '20px', left: '20px', padding: '10px 20px', background: '#00E676', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', zIndex: 1000 }}>
          ← Voltar
        </button>
        <App2 />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '20px', background: '#06080C' }}>
      <h1 style={{ color: '#F0F4FF', fontSize: '40px' }}>Escolha uma página:</h1>
      <button onClick={() => setActive('app1')} style={{ padding: '15px 40px', fontSize: '18px', background: '#00E676', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        Abrir App.jsx
      </button>
      <button onClick={() => setActive('app2')} style={{ padding: '15px 40px', fontSize: '18px', background: '#00E676', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
        Abrir App2.jsx
      </button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainContainer />
  </React.StrictMode>,
)