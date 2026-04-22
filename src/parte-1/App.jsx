import { useState } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { background: #F3F3F3; scroll-behavior: smooth; }
  a { text-decoration: none; color: inherit; }

  .w-wrapper { padding-left: 60px; padding-right: 60px; }
  .service-card { padding: 50px 50px 40px; }

  .nav-link:hover { text-decoration: underline; }
  .nav-btn:hover { background: #191A23 !important; color: #fff !important; }
  .cta-btn-dark:hover { opacity: 0.85; }
  .learn-more-row:hover .arrow-text { text-decoration: underline; }
  .accordion-item { transition: background 0.2s; }
  .team-card:hover { transform: translateY(-4px); transition: transform 0.2s; }
  .send-btn:hover { opacity: 0.85; }

  @media (max-width: 900px) {
    .w-wrapper { padding-left: 40px; padding-right: 40px; }
    .nav-links  { display: none !important; }
    .nav-btn    { display: none !important; }
    .hero-grid  { flex-direction: column !important; }
    .hero-illus { display: none !important; }
    .hero-h1    { font-size: 38px !important; }
    .logos-row  { flex-wrap: wrap !important; gap: 16px 28px !important; justify-content: center !important; }
    .svc-grid   { grid-template-columns: 1fr !important; }
    .cta-grid   { flex-direction: column !important; padding: 48px 36px !important; }
    .cta-illus  { display: none !important; }
    .cases-row  { flex-direction: column !important; gap: 40px !important; }
    .cases-div  { display: none !important; }
    .cases-col  { padding: 0 !important; }
    .process-row { flex-direction: column !important; }
    .team-grid  { grid-template-columns: 1fr 1fr !important; }
    .contact-grid { flex-direction: column !important; }
    .contact-illus { display: none !important; }
    .footer-row { flex-direction: column !important; gap: 40px !important; }
    .footer-links { flex-wrap: wrap !important; gap: 16px 28px !important; justify-content: center !important; }
  }

  @media (max-width: 480px) {
    .w-wrapper { padding-left: 20px; padding-right: 20px; }
    .hero-h1 { font-size: 28px !important; }
    .logos-row span { font-size: 18px !important; }
    .service-card { padding: 30px 30px 20px !important; }
    .svc-grid { gap: 20px !important; }
    .cta-grid { padding: 32px 20px !important; }
    .cases-row { gap: 20px !important; }
    .team-grid { grid-template-columns: 1fr !important; }
  }
`;

/* Color & Font Constants */
const T = {
  bg:    "#F3F3F3",
  black: "#191A23",
  green: "#B9FF66",
  white: "#FFFFFF",
  f:     "'Space Grotesk', sans-serif",
};

/* Reusable Style Objects */
const S = {
  container: (style = {}) => ({ maxWidth: 1280, margin: "0 auto", ...style }),
  btn: (bg = T.black, color = T.white) => ({
    fontFamily: T.f,
    fontSize: 20,
    fontWeight: 500,
    background: bg,
    color: color,
    border: "none",
    borderRadius: 14,
    padding: "20px 35px",
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
  }),
  heading1: { fontFamily: T.f, fontSize: 60, fontWeight: 700, color: T.black, lineHeight: 1.1 },
  heading2: { fontFamily: T.f, fontSize: 30, fontWeight: 700, color: T.black, lineHeight: 1.25 },
  heading3: { fontFamily: T.f, fontSize: 28, fontWeight: 600, color: T.black },
  text: { fontFamily: T.f, fontSize: 18, color: T.black, lineHeight: "28px" },
  textSmall: { fontFamily: T.f, fontSize: 16, color: T.black },
  textWhite: { fontFamily: T.f, fontSize: 18, color: T.white, lineHeight: "28px" },
};

const W = ({ children, style = {} }) => (
  <div className="w-wrapper" style={{ ...S.container(), ...style }}>
    {children}
  </div>
);

const Pill = ({ children }) => (
  <span style={{
    background: T.green, color: T.black,
    fontFamily: T.f, fontSize: 20, fontWeight: 500,
    borderRadius: 7, padding: "8px 14px",
    whiteSpace: "nowrap", display: "inline-block",
  }}>{children}</span>
);

const ArrowCircle = ({ color = T.black, size = 41 }) => (
  <svg width={size} height={size} viewBox="0 0 41 41" fill="none">
    <circle cx="20.5" cy="20.5" r="20" stroke={color} strokeWidth="1.2"/>
    <path d="M10 20.5H31" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M23.5 13.5L31 20.5L23.5 27.5" stroke={color} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─── NAVBAR ─── */
function Navbar() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "auto" });
  };

  const links = [
    { label: "About us",  id: "about" },
    { label: "Services",  id: "services" },
    { label: "Use Cases", id: "case-studies" },
    { label: "Pricing",   id: "contact" },
    { label: "Blog",      id: "team" },
  ];

  return (
    <W style={{ paddingTop: 28, paddingBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill={T.black}/>
          <path d="M18 7L21 15H29L23 20L25.5 28L18 23L10.5 28L13 20L7 15H15Z" fill={T.white}/>
        </svg>
        <span style={{ fontFamily: T.f, fontSize: 20, fontWeight: 700, color: T.black }}>Positivus</span>
      </div>

      <nav className="nav-links" style={{ display: "flex", gap: 40 }}>
        {links.map(l => (
          <a key={l.label} href={`#${l.id}`}
             className="nav-link"
             onClick={(e) => { e.preventDefault(); scrollTo(l.id); }}
             style={{ fontFamily: T.f, fontSize: 20, color: T.black, cursor: "pointer" }}>
            {l.label}
          </a>
        ))}
      </nav>

      <button className="nav-btn" onClick={() => scrollTo("contact")} style={{
        fontFamily: T.f, fontSize: 20, color: T.black,
        background: "transparent", cursor: "pointer",
        border: `1.5px solid ${T.black}`, borderRadius: 14,
        padding: "16px 35px", transition: "background 0.2s, color 0.2s",
      }}>Request a quote</button>
    </W>
  );
}

