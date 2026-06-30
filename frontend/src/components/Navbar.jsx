import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const location = useLocation();
  const desktopInputRef = useRef(null);
  5
const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
 { name: "Home", path: "/home" },
  { name: "Add Registration", path: "/add-registration" },
  { name: "Registration List", path: "/registration-list" },
  { name: "About", path: "/about" },
];

  const closeMenu = () => {
    setMenuOpen(false);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', search);
  };

  // "/" keyboard shortcut focuses the search bar, like Linear/GitHub/Stripe
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';
      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        desktopInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="nx-navbar">
      <div className="nx-inner">

        <Link to="/" className="nx-brand">
          <span className="nx-brand-icon"><i className="bi bi-ticket-perforated-fill" /></span>
          <span className="nx-brand-text">
            Nex<span className="nx-brand-accent">Event</span>
          </span>
        </Link>

        <nav className={`nx-links ${menuOpen ? 'open' : ''}`}>
         {navLinks.map((item) => (
  <Link
    key={item.path}
    to={item.path}
    className={`nx-link ${
      location.pathname === item.path ? "active" : ""
    }`}
    onClick={closeMenu}
  >
    {item.name}
  </Link>
))}

          <form className="nx-search nx-search-mobile" onSubmit={handleSearch}>
            <i className="bi bi-search" />
            <input
              type="text"
              placeholder="Search guests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className="nx-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
                <i className="bi bi-x" />
              </button>
            )}
          </form>
        </nav>

        <form
          className={`nx-search nx-search-desktop ${searchFocused ? 'focused' : ''}`}
          onSubmit={handleSearch}
        >
          <i className="bi bi-search nx-search-icon" />
          <input
            ref={desktopInputRef}
            type="text"
            placeholder="Search guests, ticketCount, contacts..."
            value={search}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search ? (
            <button type="button" className="nx-search-clear" onClick={() => setSearch('')} aria-label="Clear search">
              <i className="bi bi-x" />
            </button>
          ) : (
            <kbd className="nx-search-kbd">/</kbd>
          )}
        </form>

        <button
          className="nx-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((m) => !m)}
        >
          <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'}`} />
        </button>

      </div>

      <style>{`
        .nx-navbar{
          --ink:#1C2541;
          --paper:#FBF7EC;
          --navy:#16234A;
          --navy-deep:#0F1838;
          --gold:#D4A24C;
          --gold-deep:#B8862E;
          --amber:#F0D08A;
          --teal:#2F6F6B;
          --muted:#8B8377;

          background:var(--navy);
          font-family:'Work Sans', sans-serif;
          box-shadow:0 6px 20px -10px rgba(0,0,0,.35);
          position:relative;
          z-index:50;
        }
        .nx-navbar *{ box-sizing:border-box; }

        .nx-inner{
          max-width:1180px;
          margin:0 auto;
          display:flex;
          align-items:center;
          gap:20px;
          padding:14px 24px;
        }

        .nx-brand{
          display:flex;
          align-items:center;
          gap:10px;
          background:none;
          border:none;
          cursor:pointer;
          padding:0;
          flex-shrink:0;
        }
        .nx-brand-icon{
          width:34px; height:34px;
          border-radius:9px;
          background:var(--gold);
          color:var(--navy-deep);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:1rem;
        }
        .nx-brand-text{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.3rem;
          letter-spacing:.01em;
          color:var(--paper);
        }
        .nx-brand-accent{ color:var(--amber); }

        .nx-links{
          display:flex;
          align-items:center;
          gap:6px;
          flex:1;
        }
        .nx-link{
          background:none;
          border:none;
          color:rgba(251,247,236,0.75);
          font-family:'Work Sans', sans-serif;
          font-weight:500;
          font-size:.92rem;
          padding:8px 14px;
          border-radius:8px;
          cursor:pointer;
          transition:background .15s ease, color .15s ease;
          white-space:nowrap;
        }
        .nx-link:hover{ background:rgba(251,247,236,0.08); color:var(--paper); }
        .nx-link.active{
          background:rgba(212,162,76,0.16);
          color:var(--amber);
          font-weight:600;
        }

        /* ---------- premium search bar ---------- */
        .nx-search{
          position:relative;
          display:flex;
          align-items:center;
          gap:9px;
          background:linear-gradient(180deg, rgba(251,247,236,0.09), rgba(251,247,236,0.06));
          border:1px solid rgba(251,247,236,0.14);
          border-radius:11px;
          padding:.55rem .7rem .55rem .95rem;
          width:260px;
          box-shadow:inset 0 1px 2px rgba(0,0,0,0.15);
          transition:width .25s cubic-bezier(.4,0,.2,1), border-color .2s ease, background .2s ease, box-shadow .2s ease;
        }
        .nx-search-desktop.focused{
          width:340px;
          border-color:rgba(212,162,76,0.6);
          background:rgba(251,247,236,0.1);
          box-shadow:
            inset 0 1px 2px rgba(0,0,0,0.15),
            0 0 0 3px rgba(212,162,76,0.18),
            0 8px 20px -8px rgba(0,0,0,0.35);
        }
        .nx-search-icon{
          color:rgba(251,247,236,0.55);
          font-size:.85rem;
          transition:color .2s ease;
        }
        .nx-search-desktop.focused .nx-search-icon{ color:var(--amber); }
        .nx-search input{
          background:none;
          border:none;
          outline:none;
          color:var(--paper);
          font-size:.87rem;
          width:100%;
          font-family:'Work Sans', sans-serif;
        }
        .nx-search input::placeholder{ color:rgba(251,247,236,0.4); }

        .nx-search-kbd{
          font-family:'Space Mono', monospace;
          font-size:.7rem;
          color:rgba(251,247,236,0.5);
          background:rgba(251,247,236,0.08);
          border:1px solid rgba(251,247,236,0.16);
          border-radius:5px;
          padding:1px 6px;
          line-height:1.4;
          flex-shrink:0;
        }
        .nx-search-clear{
          background:rgba(251,247,236,0.1);
          border:none;
          color:rgba(251,247,236,0.7);
          width:18px; height:18px;
          border-radius:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:.8rem;
          cursor:pointer;
          flex-shrink:0;
          transition:background .15s ease, color .15s ease;
        }
        .nx-search-clear:hover{ background:rgba(181,72,47,0.6); color:var(--paper); }

        .nx-search-mobile{ display:none; width:100%; }

        .nx-toggle{
          display:none;
          background:none;
          border:none;
          color:var(--paper);
          font-size:1.4rem;
          cursor:pointer;
          padding:4px;
        }

        @media (max-width: 860px){
          .nx-search-desktop{ display:none; }
          .nx-toggle{ display:flex; align-items:center; }
          .nx-links{
            position:absolute;
            top:100%;
            left:0;
            right:0;
            background:var(--navy);
            flex-direction:column;
            align-items:stretch;
            gap:4px;
            padding:0 18px;
            max-height:0;
            overflow:hidden;
            transition:max-height .25s ease, padding .25s ease;
          }
          .nx-links.open{
            max-height:420px;
            padding:14px 18px 20px;
            box-shadow:0 12px 20px -10px rgba(0,0,0,.3);
          }
          .nx-link{ text-align:left; width:100%; }
          .nx-search-mobile{
            display:flex;
            margin-top:8px;
          }
        }
      `}</style>
    </header>
  );
}

export default Navbar;