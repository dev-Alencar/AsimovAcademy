import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #00E676;
    --green-dim: rgba(0, 230, 118, 0.15);
    --green-glow: rgba(0, 230, 118, 0.08);
    --bg: #06080C;
    --surface: rgba(255,255,255,0.03);
    --border: rgba(255,255,255,0.07);
    --border-green: rgba(0, 230, 118, 0.25);
    --text-primary: #F0F4FF;
    --text-secondary: #7C8CA3;
    --blue-glow: rgba(56, 108, 255, 0.12);
  }

  .hero {
    min-height: 100vh;
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
    padding: 80px 24px;
  }

  /* Animated grid background */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%);
  }

  /* Orb glows */
  .orb-1 {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%);
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    animation: pulse-orb 8s ease-in-out infinite;
  }

  .orb-2 {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56,108,255,0.08) 0%, transparent 70%);
    bottom: 0;
    right: 5%;
    pointer-events: none;
    animation: pulse-orb 12s ease-in-out infinite reverse;
  }

  .orb-3 {
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,230,118,0.05) 0%, transparent 70%);
    bottom: 20%;
    left: 5%;
    pointer-events: none;
    animation: pulse-orb 10s ease-in-out infinite 2s;
  }

  @keyframes pulse-orb {
    0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
    50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
  }

  /* Content */
  .content {
    position: relative;
    z-index: 10;
    max-width: 860px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  /* Badge */
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid var(--border-green);
    background: var(--green-glow);
    border-radius: 999px;
    padding: 6px 16px 6px 8px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: var(--green);
    margin-bottom: 40px;
    animation: fade-up 0.6s ease both;
    letter-spacing: 0.01em;
  }

  .badge-dot {
    width: 8px;
    height: 8px;
    background: var(--green);
    border-radius: 50%;
    animation: blink 2s ease-in-out infinite;
    flex-shrink: 0;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  /* Headline */
  .headline {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 6vw, 68px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    margin-bottom: 24px;
    animation: fade-up 0.6s ease 0.1s both;
  }

  .headline-highlight {
    color: var(--green);
    position: relative;
  }

  .headline-highlight::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--green), transparent);
    border-radius: 2px;
  }

  /* Subheadline */
  .subheadline {
    font-size: clamp(16px, 2.2vw, 20px);
    font-weight: 400;
    color: var(--text-secondary);
    line-height: 1.6;
    max-width: 600px;
    margin-bottom: 52px;
    animation: fade-up 0.6s ease 0.2s both;
  }

  /* Bullets */
  .bullets {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    width: 100%;
    max-width: 720px;
    margin-bottom: 52px;
    animation: fade-up 0.6s ease 0.3s both;
  }

  .bullet-card {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 16px 18px;
    text-align: left;
    transition: border-color 0.25s, background 0.25s;
    cursor: default;
  }

  .bullet-card:hover {
    border-color: var(--border-green);
    background: var(--green-glow);
  }

  .bullet-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--green-dim);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .bullet-icon svg {
    width: 16px;
    height: 16px;
    stroke: var(--green);
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .bullet-text {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.5;
  }

  .bullet-text strong {
    display: block;
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 2px;
  }

  /* CTAs */
  .ctas {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    animation: fade-up 0.6s ease 0.4s both;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--green);
    color: #060A08;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 500;
    padding: 14px 28px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s;
    text-decoration: none;
    letter-spacing: -0.01em;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 230, 118, 0.3);
    background: #1FFFA0;
  }

  .btn-primary:active { transform: translateY(0); }

  .btn-primary svg {
    width: 16px;
    height: 16px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--text-secondary);
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 400;
    padding: 14px 24px;
    border-radius: 10px;
    border: 1px solid var(--border);
    cursor: pointer;
    transition: color 0.18s, border-color 0.18s, background 0.18s;
    text-decoration: none;
    letter-spacing: -0.01em;
  }

  .btn-secondary:hover {
    color: var(--text-primary);
    border-color: rgba(255,255,255,0.18);
    background: rgba(255,255,255,0.04);
  }

  /* Social proof strip */
  .social-proof {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 48px;
    padding-top: 48px;
    border-top: 1px solid var(--border);
    width: 100%;
    justify-content: center;
    animation: fade-up 0.6s ease 0.5s both;
    flex-wrap: wrap;
  }

  .proof-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }

  .proof-number {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.03em;
  }

  .proof-label {
    font-size: 12px;
    color: var(--text-secondary);
    font-family: 'JetBrains Mono', monospace;
  }

  .proof-divider {
    width: 1px;
    height: 36px;
    background: var(--border);
  }

  /* Code floating element */
  .code-float {
    position: absolute;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: rgba(0, 230, 118, 0.2);
    white-space: pre;
    pointer-events: none;
    user-select: none;
    animation: float-code 20s linear infinite;
    line-height: 1.7;
  }

  .code-float-1 {
    top: 15%;
    left: 2%;
    animation-delay: 0s;
  }

  .code-float-2 {
    top: 60%;
    right: 2%;
    animation-delay: -10s;
    color: rgba(56, 108, 255, 0.15);
  }

  @keyframes float-code {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-20px); }
  }

  @keyframes fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Responsive */
  @media (max-width: 640px) {
    .bullets { grid-template-columns: 1fr; }
    .ctas { flex-direction: column; width: 100%; }
    .btn-primary, .btn-secondary { width: 100%; justify-content: center; }
    .code-float { display: none; }
    .proof-divider:nth-child(4) { display: none; }
    .social-proof { gap: 16px; }
  }