/* ─── HERO ILLUSTRATION ─── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 620 520" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", maxWidth: 600 }}>
      <path d="M270 180 L468 136 L468 355 L270 310Z" fill={T.white} stroke={T.black} strokeWidth="2.5"/>
      <circle cx="248" cy="243" r="80" fill={T.white} stroke={T.black} strokeWidth="2.5"/>
      <rect x="163" y="246" width="30" height="100" rx="15" fill={T.black}/>
      <path d="M476 162 C512 180 530 212 532 244" stroke={T.black} strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      <path d="M476 188 C520 214 542 250 544 290" stroke={T.black} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M476 214 C525 245 550 286 552 334" stroke={T.black} strokeWidth="3.4" strokeLinecap="round" fill="none"/>
      <path d="M466 72 Q510 72 510 116 Q510 152 466 176 Q422 152 422 116 Q422 72 466 72Z" fill={T.black}/>
      <circle cx="466" cy="113" r="16" fill={T.white}/>
      <circle cx="312" cy="88" r="16" fill={T.black}/>
      <circle cx="290" cy="132" r="27" fill={T.green} stroke={T.black} strokeWidth="1.5"/>
      <circle cx="278" cy="140" r="5" fill={T.black}/>
      <circle cx="302" cy="140" r="5" fill={T.black}/>
      <circle cx="290" cy="120" r="5" fill={T.black}/>
      <line x1="278" y1="140" x2="290" y2="120" stroke={T.black} strokeWidth="1.5"/>
      <line x1="302" y1="140" x2="290" y2="120" stroke={T.black} strokeWidth="1.5"/>
      <circle cx="348" cy="172" r="25" fill={T.black}/>
      <path d="M340 164 L364 172 L340 180Z" fill={T.white}/>
      <circle cx="396" cy="120" r="22" fill={T.green} stroke={T.black} strokeWidth="1.5"/>
      <path d="M388 118 Q388 111 394 111 Q396 111 396 114 Q396 111 402 111 Q408 111 408 118 Q408 124 396 132 Q384 124 388 118Z" fill={T.black}/>
      <path d="M208 408 L212 422 L226 422 L216 431 L220 445 L208 437 L196 445 L200 431 L190 422 L204 422Z" fill={T.black}/>
      <path d="M516 392 L519 402 L529 402 L521 408 L524 418 L516 412 L508 418 L511 408 L503 402 L513 402Z" fill={T.black}/>
      <circle cx="552" cy="322" r="15" fill={T.black}/>
      <circle cx="164" cy="338" r="11" fill={T.black}/>
    </svg>
  );
}

/* ─── HERO ─── */
function Hero() {
  const logos = ["amazon", "dribbble", "HubSpot", "Notion", "NETFLIX", "zoom"];
  return (
    <W id="about" style={{ paddingTop: 60, paddingBottom: 80 }}>
      <div className="hero-grid" style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 70 }}>
        <div style={{ flex: "0 0 531px" }}>
          <h1 className="hero-h1" style={{
            ...S.heading1,
            marginBottom: 35,
          }}>
            Navigating the digital landscape for success
          </h1>
          <p style={{
            ...S.text,
            marginBottom: 35,
          }}>
            Our digital marketing agency helps businesses grow and succeed online through
            a range of services including SEO, PPC, social media marketing, and content creation.
          </p>
          <button className="cta-btn-dark" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "auto" })} style={{
            ...S.btn(),
          }}>Book a consultation</button>
        </div>
        <div className="hero-illus" style={{ flex: 1 }}>
          <HeroIllustration />
        </div>
      </div>

      <div className="logos-row" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderTop: `1px solid ${T.black}`, borderBottom: `1px solid ${T.black}`,
        padding: "28px 0",
      }}>
        {logos.map(l => (
          <span key={l} style={{
            fontFamily: T.f, fontSize: 26, fontWeight: 600,
            color: T.black, letterSpacing: l === "NETFLIX" ? 2 : 0,
          }}>{l}</span>
        ))}
      </div>
    </W>
  );
}

