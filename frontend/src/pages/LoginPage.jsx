import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email.trim())) {
      errs.email = 'Enter a valid email address.';
    }
    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);

setTimeout(() => {

  setLoading(false);

  if (email === "admin@gmail.com" && password === "admin123") {

    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Welcome Admin!",
      timer: 1500,
      showConfirmButton: false,
    });

    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard");

  } else {

    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid Email or Password",
    });

  }

}, 1200);
  };

  return (
    <div className="login-page">
      <div className="login-blob login-blob-1"></div>
      <div className="login-blob login-blob-2"></div>
      <div className="login-blob login-blob-3"></div>

      <div className="login-shell">

        <div className="login-brand-panel">
          <div className="brand-top">
            <span className="brand-icon"><i className="bi bi-ticket-perforated-fill"></i></span>
            <span className="brand-text">Event<span className="brand-accent">Nxt</span></span>
          </div>

          <div className="brand-mid">
            <h1>Welcome back to your event command center</h1>
            <p>Track registrations, manage guests, and keep every detail organized, all in one place.</p>
          </div>

          <div className="brand-stats">
            <div className="brand-stat">
              <div className="brand-stat-value">2.4k+</div>
              <div className="brand-stat-label">Guests registered</div>
            </div>
            <div className="brand-stat">
              <div className="brand-stat-value">340+</div>
              <div className="brand-stat-label">Events hosted</div>
            </div>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="form-wrap">
            <div className="form-eyebrow"><i className="bi bi-shield-lock-fill"></i> Sign in</div>
            <h2>Log in to your account</h2>
            <p className="form-subtext">Enter your details to access your dashboard.</p>

            <button type="button" className="social-btn google-btn">
              <i className="bi bi-google"></i> Continue with Google
            </button>

            <div className="divider">
              <span>or continue with email</span>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="field-group">
                <label htmlFor="email">Email address</label>
                <div className={'input-wrap' + (errors.email ? ' input-error' : '')}>
                  <i className="bi bi-envelope"></i>
                  <input
                    id="email"
                    type="text"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {errors.email ? <span className="error-text">{errors.email}</span> : null}
              </div>

              <div className="field-group">
                <div className="label-row">
                  <label htmlFor="password">Password</label>
                </div>
                <div className={'input-wrap' + (errors.password ? ' input-error' : '')}>
                  <i className="bi bi-lock"></i>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="toggle-visibility"
                    onClick={() => setShowPassword(function (s) { return !s; })}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                  </button>
                </div>
                {errors.password ? <span className="error-text">{errors.password}</span> : null}
                <button type="button" className="forgot-link">Forgot password?</button>
              </div>

              <div className="remember-row">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label htmlFor="remember" className="checkbox-fake"></label>
                <label htmlFor="remember" className="remember-label">Remember me for 30 days</label>
              </div>

              <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner"></span>
                ) : (
                  <span>Log in <i className="bi bi-arrow-right"></i></span>
                )}
              </button>
            </form>

            <p className="signup-text">
              Do not have an account?{' '}
              <button type="button" className="signup-link">Sign up</button>
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .login-page {
          position: relative;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #211B3D;
          background: linear-gradient(135deg, #EFEDFF 0%, #FDEFF5 50%, #E7FAFC 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          overflow: hidden;
          box-sizing: border-box;
        }
        .login-page * { box-sizing: border-box; }

        .login-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.45;
        }
        .login-blob-1 { width: 360px; height: 360px; background: #6D5DF6; top: -100px; left: -100px; }
        .login-blob-2 { width: 300px; height: 300px; background: #FF7A5C; bottom: -100px; right: -80px; }
        .login-blob-3 { width: 240px; height: 240px; background: #22C9E0; top: 50%; right: 20%; opacity: 0.3; }

        .login-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1000px;
          display: flex;
          background: #fff;
          border-radius: 26px;
          overflow: hidden;
          box-shadow: 0 40px 80px -30px rgba(33,27,61,0.35);
        }

        .login-brand-panel {
          flex: 1;
          min-width: 320px;
          background: linear-gradient(150deg, #6D5DF6 0%, #8B5FF6 35%, #EC4488 75%, #F0573A 100%);
          color: #fff;
          padding: 44px 40px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .brand-top { display: flex; align-items: center; gap: 10px; }
        .brand-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
        }
        .brand-text {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.3rem;
        }
        .brand-accent { color: #FFE08A; }

        .brand-mid { margin: 50px 0; }
        .brand-mid h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.9rem;
          line-height: 1.3;
          margin: 0 0 14px;
          letter-spacing: -0.01em;
        }
        .brand-mid p {
          font-size: 0.96rem;
          line-height: 1.6;
          color: rgba(255,255,255,0.85);
          margin: 0;
        }

        .brand-stats { display: flex; gap: 36px; }
        .brand-stat-value {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
        }
        .brand-stat-label {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.75);
        }

        .login-form-panel {
          flex: 1;
          min-width: 340px;
          padding: 48px 44px;
          display: flex;
          align-items: center;
        }
        .form-wrap { width: 100%; max-width: 380px; margin: 0 auto; }

        .form-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 0.74rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5645D6;
          margin-bottom: 10px;
        }
        .form-wrap h2 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.6rem;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .form-subtext { color: #6E6B85; font-size: 0.92rem; margin: 0 0 24px; }

        .social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 1.5px solid #E5E2F5;
          background: #fff;
          color: #211B3D;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 11px;
          border-radius: 12px;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease;
        }
        .social-btn:hover { border-color: #6D5DF6; background: #FAF9FF; }
        .google-btn i { color: #6D5DF6; }

        .divider {
          display: flex;
          align-items: center;
          margin: 22px 0;
          color: #9A97B0;
          font-size: 0.78rem;
        }
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: #E5E2F5;
        }
        .divider span { padding: 0 12px; white-space: nowrap; }

        .field-group { margin-bottom: 18px; }
        .field-group label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #211B3D;
          margin-bottom: 7px;
        }
        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-link {
          background: none;
          border: none;
          color: #5645D6;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          margin-top: 8px;
        }

        .input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid #E5E2F5;
          border-radius: 12px;
          padding: 11px 14px;
          background: #FAFAFE;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .input-wrap:focus-within {
          border-color: #6D5DF6;
          box-shadow: 0 0 0 3px rgba(109,93,246,0.14);
          background: #fff;
        }
        .input-wrap.input-error {
          border-color: #F0573A;
          box-shadow: 0 0 0 3px rgba(240,87,58,0.1);
        }
        .input-wrap i { color: #9A97B0; font-size: 0.95rem; }
        .input-wrap input {
          border: none;
          outline: none;
          background: none;
          font-size: 0.92rem;
          width: 100%;
          color: #211B3D;
          font-family: 'Inter', sans-serif;
        }
        .toggle-visibility {
          background: none;
          border: none;
          color: #9A97B0;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }
        .toggle-visibility:hover { color: #6D5DF6; }

        .error-text {
          display: block;
          color: #F0573A;
          font-size: 0.78rem;
          margin-top: 6px;
        }

        .remember-row {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 0.86rem;
          color: #6E6B85;
          margin-bottom: 22px;
        }
        .remember-row input[type="checkbox"] {
          position: absolute;
          opacity: 0;
          width: 18px;
          height: 18px;
          margin: 0;
          cursor: pointer;
        }
        .checkbox-fake {
          width: 18px; height: 18px;
          border: 1.5px solid #D8D5EC;
          border-radius: 5px;
          flex-shrink: 0;
          position: relative;
          display: inline-block;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }
        .remember-row input:checked + .checkbox-fake {
          background: linear-gradient(135deg, #6D5DF6, #EC4488);
          border-color: transparent;
        }
        .remember-row input:checked + .checkbox-fake::after {
          content: '';
          position: absolute;
          left: 5px; top: 1px;
          width: 5px; height: 9px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .remember-label { cursor: pointer; margin-bottom: 0; font-weight: 400 !important; }

        .login-btn {
          width: 100%;
          border: none;
          border-radius: 12px;
          padding: 13px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          color: #fff;
          background: linear-gradient(135deg, #6D5DF6, #EC4488);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
          box-shadow: 0 14px 28px -12px rgba(109,93,246,0.5);
        }
        .login-btn:hover { transform: translateY(-1px); }
        .login-btn:active { transform: translateY(0) scale(0.98); }
        .login-btn:disabled { opacity: 0.75; cursor: not-allowed; }

        .spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        .signup-text {
          text-align: center;
          font-size: 0.86rem;
          color: #6E6B85;
          margin: 22px 0 0;
        }
        .signup-link {
          background: none;
          border: none;
          color: #5645D6;
          font-weight: 700;
          cursor: pointer;
          padding: 0;
        }

        @media (max-width: 860px) {
          .login-shell { flex-direction: column; max-width: 460px; }
          .login-brand-panel { padding: 36px 32px; }
          .brand-mid { margin: 32px 0; }
          .brand-mid h1 { font-size: 1.5rem; }
          .login-form-panel { padding: 36px 32px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .spinner { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default LoginPage;