`;

const bulletIcons = [
  <svg key="0" viewBox="0 0 24 24"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-6"/></svg>,
  <svg key="1" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  <svg key="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  <svg key="3" viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
];

const buttonStyles = {
  primary: {
    padding: '14px 28px',
    background: 'var(--green)',
    color: '#060A08',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 500,
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  },
  secondary: {
    padding: '14px 24px',
    background: 'transparent',
    color: 'var(--text-secondary)',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 15,
    fontWeight: 400,
    textDecoration: 'none',
    letterSpacing: '-0.01em',
  },
};

const bullets = [
  {
    icon: bulletIcons[0],
    title: "+40h de conteúdo",
    desc: "Direto ao ponto, sem enrolação"
  },
  {
    icon: bulletIcons[1],
    title: "Projetos com IA desde o módulo 1",
    desc: "Python aplicado na prática real"
  },
  {
    icon: bulletIcons[2],
    title: "+20.000 alunos",
    desc: "Comunidade ativa para tirar dúvidas"
  },
  {
    icon: bulletIcons[3],
    title: "Certificado reconhecido",
    desc: "Valorizado pelo mercado de tecnologia"
  }
];

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <style>{styles}</style>
      <section className="hero">
        {/* Background layers */}
        <div className="grid-bg" />
        <div className="orb-1" />
        <div className="orb-2" />
        <div className="orb-3" />

        {/* Floating code snippets */}
        <pre className="code-float code-float-1">{`import anthropic\nfrom sklearn import *\n\nmodel = build_agent(\n  tools=[search, code]\n)`}</pre>
        <pre className="code-float code-float-2">{`df = pd.read_csv(data)\nresult = model.predict(X)\nprint(f"Acc: {score:.2f}")`}</pre>

        {/* Main content */}
        <div className="content">
          <div className="badge">
            <span className="badge-dot" />
            Vagas abertas — turma 2025
          </div>

          <h1 className="headline">
            Aprenda{" "}
            <span className="headline-highlight">Python</span>
            {" "}do zero e construa<br />
            projetos reais com{" "}
            <span className="headline-highlight">IA</span>
          </h1>

          <p className="subheadline">
            O curso mais prático do Brasil para quem quer entrar
            em tecnologia sem enrolação.
          </p>

          <div className="bullets">
            {bullets.map((b, i) => (
              <div className="bullet-card" key={i}>
                <div className="bullet-icon">{b.icon}</div>
                <div className="bullet-text">
                  <strong>{b.title}</strong>
                  {b.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="ctas">
            <a href="#enroll" className="btn-primary">
              Quero começar agora
              <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <a href="#curriculum" className="btn-secondary">
              Ver o que vou aprender
            </a>
          </div>

          <div className="social-proof">
            <div className="proof-item">
              <span className="proof-number">20k+</span>
              <span className="proof-label">alunos ativos</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-number">40h+</span>
              <span className="proof-label">de conteúdo</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-number">4.9★</span>
              <span className="proof-label">avaliação média</span>
            </div>
            <div className="proof-divider" />
            <div className="proof-item">
              <span className="proof-number">7 dias</span>
              <span className="proof-label">garantia total</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}