/* Service Icons Object */
const ServiceIcons = {
  SEO: (c) => (
    <svg width="190" height="155" viewBox="0 0 190 155" fill="none">
      <circle cx="75" cy="70" r="52" stroke={c} strokeWidth="2.5" fill="none"/>
      <line x1="113" y1="109" x2="162" y2="150" stroke={c} strokeWidth="8" strokeLinecap="round"/>
      <rect x="48" y="54" width="54" height="8" rx="4" fill={c}/>
      <rect x="48" y="70" width="38" height="7" rx="3.5" fill={c} opacity="0.5"/>
      <rect x="48" y="86" width="46" height="7" rx="3.5" fill={c} opacity="0.5"/>
    </svg>
  ),
  PPC: (c) => (
    <svg width="190" height="155" viewBox="0 0 190 155" fill="none">
      <rect x="12" y="15" width="162" height="125" rx="12" stroke={c} strokeWidth="2" fill="none"/>
      <rect x="12" y="15" width="162" height="34" rx="12" fill={c}/>
      <rect x="12" y="33" width="162" height="16" fill={c}/>
      <circle cx="34" cy="33" r="7" fill={T.white} opacity="0.5"/>
      <circle cx="54" cy="33" r="7" fill={T.white} opacity="0.5"/>
      <circle cx="74" cy="33" r="7" fill={T.white} opacity="0.5"/>
      <path d="M98 92 L116 136 L131 112 L151 128 L134 80Z" fill={c}/>
    </svg>
  ),
  Social: (c) => (
    <svg width="190" height="155" viewBox="0 0 190 155" fill="none">
      <rect x="12" y="10" width="162" height="132" rx="12" stroke={c} strokeWidth="2" fill="none"/>
      <rect x="12" y="10" width="162" height="34" rx="12" fill={c}/>
      <rect x="12" y="28" width="162" height="16" fill={c}/>
      <path d="M42 90 Q42 72 56 72 Q62 72 66 78 Q70 72 76 72 Q90 72 90 90 Q90 104 66 118 Q42 104 42 90Z" fill={c}/>
      <path d="M110 80 L114 92 L126 92 L117 100 L120 112 L110 105 L100 112 L103 100 L94 92 L106 92Z" fill={c} opacity="0.7"/>
      <path d="M138 100 Q138 92 144 92 Q146 92 148 95 Q150 92 152 92 Q158 92 158 100 Q158 107 148 113 Q138 107 138 100Z" fill={c} opacity="0.5"/>
    </svg>
  ),
  Email: (c) => (
    <svg width="190" height="155" viewBox="0 0 190 155" fill="none">
      <rect x="12" y="38" width="162" height="112" rx="12" stroke={c} strokeWidth="2" fill="none"/>
      <path d="M12 55 L93 105 L174 55" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="148" cy="38" r="28" fill={c}/>
      <path d="M136 38 L148 50 L168 28" stroke={c === T.black ? T.white : T.black} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Content: (c) => (
    <svg width="190" height="155" viewBox="0 0 190 155" fill="none">
      <rect x="8" y="22" width="108" height="108" rx="10" stroke={c} strokeWidth="2" fill="none"/>
      <rect x="76" y="48" width="108" height="82" rx="10" stroke={c} strokeWidth="2" fill="none"/>
      <rect x="22" y="40" width="80" height="8" rx="4" fill={c}/>
      <rect x="22" y="57" width="60" height="7" rx="3.5" fill={c} opacity="0.5"/>
      <rect x="22" y="72" width="70" height="7" rx="3.5" fill={c} opacity="0.5"/>
      <rect x="90" y="66" width="80" height="8" rx="4" fill={c}/>
      <rect x="90" y="83" width="60" height="7" rx="3.5" fill={c} opacity="0.5"/>
      <rect x="90" y="98" width="70" height="7" rx="3.5" fill={c} opacity="0.5"/>
    </svg>
  ),
  Analytics: (c) => (
    <svg width="190" height="155" viewBox="0 0 190 155" fill="none">
      <rect x="12" y="15" width="162" height="125" rx="12" stroke={c} strokeWidth="2" fill="none"/>
      <rect x="12" y="15" width="162" height="34" rx="12" fill={c}/>
      <rect x="12" y="33" width="162" height="16" fill={c}/>
      <circle cx="34" cy="33" r="7" fill={T.black} opacity="0.5"/>
      <circle cx="54" cy="33" r="7" fill={T.black} opacity="0.5"/>
      <rect x="30"  y="98" width="26" height="30" rx="4" fill={c}/>
      <rect x="66"  y="74" width="26" height="54" rx="4" fill={c} opacity="0.75"/>
      <rect x="102" y="86" width="26" height="42" rx="4" fill={c}/>
      <rect x="138" y="62" width="26" height="66" rx="4" fill={c} opacity="0.75"/>
    </svg>
  ),
};

const SERVICES = [
  { id: 1, lines: ["Search engine", "optimization"], cardBg: T.bg,    lBg: T.green, lColor: T.black, icon: ServiceIcons.SEO },
  { id: 2, lines: ["Pay-per-click", "advertising"],  cardBg: T.green, lBg: T.black, lColor: T.white, icon: ServiceIcons.PPC },
  { id: 3, lines: ["Social Media", "Marketing"],     cardBg: T.black, lBg: T.green, lColor: T.black, icon: ServiceIcons.Social },
  { id: 4, lines: ["Email", "Marketing"],            cardBg: T.bg,    lBg: T.black, lColor: T.white, icon: ServiceIcons.Email },
  { id: 5, lines: ["Content", "Creation"],           cardBg: T.green, lBg: T.black, lColor: T.white, icon: ServiceIcons.Content },
  { id: 6, lines: ["Analytics and", "Tracking"],     cardBg: T.black, lBg: T.green, lColor: T.black, icon: ServiceIcons.Analytics },
];

function ServiceCard({ s }) {
  const dark   = s.cardBg === T.black;
  const accent = dark ? T.white : T.black;
  return (
    <div className="service-card" style={{
      background: s.cardBg, border: `1px solid ${T.black}`, borderRadius: 45,
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: 310, boxShadow: `4px 4px 0 ${T.black}`,
    }}>
      <div>
        {s.lines.map((line, i) => (
          <div key={i} style={{ display: "inline-block", lineHeight: 1 }}>
            <span style={{
              background: s.lBg, color: s.lColor,
              ...S.heading3,
              borderRadius: 7, padding: "5px 10px",
              display: "inline-block", marginBottom: i === 0 ? 6 : 0,
            }}>{line}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: 40 }}>
        <div className="learn-more-row" style={{ display: "flex", alignItems: "center", gap: 15, cursor: "pointer" }}>
          <ArrowCircle color={accent}/>
          <span className="arrow-text" style={{ fontFamily: T.f, fontSize: 20, color: accent }}>Learn more</span>
        </div>
        <div style={{ opacity: 0.9 }}>{s.icon(accent)}</div>
      </div>
    </div>
  );
}

function Services() {
  return (
    <W id="services" style={{ paddingTop: 70, paddingBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 80 }}>
        <Pill>Services</Pill>
        <p style={{
          ...S.text,
          maxWidth: 580,
        }}>
          At our digital marketing agency, we offer a range of services to help businesses
          grow and succeed online. These services include:
        </p>
      </div>
      <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        {SERVICES.map(s => <ServiceCard key={s.id} s={s}/>)}
      </div>
    </W>
  );
}

/* ─── CTA ─── */
function CTAIllustration() {
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i * 22.5 * Math.PI) / 180;
    return { x1: 180 + 64 * Math.cos(a), y1: 148 + 64 * Math.sin(a), x2: 180 + 140 * Math.cos(a), y2: 148 + 140 * Math.sin(a) };
  });
  return (
    <svg width="340" height="295" viewBox="0 0 340 295" fill="none">
      {rays.map((r, i) => <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={T.black} strokeWidth="1.5"/>)}
      <circle cx="180" cy="148" r="64" fill={T.black}/>
      <circle cx="160" cy="134" r="10" fill={T.white}/>
      <circle cx="200" cy="134" r="10" fill={T.white}/>
      <path d="M158 162 Q180 180 202 162" stroke={T.white} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M180 248 L200 272 L180 292 L160 272Z" fill={T.green}/>
      <path d="M72 42 L75 54 L87 54 L78 62 L81 74 L72 67 L63 74 L66 62 L57 54 L69 54Z" fill={T.black}/>
    </svg>
  );
}

