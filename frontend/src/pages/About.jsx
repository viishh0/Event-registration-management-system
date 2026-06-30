import { useEffect, useState } from 'react';

function AboutPage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="about-page">

      {/* ---------- HERO ---------- */}
      <section className="ab-hero">
        <div className="ab-blob ab-blob-1" aria-hidden="true" />
        <div className="ab-blob ab-blob-2" aria-hidden="true" />
        <div className="ab-blob ab-blob-3" aria-hidden="true" />

        <div className={`ab-hero-inner ${loaded ? 'in' : ''}`}>
          <div className="ab-eyebrow center"><i className="bi bi-ticket-perforated-fill" /> About NexEvent</div>
          <h1>Built for organizers<br />who care about every guest</h1>
          <p className="ab-hero-subtext">
            NexEvent started with a simple idea — registering guests for an event
            shouldn't feel like filling out paperwork. It should feel as good as
            the event itself.
          </p>
        </div>
      </section>

      {/* ---------- STORY ---------- */}
      <section className="ab-story">
        <div className="ab-story-inner">
          <div className="ab-story-copy">
            <div className="ab-eyebrow"><i className="bi bi-journal-bookmark-fill" /> Our story</div>
            <h2>From a messy spreadsheet to a system organizers actually enjoy</h2>
            <p>
              Every event we ever ran started the same way — a spreadsheet full of names,
              ticket counts, and "did they pay?" question marks. NexEvent was built to fix
              exactly that: one clean place to register guests, track payments, and manage
              the full list without the chaos.
            </p>
            <p>
              Today, NexEvent helps organizers run everything from intimate meetups to
              large conferences — without ever losing track of a single guest.
            </p>
          </div>

          <div className="ab-story-visual">
            <div className="ab-stat-card ab-stat-purple">
              <i className="bi bi-people-fill" />
              <div>
                <div className="ab-stat-value">2.4k+</div>
                <div className="ab-stat-label">Guests registered</div>
              </div>
            </div>
            <div className="ab-stat-card ab-stat-coral ab-stat-offset">
              <i className="bi bi-calendar-event-fill" />
              <div>
                <div className="ab-stat-value">340+</div>
                <div className="ab-stat-label">Events hosted</div>
              </div>
            </div>
            <div className="ab-stat-card ab-stat-cyan">
              <i className="bi bi-shield-check" />
              <div>
                <div className="ab-stat-value">99.9%</div>
                <div className="ab-stat-label">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CORE VALUES ---------- */}
      <section className="ab-values">
        <div className="ab-section-head">
          <div className="ab-eyebrow center"><i className="bi bi-stars" /> What we stand for</div>
          <h2>The principles behind every feature</h2>
        </div>

        <div className="ab-value-grid">
          <div className="ab-value-card ab-vc-purple">
            <div className="ab-value-icon"><i className="bi bi-lightning-charge-fill" /></div>
            <h3>Simplicity first</h3>
            <p>Every screen is designed to be understood in seconds, not explained in a manual.</p>
          </div>
          <div className="ab-value-card ab-vc-coral">
            <div className="ab-value-icon"><i className="bi bi-shield-lock-fill" /></div>
            <h3>Reliability</h3>
            <p>Your guest list is too important to lose. We treat your data with that seriousness.</p>
          </div>
          <div className="ab-value-card ab-vc-cyan">
            <div className="ab-value-icon"><i className="bi bi-heart-fill" /></div>
            <h3>Organizer-friendly</h3>
            <p>Built by watching real organizers struggle with spreadsheets — and fixing that.</p>
          </div>
          <div className="ab-value-card ab-vc-pink">
            <div className="ab-value-icon"><i className="bi bi-graph-up-arrow" /></div>
            <h3>Always improving</h3>
            <p>NexEvent grows with every event we help run — small refinements, constantly.</p>
          </div>
        </div>
      </section>

      {/* ---------- TIMELINE ---------- */}
      <section className="ab-timeline-section">
        <div className="ab-section-head">
          <div className="ab-eyebrow center"><i className="bi bi-signpost-2-fill" /> Our journey</div>
          <h2>How NexEvent came to be</h2>
        </div>

        <div className="ab-timeline">
          <div className="ab-timeline-line" aria-hidden="true" />

          <div className="ab-tl-item">
            <div className="ab-tl-dot" />
            <div className="ab-tl-content">
              <div className="ab-tl-year">2023</div>
              <h3>The idea</h3>
              <p>Tired of spreadsheet chaos, we sketched the first version of NexEvent for a single college fest.</p>
            </div>
          </div>

          <div className="ab-tl-item">
            <div className="ab-tl-dot" />
            <div className="ab-tl-content">
              <div className="ab-tl-year">2024</div>
              <h3>100 events milestone</h3>
              <p>Word spread among organizers. NexEvent crossed its first 100 hosted events.</p>
            </div>
          </div>

          <div className="ab-tl-item">
            <div className="ab-tl-dot" />
            <div className="ab-tl-content">
              <div className="ab-tl-year">2025</div>
              <h3>Guest list, reimagined</h3>
              <p>We rebuilt the dashboard around search, filters, and instant inline editing.</p>
            </div>
          </div>

          <div className="ab-tl-item">
            <div className="ab-tl-dot ab-tl-dot-active" />
            <div className="ab-tl-content">
              <div className="ab-tl-year">2026</div>
              <h3>NexEvent today</h3>
              <p>Trusted by organizers for events of every size — from 10 guests to 10,000.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- CLOSING CTA ---------- */}
      <section className="ab-closing">
        <div className="ab-closing-card">
          <div className="ab-closing-blob" aria-hidden="true" />
          <i className="bi bi-ticket-perforated-fill ab-closing-icon" />
          <h2>Ready to see it in action?</h2>
          <p>Start registering guests for your next event in under a minute.</p>
          <button className="ab-btn-primary">
            <i className="bi bi-arrow-right-circle-fill" /> Get started
          </button>
        </div>
      </section>

      <style>{`
        .about-page{
          --ink:#211B3D;
          --paper:#FFFFFF;
          --muted:#6E6B85;

          --purple:#6D5DF6;
          --purple-deep:#5645D6;
          --coral:#FF7A5C;
          --coral-deep:#F0573A;
          --cyan:#22C9E0;
          --cyan-deep:#16A8BC;
          --pink:#FF63A5;
          --pink-deep:#EC4488;

          font-family:'Inter', sans-serif;
          color:var(--ink);
          background:#FAFAFE;
          overflow-x:hidden;
        }
        .about-page *{ box-sizing:border-box; }

        .ab-eyebrow{
          display:inline-flex;
          align-items:center;
          gap:6px;
          font-family:'Inter', sans-serif;
          font-weight:700;
          font-size:.76rem;
          letter-spacing:.1em;
          text-transform:uppercase;
          color:var(--purple-deep);
          margin-bottom:14px;
        }
        .ab-eyebrow.center{ justify-content:center; width:100%; }

        /* ---------- HERO ---------- */
        .ab-hero{
          position:relative;
          padding:96px 24px 110px;
          text-align:center;
          overflow:hidden;
          background:linear-gradient(135deg, #EFEDFF 0%, #FDEFF5 50%, #E7FAFC 100%);
        }
        .ab-blob{
          position:absolute;
          border-radius:50%;
          filter:blur(50px);
          opacity:.55;
        }
        .ab-blob-1{ width:340px; height:340px; background:var(--purple); top:-100px; left:-80px; }
        .ab-blob-2{ width:280px; height:280px; background:var(--coral); bottom:-90px; right:-60px; }
        .ab-blob-3{ width:220px; height:220px; background:var(--cyan); top:40%; left:60%; opacity:.4; }

        .ab-hero-inner{
          position:relative;
          z-index:1;
          max-width:700px;
          margin:0 auto;
          opacity:0;
          transform:translateY(14px);
          transition:opacity .6s ease, transform .6s ease;
        }
        .ab-hero-inner.in{ opacity:1; transform:translateY(0); }
        .ab-hero h1{
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:800;
          font-size:2.7rem;
          line-height:1.18;
          color:var(--ink);
          margin:0 0 18px;
          letter-spacing:-.01em;
        }
        .ab-hero-subtext{
          color:var(--muted);
          font-size:1.05rem;
          line-height:1.6;
          margin:0 auto;
        }

        /* ---------- STORY ---------- */
        .ab-story{ padding:88px 24px; }
        .ab-story-inner{
          max-width:1100px;
          margin:0 auto;
          display:flex;
          gap:56px;
          align-items:center;
          flex-wrap:wrap;
        }
        .ab-story-copy{ flex:1.2; min-width:300px; }
        .ab-story-copy h2{
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:800;
          font-size:1.9rem;
          line-height:1.3;
          color:var(--ink);
          margin:0 0 16px;
          letter-spacing:-.01em;
        }
        .ab-story-copy p{
          color:var(--muted);
          font-size:1rem;
          line-height:1.75;
          margin-bottom:14px;
        }

        .ab-story-visual{
          flex:1;
          min-width:240px;
          display:flex;
          flex-direction:column;
          gap:16px;
        }
        .ab-stat-card{
          display:flex;
          align-items:center;
          gap:14px;
          border-radius:16px;
          padding:18px 22px;
          color:#fff;
          box-shadow:0 18px 36px -16px rgba(109,93,246,.35);
        }
        .ab-stat-card.ab-stat-offset{ margin-left:28px; }
        .ab-stat-purple{ background:linear-gradient(135deg, var(--purple), var(--purple-deep)); }
        .ab-stat-coral{ background:linear-gradient(135deg, var(--coral), var(--coral-deep)); }
        .ab-stat-cyan{ background:linear-gradient(135deg, var(--cyan), var(--cyan-deep)); }
        .ab-stat-card i{ font-size:1.5rem; opacity:.9; }
        .ab-stat-value{ font-family:'Plus Jakarta Sans', sans-serif; font-weight:800; font-size:1.4rem; line-height:1; }
        .ab-stat-label{ font-size:.8rem; opacity:.85; margin-top:3px; }

        /* ---------- VALUES ---------- */
        .ab-values{ padding:90px 24px; background:#F5F4FF; }
        .ab-section-head{ text-align:center; max-width:1100px; margin:0 auto 48px; }
        .ab-section-head h2{
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:800;
          font-size:2rem;
          color:var(--ink);
          margin:0;
          letter-spacing:-.01em;
        }

        .ab-value-grid{
          max-width:1100px;
          margin:0 auto;
          display:grid;
          grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));
          gap:22px;
        }
        .ab-value-card{
          background:#fff;
          border-radius:18px;
          padding:28px 24px;
          border:1px solid rgba(109,93,246,.08);
          box-shadow:0 14px 30px -20px rgba(33,27,61,.18);
          transition:transform .18s ease, box-shadow .18s ease;
        }
        .ab-value-card:hover{
          transform:translateY(-6px);
          box-shadow:0 22px 44px -18px rgba(33,27,61,.25);
        }
        .ab-value-icon{
          width:48px; height:48px;
          border-radius:14px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:1.25rem;
          color:#fff;
          margin-bottom:16px;
        }
        .ab-vc-purple .ab-value-icon{ background:linear-gradient(135deg, var(--purple), var(--purple-deep)); }
        .ab-vc-coral .ab-value-icon{ background:linear-gradient(135deg, var(--coral), var(--coral-deep)); }
        .ab-vc-cyan .ab-value-icon{ background:linear-gradient(135deg, var(--cyan), var(--cyan-deep)); }
        .ab-vc-pink .ab-value-icon{ background:linear-gradient(135deg, var(--pink), var(--pink-deep)); }
        .ab-value-card h3{
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:700;
          font-size:1.08rem;
          margin:0 0 8px;
          color:var(--ink);
        }
        .ab-value-card p{ color:var(--muted); font-size:.9rem; margin:0; line-height:1.6; }

        /* ---------- TIMELINE ---------- */
        .ab-timeline-section{ padding:90px 24px; }
        .ab-timeline{
          max-width:640px;
          margin:0 auto;
          position:relative;
          padding-left:36px;
        }
        .ab-timeline-line{
          position:absolute;
          left:5px;
          top:6px;
          bottom:6px;
          width:3px;
          border-radius:3px;
          background:linear-gradient(180deg, var(--purple), var(--pink), var(--coral));
        }
        .ab-tl-item{ position:relative; padding-bottom:38px; }
        .ab-tl-item:last-child{ padding-bottom:0; }
        .ab-tl-dot{
          position:absolute;
          left:-36px;
          top:3px;
          width:14px; height:14px;
          border-radius:50%;
          background:#fff;
          border:3px solid var(--purple);
        }
        .ab-tl-dot-active{
          background:var(--coral);
          border-color:var(--coral);
          box-shadow:0 0 0 5px rgba(255,122,92,.18);
        }
        .ab-tl-year{
          display:inline-block;
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:700;
          font-size:.78rem;
          color:#fff;
          background:linear-gradient(135deg, var(--purple), var(--pink));
          padding:3px 12px;
          border-radius:999px;
          margin-bottom:8px;
        }
        .ab-tl-content h3{
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:700;
          font-size:1.1rem;
          margin:0 0 6px;
          color:var(--ink);
        }
        .ab-tl-content p{ color:var(--muted); font-size:.92rem; margin:0; line-height:1.6; }

        /* ---------- CLOSING CTA ---------- */
        .ab-closing{ padding:90px 24px 110px; max-width:1100px; margin:0 auto; }
        .ab-closing-card{
          position:relative;
          overflow:hidden;
          background:linear-gradient(135deg, var(--purple) 0%, var(--pink-deep) 60%, var(--coral-deep) 100%);
          border-radius:24px;
          text-align:center;
          padding:64px 32px;
          color:#fff;
        }
        .ab-closing-blob{
          position:absolute;
          width:300px; height:300px;
          background:rgba(255,255,255,.12);
          border-radius:50%;
          top:-120px; right:-80px;
        }
        .ab-closing-icon{ position:relative; font-size:2.6rem; margin-bottom:14px; display:block; }
        .ab-closing-card h2{
          position:relative;
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:800;
          font-size:2rem;
          margin:0 0 10px;
          letter-spacing:-.01em;
        }
        .ab-closing-card p{ position:relative; color:rgba(255,255,255,.85); margin-bottom:28px; font-size:1.02rem; }

        .ab-btn-primary{
          position:relative;
          background:#fff;
          color:var(--purple-deep);
          border:none;
          font-family:'Plus Jakarta Sans', sans-serif;
          font-weight:700;
          font-size:.95rem;
          padding:.95rem 2rem;
          border-radius:12px;
          display:inline-flex;
          align-items:center;
          gap:8px;
          cursor:pointer;
          box-shadow:0 14px 28px -10px rgba(0,0,0,.25);
          transition:transform .12s ease, box-shadow .12s ease;
        }
        .ab-btn-primary:hover{ transform:translateY(-2px); box-shadow:0 18px 36px -10px rgba(0,0,0,.3); }
        .ab-btn-primary:active{ transform:translateY(0) scale(.98); }

        /* ---------- RESPONSIVE ---------- */
        @media (max-width:767.98px){
          .ab-hero{ padding:72px 18px 80px; }
          .ab-hero h1{ font-size:2rem; }
          .ab-story, .ab-values, .ab-timeline-section, .ab-closing{ padding:64px 18px; }
          .ab-stat-card.ab-stat-offset{ margin-left:0; }
          .ab-closing-card{ padding:48px 22px; }
        }

        @media (prefers-reduced-motion: reduce){
          .ab-hero-inner{ transition:none; opacity:1; transform:none; }
          .ab-value-card{ transition:none; }
        }
      `}</style>
    </div>
  );
}

export default AboutPage;