import { useEffect, useState } from 'react';

function HomePage({ onRegisterClick, onViewListClick }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const goRegister = () => (onRegisterClick ? onRegisterClick() : console.log('Navigate: Add Registration'));
  const goList = () => (onViewListClick ? onViewListClick() : console.log('Navigate: Registration List'));

  return (
    <div className="home-page">

      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="hero-inner">
          <div className={`hero-copy ${loaded ? 'in' : ''}`}>
            <div className="eyebrow"><i className="bi bi-ticket-perforated" /> Event Registration, Simplified</div>
            <h1>Where Great Events<br />Begin to Take Shape</h1>
            <p className="hero-subtext">
              Register guests, track payments, and manage your full guest list from one
              clean, reliable dashboard — built for organizers who care about the details.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={goRegister}>
                <i className="bi bi-pencil-square" /> Register a Guest
              </button>
              <button className="btn-secondary" onClick={goList}>
                <i className="bi bi-people" /> View Guest List
              </button>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-value">2.4k+</div>
                <div className="hero-stat-label">Guests registered</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">340+</div>
                <div className="hero-stat-label">Events hosted</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-value">99.9%</div>
                <div className="hero-stat-label">Uptime</div>
              </div>
            </div>
          </div>

          <div className={`hero-art ${loaded ? 'in' : ''}`}>
            <div className="float-ticket back-ticket" aria-hidden="true">
              <div className="ft-stub" />
              <div className="ft-body" />
            </div>
            <div className="float-ticket front-ticket">
              <div className="ft-stub">
                <span className="ft-rotated">Admit One</span>
                <span className="ft-number">GA-104822</span>
              </div>
              <div className="ft-body">
                <div className="ft-label">Reserved for</div>
                <div className="ft-name">Asha Menon</div>
                <div className="ft-meta">
                  <span><i className="bi bi-ticket-perforated" /> 2 tickets</span>
                  <span className="ft-badge"><i className="bi bi-check2-circle" /> Paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FEATURES ---------- */}
      <section className="features">
        <div className="section-head">
          <div className="eyebrow center"><i className="bi bi-stars" /> Why Organizers Choose Us</div>
          <h2>Everything you need, nothing you don't</h2>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon"><i className="bi bi-lightning-charge-fill" /></div>
            <h3>Quick Registration</h3>
            <p>Add a guest in seconds with a clean, validated form — no clutter, no confusion.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="bi bi-people-fill" /></div>
            <h3>Smart Guest List</h3>
            <p>Search, filter, and edit registrations instantly from one organized dashboard.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><i className="bi bi-shield-check" /></div>
            <h3>Payment Tracking</h3>
            <p>See who's paid and who hasn't, at a glance, with clear color-coded status badges.</p>
          </div>
        </div>
      </section>

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="how-it-works">
        <div className="section-head">
          <div className="eyebrow center"><i className="bi bi-signpost-2" /> How It Works</div>
          <h2>Three simple steps</h2>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">01</div>
            <h3>Add the guest</h3>
            <p>Capture name, ticket count, and contact details in one quick form.</p>
          </div>
          <div className="step-line" aria-hidden="true" />
          <div className="step">
            <div className="step-number">02</div>
            <h3>Confirm the ticket</h3>
            <p>Mark payment status and lock in their reserved spot.</p>
          </div>
          <div className="step-line" aria-hidden="true" />
          <div className="step">
            <div className="step-number">03</div>
            <h3>Manage the list</h3>
            <p>Track, search, and update every registration from the guest list.</p>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="closing-cta">
        <div className="closing-card">
          <i className="bi bi-ticket-perforated closing-icon" />
          <h2>Ready to fill the room?</h2>
          <p>Start registering guests for your next event in under a minute.</p>
          <button className="btn-primary btn-large" onClick={goRegister}>
            <i className="bi bi-arrow-right-circle" /> Get Started
          </button>
        </div>
      </section>

      <style>{`
        .home-page{
          --ink:#1C2541;
          --paper:#FBF7EC;
          --navy:#16234A;
          --navy-deep:#0F1838;
          --gold:#D4A24C;
          --gold-deep:#B8862E;
          --amber:#F0D08A;
          --teal:#2F6F6B;
          --muted:#8B8377;
          --unpaid:#B5482F;
          font-family:'Work Sans', sans-serif;
          color:var(--ink);
          background:var(--paper);
        }
        .home-page *{ box-sizing:border-box; }

        .eyebrow{
          display:inline-flex;
          align-items:center;
          gap:6px;
          font-family:'Space Mono', monospace;
          font-size:.74rem;
          letter-spacing:.18em;
          text-transform:uppercase;
          color:var(--teal);
          margin-bottom:14px;
        }
        .eyebrow.center{ justify-content:center; width:100%; }

        /* ---------- HERO ---------- */
        .hero{
          background:
            radial-gradient(circle at 18% 20%, rgba(255,224,160,0.12), transparent 50%),
            radial-gradient(circle at 85% 80%, rgba(212,162,76,0.16), transparent 55%),
            linear-gradient(150deg, var(--navy) 0%, var(--navy) 18%, #3A3A56 42%, #6B6048 68%, var(--gold-deep) 100%);
          padding:72px 24px 90px;
        }
        .hero-inner{
          max-width:1100px;
          margin:0 auto;
          display:flex;
          align-items:center;
          gap:48px;
          flex-wrap:wrap;
        }
        .hero-copy{ flex:1; min-width:300px; opacity:0; transform:translateY(14px); transition:opacity .6s ease, transform .6s ease; }
        .hero-copy.in{ opacity:1; transform:translateY(0); }
        .hero .eyebrow{ color:var(--amber); }
        .hero h1{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:2.6rem;
          line-height:1.15;
          color:var(--paper);
          margin:0 0 16px;
        }
        .hero-subtext{
          color:rgba(251,247,236,0.8);
          font-size:1rem;
          max-width:480px;
          margin-bottom:28px;
        }
        .hero-actions{ display:flex; gap:14px; flex-wrap:wrap; margin-bottom:36px; }

        .btn-primary{
          background:var(--gold);
          color:var(--navy-deep);
          border:none;
          font-family:'Oswald', sans-serif;
          font-weight:600;
          letter-spacing:.03em;
          text-transform:uppercase;
          font-size:.88rem;
          padding:.78rem 1.4rem;
          border-radius:10px;
          display:inline-flex;
          align-items:center;
          gap:8px;
          cursor:pointer;
          transition:background .15s ease, transform .1s ease;
        }
        .btn-primary:hover{ background:var(--amber); }
        .btn-primary:active{ transform:scale(.98); }
        .btn-large{ font-size:1rem; padding:.9rem 1.8rem; }

        .btn-secondary{
          background:transparent;
          color:var(--paper);
          border:1.5px solid rgba(251,247,236,0.4);
          font-family:'Oswald', sans-serif;
          font-weight:600;
          letter-spacing:.03em;
          text-transform:uppercase;
          font-size:.88rem;
          padding:.78rem 1.4rem;
          border-radius:10px;
          display:inline-flex;
          align-items:center;
          gap:8px;
          cursor:pointer;
          transition:background .15s ease, border-color .15s ease;
        }
        .btn-secondary:hover{ background:rgba(251,247,236,0.1); border-color:var(--paper); }

        .hero-stats{ display:flex; gap:32px; flex-wrap:wrap; }
        .hero-stat-value{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.5rem;
          color:var(--paper);
        }
        .hero-stat-label{
          font-size:.74rem;
          color:rgba(251,247,236,0.65);
          text-transform:uppercase;
          letter-spacing:.05em;
        }

        /* hero floating tickets */
        .hero-art{
          flex:1;
          min-width:280px;
          position:relative;
          height:280px;
          opacity:0;
          transform:translateY(20px);
          transition:opacity .7s ease .15s, transform .7s ease .15s;
        }
        .hero-art.in{ opacity:1; transform:translateY(0); }

        .float-ticket{
          position:absolute;
          width:280px;
          display:flex;
          border-radius:14px;
          overflow:hidden;
          box-shadow:0 25px 50px -20px rgba(0,0,0,.5);
        }
        .back-ticket{
          top:30px; left:30px;
          background:rgba(251,247,236,0.5);
          transform:rotate(-6deg);
          height:150px;
        }
        .back-ticket .ft-stub{ width:60px; background:rgba(22,35,74,0.4); }
        .back-ticket .ft-body{ flex:1; background:rgba(251,247,236,0.55); }

        .front-ticket{
          top:0; left:0;
          background:var(--paper);
          transform:rotate(3deg);
          animation:float-ticket 5s ease-in-out infinite;
        }
        .front-ticket .ft-stub{
          width:64px;
          background:var(--navy);
          color:var(--paper);
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:space-between;
          padding:14px 6px;
        }
        .ft-rotated{
          writing-mode:vertical-rl;
          transform:rotate(180deg);
          font-family:'Oswald', sans-serif;
          font-size:.62rem;
          letter-spacing:.15em;
          color:var(--amber);
          text-transform:uppercase;
        }
        .ft-number{
          font-family:'Space Mono', monospace;
          font-size:.58rem;
          color:rgba(251,247,236,0.7);
        }
        .front-ticket .ft-body{ flex:1; padding:18px 16px; }
        .ft-label{
          font-size:.62rem;
          letter-spacing:.1em;
          text-transform:uppercase;
          color:var(--muted);
        }
        .ft-name{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.1rem;
          color:var(--ink);
          margin:2px 0 12px;
        }
        .ft-meta{ display:flex; gap:10px; align-items:center; font-size:.78rem; color:var(--navy); }
        .ft-badge{
          display:inline-flex; align-items:center; gap:4px;
          background:rgba(47,111,107,0.12);
          color:var(--teal);
          padding:2px 8px;
          border-radius:999px;
          font-weight:600;
        }

        @keyframes float-ticket{
          0%, 100%{ transform:rotate(3deg) translateY(0); }
          50%{ transform:rotate(2deg) translateY(-10px); }
        }

        /* ---------- FEATURES ---------- */
        .features{ padding:80px 24px; max-width:1100px; margin:0 auto; }
        .section-head{ text-align:center; margin-bottom:44px; }
        .section-head h2{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.9rem;
          color:var(--ink);
          margin:0;
        }
        .feature-grid{
          display:grid;
          grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));
          gap:24px;
        }
        .feature-card{
          background:#FFFEFB;
          border:1.5px solid #E3DDCB;
          border-radius:16px;
          padding:28px 24px;
          transition:transform .15s ease, box-shadow .15s ease;
        }
        .feature-card:hover{
          transform:translateY(-4px);
          box-shadow:0 18px 36px -18px rgba(28,37,65,.25);
        }
        .feature-icon{
          width:48px; height:48px;
          border-radius:12px;
          background:var(--navy);
          color:var(--amber);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:1.3rem;
          margin-bottom:16px;
        }
        .feature-card h3{
          font-family:'Oswald', sans-serif;
          font-size:1.1rem;
          margin:0 0 8px;
          color:var(--ink);
        }
        .feature-card p{ color:var(--muted); font-size:.9rem; margin:0; line-height:1.55; }

        /* ---------- HOW IT WORKS ---------- */
        .how-it-works{
          padding:80px 24px;
          background:#F5EFDD;
        }
        .how-it-works .section-head{ max-width:1100px; margin:0 auto 44px; }

        .steps{
          max-width:1100px;
          margin:0 auto;
          display:flex;
          align-items:flex-start;
          gap:8px;
          flex-wrap:wrap;
          justify-content:center;
        }
        .step{ flex:1; min-width:200px; text-align:center; max-width:280px; }
        .step-number{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.6rem;
          color:var(--gold-deep);
          margin-bottom:8px;
        }
        .step h3{
          font-family:'Oswald', sans-serif;
          font-size:1.05rem;
          margin:0 0 6px;
          color:var(--ink);
        }
        .step p{ color:var(--muted); font-size:.88rem; margin:0; line-height:1.5; }
        .step-line{
          flex:0 0 60px;
          height:2px;
          background:repeating-linear-gradient(90deg, var(--gold-deep) 0 8px, transparent 8px 16px);
          margin-top:18px;
        }
        @media (max-width:767.98px){ .step-line{ display:none; } }

        /* ---------- CLOSING CTA ---------- */
        .closing-cta{ padding:80px 24px 100px; max-width:1100px; margin:0 auto; }
        .closing-card{
          background:linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%);
          border-radius:20px;
          text-align:center;
          padding:56px 32px;
          color:var(--paper);
        }
        .closing-icon{ font-size:2.4rem; color:var(--amber); margin-bottom:12px; display:block; }
        .closing-card h2{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.8rem;
          margin:0 0 8px;
        }
        .closing-card p{ color:rgba(251,247,236,0.75); margin-bottom:26px; }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width:767.98px){
          .hero{ padding:56px 18px 70px; }
          .hero h1{ font-size:2rem; }
          .hero-art{ height:200px; }
          .float-ticket{ width:220px; }
          .back-ticket{ height:120px; }
          .features, .closing-cta{ padding:60px 18px; }
          .how-it-works{ padding:60px 18px; }
        }

        @media (prefers-reduced-motion: reduce){
          .front-ticket{ animation:none; }
          .hero-copy, .hero-art{ transition:none; opacity:1; transform:none; }
        }
      `}</style>
    </div>
  );
}

export default HomePage;