function CTA() {
  return (
    <W style={{ paddingBottom: 80 }}>
      <div className="cta-grid" style={{
        background: T.bg, border: `1px solid ${T.black}`, borderRadius: 45,
        padding: "60px 100px 60px 60px", display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 40, boxShadow: `4px 4px 0 ${T.black}`,
      }}>
        <div style={{ maxWidth: 500 }}>
          <h2 style={{
            ...S.heading2,
            marginBottom: 26,
          }}>
            Let's make things happen
          </h2>
          <p style={{
            ...S.text,
            marginBottom: 26,
          }}>
            Contact us today to learn more about how our digital marketing services
            can help your business grow and succeed online.
          </p>
          <button className="cta-btn-dark" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "auto" })} style={{
            ...S.btn(),
          }}>Get your free proposal</button>
        </div>
        <div className="cta-illus" style={{ flexShrink: 0 }}>
          <CTAIllustration/>
        </div>
      </div>
    </W>
  );
}

/* ─── CASE STUDIES ─── */
const CASES = [
  "For a local restaurant, we implemented a targeted PPC campaign that resulted in a 50% increase in website traffic and a 25% increase in sales.",
  "For a B2B software company, we developed an SEO strategy that resulted in a first page ranking for key keywords and a 200% increase in organic traffic.",
  "For a national retail chain, we created a social media marketing campaign that increased followers by 25% and generated a 20% increase in online sales.",
];

function CaseStudies() {
  return (
    <W id="case-studies" style={{ paddingBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 80 }}>
        <Pill>Case Studies</Pill>
        <p style={{
          ...S.text,
          maxWidth: 600,
        }}>
          Explore Real-Life Examples of Our Proven Digital Marketing Success through Our Case Studies
        </p>
      </div>
      <div style={{ background: T.black, borderRadius: 45, padding: "70px 60px" }}>
        <div className="cases-row" style={{ display: "flex" }}>
          {CASES.map((text, i) => (
            <div key={i} style={{ display: "flex", flex: 1, minWidth: 0 }}>
              {i > 0 && <div className="cases-div" style={{ width: 1, flexShrink: 0, background: "rgba(255,255,255,0.25)" }}/>}
              <div className="cases-col" style={{ flex: 1, padding: i === 0 ? "0 56px 0 0" : i === 2 ? "0 0 0 56px" : "0 56px" }}>
                <p style={{
                  ...S.textWhite,
                  marginBottom: 20,
                }}>{text}</p>
                <div className="learn-more-row" style={{ display: "flex", alignItems: "center", gap: 15, cursor: "pointer" }}>
                  <ArrowCircle color={T.green}/>
                  <span className="arrow-text" style={{ fontFamily: T.f, fontSize: 20, color: T.green }}>Learn more</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </W>
  );
}

/* ─── WORKING PROCESS ─── */
const PROCESS_STEPS = [
  { num: "01", title: "Consultation", content: "During the initial consultation, we will discuss your business goals and objectives, target audience, and current marketing efforts. This will allow us to understand your needs and tailor our services to best fit your requirements." },
  { num: "02", title: "Research and Strategy Development", content: "We conduct in-depth research into your industry, competitors, and target audience. From this data we craft a bespoke strategy with clear milestones and measurable KPIs aligned to your business goals." },
  { num: "03", title: "Implementation", content: "Our team puts the agreed strategy into action — launching campaigns, optimising on-page content, setting up tracking, and creating assets — all on schedule and within budget." },
  { num: "04", title: "Monitoring and Optimization", content: "We continuously track performance across all channels, running A/B tests and iterative improvements so your campaigns improve week over week." },
  { num: "05", title: "Reporting and Communication", content: "You receive regular, transparent reports with plain-language insights. We hold scheduled check-ins to walk you through results and discuss next steps." },
  { num: "06", title: "Continual Improvement", content: "Digital marketing never stands still. We review strategy quarterly, incorporate new trends and platform updates, and keep pushing for better results as your business grows." },
];

function WorkingProcess() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <W id="process" style={{ paddingBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 80 }}>
        <Pill>Our Working Process</Pill>
        <p style={{
          ...S.text,
          maxWidth: 500,
        }}>
          Step-by-Step Guide to Achieving Your Business Goals
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {PROCESS_STEPS.map((step, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="accordion-item"
              style={{
                background: isOpen ? T.green : T.bg,
                border: `1px solid ${T.black}`,
                borderRadius: 45,
                boxShadow: `4px 4px 0 ${T.black}`,
                overflow: "hidden",
                transition: "background 0.25s",
              }}
            >
              {/* Header row */}
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "36px 50px", gap: 24,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  <span style={{ fontFamily: T.f, fontSize: 60, fontWeight: 700, color: T.black, lineHeight: 1 }}>
                    {step.num}
                  </span>
                  <span style={{
                    ...S.heading3,
                  }}>
                    {step.title}
                  </span>
                </div>
                {/* Plus / Minus */}
                <div style={{
                  width: 48, height: 48, borderRadius: "50%",
                  border: `1.5px solid ${T.black}`,
                  background: isOpen ? T.black : T.white,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    {!isOpen && <line x1="10" y1="3" x2="10" y2="17" stroke={T.black} strokeWidth="2" strokeLinecap="round"/>}
                    <line x1="3" y1="10" x2="17" y2="10" stroke={isOpen ? T.white : T.black} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>

              {/* Body */}
              {isOpen && (
                <div style={{ padding: "0 50px 36px", borderTop: `1px solid ${T.black}` }}>
                  <p style={{
                    ...S.text,
                    paddingTop: 28,
                  }}>
                    {step.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </W>
  );
}

/* ─── TEAM ─── */
const TEAM = [
  { name: "John Smith",     role: "CEO and Founder",          desc: "10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy" },
  { name: "Jane Doe",       role: "Director of Operations",   desc: "7+ years of experience in project management and team leadership. Strong organizational and communication skills" },
  { name: "Michael Brown",  role: "Senior SEO Specialist",    desc: "5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization" },
  { name: "Emily Johnson",  role: "PPC Manager",              desc: "3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis" },
  { name: "Brian Williams", role: "Social Media Specialist",  desc: "4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement" },
  { name: "Sarah Kim",      role: "Content Creator",          desc: "2+ years of experience in writing and editing. Skilled in creating compelling, SEO-optimized content for various industries" },
];

function TeamCard({ member }) {
  const initials = member.name.split(" ").map(n => n[0]).join("");
  return (
    <div className="team-card" style={{
      background: T.white, border: `1px solid ${T.black}`,
      borderRadius: 45, padding: "40px",
      boxShadow: `4px 4px 0 ${T.black}`,
      display: "flex", flexDirection: "column", gap: 20,
    }}>
      {/* Avatar + name row */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: T.black, display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: T.f, fontSize: 22, fontWeight: 700, color: T.white }}>{initials}</span>
        </div>
        <div>
          <p style={{ fontFamily: T.f, fontSize: 20, fontWeight: 700, color: T.black }}>{member.name}</p>
          <p style={{ fontFamily: T.f, fontSize: 16, color: T.black, opacity: 0.6, marginTop: 2 }}>{member.role}</p>
        </div>
      </div>
      <div style={{ height: 1, background: T.black }} />
      <p style={{ fontFamily: T.f, fontSize: 16, color: T.black, lineHeight: "24px" }}>{member.desc}</p>
      {/* LinkedIn */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: T.black, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill={T.white}>
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </div>
        <span style={{ fontFamily: T.f, fontSize: 15, color: T.black }}>LinkedIn</span>
      </div>
    </div>
  );
}

function Team() {
  return (
    <W id="team" style={{ paddingBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 80 }}>
        <Pill>Team</Pill>
        <p style={{
          ...S.text,
          maxWidth: 580,
        }}>
          Meet the skilled and experienced team behind our successful digital marketing strategies
        </p>
      </div>

      <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
        {TEAM.map((m, i) => <TeamCard key={i} member={m}/>)}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}>
        <button style={{
          fontFamily: T.f, fontSize: 20, color: T.black,
          background: "transparent", cursor: "pointer",
          border: `1.5px solid ${T.black}`, borderRadius: 14,
          padding: "16px 35px",
        }}>See all team</button>
      </div>
    </W>
  );
}

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  { name: "John Smith",   role: "Marketing Director at XYZ Corp", text: "We have been working with Positivus for the past year and have seen a significant increase in website traffic and leads as a result of their efforts. The team is professional, responsive, and truly cares about the success of our business. We highly recommend Positivus to any company looking to grow their online presence." },
  { name: "Sarah Lee",    role: "CEO at GreenLeaf Co.",            text: "Positivus completely transformed our online presence. Their SEO and content strategy doubled our organic traffic in just six months. The team is transparent, communicative, and genuinely invested in our growth." },
  { name: "Mark Roberts", role: "Head of Growth at TechNova",      text: "Outstanding work from start to finish. The PPC campaigns delivered an incredible ROI and the team was always quick to iterate and optimise. I wouldn't hesitate to recommend Positivus to anyone serious about digital marketing." },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <W id="testimonials" style={{ paddingBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 80 }}>
        <Pill>Testimonials</Pill>
        <p style={{
          ...S.text,
          maxWidth: 580,
        }}>
          Hear from Our Satisfied Clients: Read Our Testimonials to Learn More about Our Digital Marketing Services
        </p>
      </div>

      <div style={{ background: T.black, borderRadius: 45, padding: "70px 60px" }}>
        {/* Cards row */}
        <div style={{ display: "flex", gap: 30, marginBottom: 50 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              flex: 1, border: `1px solid ${T.green}`, borderRadius: 28,
              padding: "40px", display: "flex", flexDirection: "column", gap: 24,
              opacity: active === i ? 1 : 0.45,
              transition: "opacity 0.3s",
            }}>
              <p style={{
                ...S.textWhite,
              }}>
                "{t.text}"
              </p>
              <div>
                <p style={{ fontFamily: T.f, fontSize: 20, fontWeight: 700, color: T.green }}>{t.name}</p>
                <p style={{ fontFamily: T.f, fontSize: 16, color: T.white, opacity: 0.6, marginTop: 4 }}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dots + arrows */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <button onClick={() => setActive(a => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            style={{ background: "none", border: "none", cursor: "pointer" }}>
            <ArrowCircle color={T.white} size={44}/>
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                style={{
                  width: i === active ? 32 : 10, height: 10, borderRadius: 5,
                  background: i === active ? T.green : "rgba(255,255,255,0.4)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "width 0.3s, background 0.3s",
                }}/>
            ))}
          </div>
          <button onClick={() => setActive(a => (a + 1) % TESTIMONIALS.length)}
            style={{ background: "none", border: "none", cursor: "pointer", transform: "scaleX(1)" }}>
            <ArrowCircle color={T.white} size={44}/>
          </button>
        </div>
      </div>
    </W>
  );
}

/* ─── CONTACT ─── */
function ContactIllustration() {
  return (
    <svg width="320" height="340" viewBox="0 0 320 340" fill="none">
      {/* Big diamond */}
      <path d="M160 40 L220 160 L160 300 L100 160Z" fill={T.black}/>
      <path d="M160 40 L220 160 L160 300 L100 160Z" fill={T.green} opacity="0.25"/>
      {/* Small star */}
      <path d="M268 60 L272 76 L288 76 L276 86 L280 102 L268 92 L256 102 L260 86 L248 76 L264 76Z" fill={T.black}/>
      {/* Dot */}
      <circle cx="52" cy="220" r="18" fill={T.black}/>
    </svg>
  );
}

function Contact() {
  const [type, setType] = useState("say-hi");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <W id="contact" style={{ paddingBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 40, marginBottom: 80 }}>
        <Pill>Contact Us</Pill>
        <p style={{
          ...S.text,
          maxWidth: 500,
        }}>
          Connect with Us: Let's Discuss Your Digital Marketing Needs
        </p>
      </div>

      <div style={{ background: T.bg, border: `1px solid ${T.black}`, borderRadius: 45, padding: "60px", boxShadow: `4px 4px 0 ${T.black}` }}>
        <div className="contact-grid" style={{ display: "flex", gap: 60, alignItems: "flex-start" }}>

          {/* Form */}
          <div style={{ flex: 1 }}>
            {/* Radio buttons */}
            <div style={{ display: "flex", gap: 36, marginBottom: 40 }}>
              {[{ val: "say-hi", label: "Say Hi" }, { val: "get-quote", label: "Get a Quote" }].map(opt => (
                <label key={opt.val} style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: T.f, fontSize: 20, color: T.black }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    border: `2px solid ${T.black}`,
                    background: type === opt.val ? T.black : T.white,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }} onClick={() => setType(opt.val)}>
                    {type === opt.val && <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.green }}/>}
                  </div>
                  {opt.label}
                </label>
              ))}
            </div>

            {/* Inputs */}
            {[
              { label: "Name", name: "name", placeholder: "Name", type: "text" },
              { label: "Email*", name: "email", placeholder: "Email", type: "email" },
            ].map(field => (
              <div key={field.name} style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontFamily: T.f, fontSize: 16, color: T.black, marginBottom: 8 }}>{field.label}</label>
                <input
                  type={field.type} name={field.name} placeholder={field.placeholder}
                  value={formData[field.name]} onChange={handleChange}
                  style={{
                    width: "100%", padding: "18px 22px",
                    fontFamily: T.f, fontSize: 18, color: T.black,
                    background: T.white, border: `1px solid ${T.black}`,
                    borderRadius: 14, outline: "none",
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 32 }}>
              <label style={{ display: "block", fontFamily: T.f, fontSize: 16, color: T.black, marginBottom: 8 }}>Message*</label>
              <textarea
                name="message" placeholder="Message" rows={5}
                value={formData.message} onChange={handleChange}
                style={{
                  width: "100%", padding: "18px 22px",
                  fontFamily: T.f, fontSize: 18, color: T.black,
                  background: T.white, border: `1px solid ${T.black}`,
                  borderRadius: 14, resize: "vertical", outline: "none",
                }}
              />
            </div>

            <button className="send-btn" style={{
              width: "100%", padding: "22px",
              fontFamily: T.f, fontSize: 20, fontWeight: 500,
              background: T.black, color: T.white,
              border: "none", borderRadius: 14, cursor: "pointer",
            }}>Send Message</button>
          </div>

          {/* Illustration */}
          <div className="contact-illus" style={{ flexShrink: 0, alignSelf: "center" }}>
            <ContactIllustration/>
          </div>
        </div>
      </div>
    </W>
  );
}

/* ─── FOOTER ─── */
function Footer() {
  const links = ["About us", "Services", "Use Cases", "Pricing", "Blog"];
  const socials = [
    { icon: "linkedin", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z", circle: "cx=4 cy=4 r=2" },
    { icon: "twitter",  path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
    { icon: "facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  ];

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "auto" });
  const navIds = ["about", "services", "case-studies", "contact", "team"];

  return (
    <footer style={{ background: T.black, marginTop: 0 }}>
      <W style={{ paddingTop: 60, paddingBottom: 0 }}>

        {/* Top row */}
        <div className="footer-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 60, flexWrap: "wrap", gap: 32 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill={T.white}/>
              <path d="M18 7L21 15H29L23 20L25.5 28L18 23L10.5 28L13 20L7 15H15Z" fill={T.black}/>
            </svg>
            <span style={{ fontFamily: T.f, fontSize: 20, fontWeight: 700, color: T.white }}>Positivus</span>
          </div>

          {/* Nav links */}
          <nav className="footer-links" style={{ display: "flex", gap: 40 }}>
            {links.map((l, i) => (
              <a key={l} href="#" onClick={(e) => { e.preventDefault(); scrollTo(navIds[i]); }}
                 style={{ fontFamily: T.f, fontSize: 18, color: T.white, textDecoration: "underline" }}>{l}</a>
            ))}
          </nav>

          {/* Socials */}
          <div style={{ display: "flex", gap: 16 }}>
            {socials.map(s => (
              <div key={s.icon} style={{
                width: 40, height: 40, borderRadius: "50%",
                border: `1.5px solid ${T.white}`,
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={T.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={s.path}/>
                  {s.circle && <circle {...Object.fromEntries(s.circle.split(" ").map(p => p.split("=").map((v, i) => i === 1 ? Number(v) : v)))} />}
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Contact + Newsletter */}
        <div style={{ display: "flex", gap: 60, flexWrap: "wrap", marginBottom: 60 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: T.f, fontSize: 18, fontWeight: 600, color: T.white }}>Contact us:</p>
            <p style={{ fontFamily: T.f, fontSize: 18, color: T.white, opacity: 0.7 }}>Email: info@positivus.com</p>
            <p style={{ fontFamily: T.f, fontSize: 18, color: T.white, opacity: 0.7 }}>Phone: 555 567 8901</p>
            <p style={{ fontFamily: T.f, fontSize: 18, color: T.white, opacity: 0.7 }}>Address: 1234 Main St<br/>Moonstone City, Stardust State 12345</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontFamily: T.f, fontSize: 18, fontWeight: 600, color: T.white }}>Email</p>
            <p style={{ fontFamily: T.f, fontSize: 16, color: T.white, opacity: 0.7 }}>Subscribe to news</p>
            <div style={{ display: "flex", gap: 12 }}>
              <input type="email" placeholder="Email" style={{
                padding: "14px 20px", fontFamily: T.f, fontSize: 16,
                background: "transparent", color: T.white,
                border: `1px solid ${T.white}`, borderRadius: 14, outline: "none", minWidth: 240,
              }}/>
              <button style={{
                padding: "14px 24px", fontFamily: T.f, fontSize: 16, fontWeight: 600,
                background: T.green, color: T.black, border: "none", borderRadius: 14, cursor: "pointer",
              }}>Subscribe to news</button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid rgba(255,255,255,0.2)`, padding: "28px 0", display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
          <p style={{ fontFamily: T.f, fontSize: 16, color: T.white, opacity: 0.5 }}>© 2023 Positivus. All Rights Reserved.</p>
          <a href="#" style={{ fontFamily: T.f, fontSize: 16, color: T.white, opacity: 0.5, textDecoration: "underline" }}>Privacy Policy</a>
        </div>
      </W>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  return (
    <div style={{ background: T.bg, fontFamily: T.f, minHeight: "100vh" }}>
      <style>{CSS}</style>
      <Navbar/>
      <Hero/>
      <Services/>
      <CTA/>
      <CaseStudies/>
      <WorkingProcess/>
      <Team/>
      <Testimonials/>
      <Contact/>
      <Footer/>
    </div>
  );
}