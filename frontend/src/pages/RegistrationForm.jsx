import { useState } from 'react';
import Swal from "sweetalert2";

function RegistrationForm() {
  const [ticketNumber] = useState(
    () => 'GA-' + Math.floor(100000 + Math.random() * 900000)
  );
  const [fullName, setFullName] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [contact, setContact] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('UNPAID');
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const contactPattern = /^([\w.+-]+@[\w-]+\.[a-zA-Z]{2,}|\+?\d{7,15})$/;

  const nameValid = fullName.trim().length >= 2;
  const contactValid = contactPattern.test(contact.trim());

  const dec = () => setTicketCount((c) => Math.max(1, c - 1));
  const inc = () => setTicketCount((c) => Math.min(10, c + 1));

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!nameValid || !contactValid) {
    setShowErrors(true);
    return;
  }

  const registrationData = {
    userName: fullName,
    ticketCount: ticketCount,
    contact: contact,
    paymentStatus: paymentStatus,
  };

  try {
    const response = await fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    const data = await response.json();
    Swal.fire({
  icon: "success",
  title: "Success!",
  text: "Registration Added Successfully",
  confirmButtonColor: "#3085d6",
});


    alert(data.message);

    setSubmitted(true);

  } catch (error) {
    console.log(error);
    alert("Registration Failed");
  }
};

  const handleReset = () => {
    setFullName('');
    setTicketCount(1);
    setContact('');
    setPaymentStatus('UNPAID');
    setSubmitted(false);
    setShowErrors(false);
  };

  return (
    <div className="ticket-page">
      <div className="page-tag">One night only &middot; doors open at 7pm</div>

      <div className="ticket-wrap">
        <div className="ticket">
          <div className="ticket-stub">
            <div className="stub-rotated">
              Admit One <span>&bull;</span> Event Pass
            </div>
            <div className="stub-number">{ticketNumber}</div>
            <div className="stub-preview">
              <div className="preview-label">Reserved for</div>
              <div className={`preview-name ${fullName.trim() ? '' : 'is-placeholder'}`}>
                {fullName.trim() || 'Your name here'}
              </div>
              <div className="preview-count">
                {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'}
              </div>
            </div>
            <div className={`stub-stamp ${submitted ? 'show' : ''}`}>
              <i className="bi bi-check-circle-fill" /> Confirmed
            </div>
          </div>

          <div className="seam" aria-hidden="true" />

          <div className="ticket-main">
            {!submitted ? (
              <>
                <div className="eyebrow">Event Registration</div>
                <h1>Reserve your seat</h1>
                <p className="subtext">
                  Fill in your details below — we'll save your spot at the door.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full name</label>
                    <input
                      type="text"
                      id="fullName"
                      className={`form-control ${showErrors && !nameValid ? 'is-invalid' : ''}`}
                      placeholder="e.g. Sidharth malhotra"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {showErrors && !nameValid && (
                      <div className="invalid-feedback d-block">Enter at least 2 characters.</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="ticketCount" className="form-label">Number of tickets</label>
                    <div className="input-group ticket-count-group">
                      <button className="btn" type="button" aria-label="Decrease ticket count" onClick={dec}>
                        −
                      </button>
                      <input
                        type="number"
                        id="ticketCount"
                        className="form-control"
                        min="1"
                        max="100"
                        value={ticketCount}
                        onChange={(e) =>
                          setTicketCount(Math.min(10, Math.max(1, Number(e.target.value) || 1)))
                        }
                      />
                      <button className="btn" type="button" aria-label="Increase ticket count" onClick={inc}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="contact" className="form-label">Email or phone</label>
                    <input
                      type="text"
                      id="contact"
                      className={`form-control ${showErrors && !contactValid ? 'is-invalid' : ''}`}
                      placeholder="you@example.com or +91 98765 43210"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                    {showErrors && !contactValid && (
                      <div className="invalid-feedback d-block">
                        Enter a valid email address or phone number.
                      </div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Payment status</label>
                    <div className="status-toggle">
                      <input
                        type="radio"
                        name="paymentStatus"
                        id="statusPaid"
                        checked={paymentStatus === 'PAID'}
                        onChange={() => setPaymentStatus('PAID')}
                      />
                      <label htmlFor="statusPaid" className="label-paid">
                        <i className="bi bi-check2-circle" />Paid
                      </label>

                      <input
                        type="radio"
                        name="paymentStatus"
                        id="statusUnpaid"
                        checked={paymentStatus === 'UNPAID'}
                        onChange={() => setPaymentStatus('UNPAID')}
                      />
                      <label htmlFor="statusUnpaid" className="label-unpaid">
                        <i className="bi bi-hourglass-split" />Unpaid
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn-reserve">Reserve my spot</button>
                  <p className="privacy-note">
                    <i className="bi bi-shield-lock" />We'll only use your contact info for event updates.
                  </p>
                </form>
              </>
            ) : (
              <div className="success-msg">
                <i className="bi bi-ticket-perforated icon" />
                <h2>You're on the list!</h2>
                <p>A confirmation has been sent to {contact}.</p>
                <button className="btn-reset" onClick={handleReset}>
                  Register another guest
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .ticket-page{
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
          background:
            radial-gradient(circle at 29% 15%, rgba(240, 110, 242, 0.18), transparent 50%),
            radial-gradient(circle at 85% 85%, rgba(64, 140, 248, 0.2), transparent 55%),
            linear-gradient(150deg,
              var(--navy) 0%,
              var(--navy) 12%,
              #3A3A56 30%,
              #6B6048 48%,
              var(--gold-deep) 68%,
              var(--gold) 100%);
          min-height:100vh;
          font-family:'Work Sans', sans-serif;
          color:var(--ink);
          display:flex;
          align-items:center;
          justify-content:center;
          padding:32px 16px;
          box-sizing:border-box;
        }
        .ticket-page *{ box-sizing:border-box; }

        .ticket-page .page-tag{
          position:absolute;
          top:24px;
          left:50%;
          transform:translateX(-50%);
          color:rgba(251,247,236,0.7);
          font-family:'Space Mono', monospace;
          font-size:.72rem;
          letter-spacing:.18em;
          text-transform:uppercase;
        }

        .ticket-page .ticket-wrap{ width:100%; max-width:760px; }

        .ticket-page .ticket{
          display:flex;
          background:var(--paper);
          border-radius:18px;
          overflow:visible;
          position:relative;
          box-shadow:0 35px 70px -25px rgba(15,20,40,.55), 0 0 0 1px rgba(255,255,255,.08);
        }

        .ticket-page .ticket-stub{
          width:178px;
          flex-shrink:0;
          background:
            repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 14px),
            var(--navy);
          color:var(--paper);
          border-radius:18px 0 0 18px;
          padding:26px 14px;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:space-between;
          text-align:center;
          position:relative;
        }

        .ticket-page .stub-rotated{
          writing-mode:vertical-rl;
          transform:rotate(180deg);
          font-family:'Oswald', sans-serif;
          font-weight:600;
          letter-spacing:.22em;
          font-size:.82rem;
          color:var(--amber);
          text-transform:uppercase;
          flex:1;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:10px 0;
        }
        .ticket-page .stub-rotated span{ color:rgba(251,247,236,0.4); margin:0 4px; }

        .ticket-page .stub-number{
          font-family:'Space Mono', monospace;
          font-size:.78rem;
          letter-spacing:.06em;
          color:rgba(251,247,236,0.7);
          margin-top:10px;
        }

        .ticket-page .stub-preview{
          width:100%;
          border-top:1px dashed rgba(251,247,236,0.25);
          padding-top:10px;
          margin-top:10px;
        }
        .ticket-page .preview-label{
          font-size:.62rem;
          letter-spacing:.14em;
          text-transform:uppercase;
          color:rgba(251,247,236,0.45);
        }
        .ticket-page .preview-name{
          font-family:'Oswald', sans-serif;
          font-size:.95rem;
          font-weight:600;
          color:var(--paper);
          margin-top:2px;
          word-break:break-word;
        }
        .ticket-page .preview-name.is-placeholder{ color:rgba(251,247,236,0.35); font-weight:400; font-style:italic; }
        .ticket-page .preview-count{
          font-family:'Space Mono', monospace;
          font-size:.72rem;
          color:var(--amber);
          margin-top:4px;
        }

        .ticket-page .stub-stamp{
          margin-top:12px;
          font-family:'Oswald', sans-serif;
          font-size:.72rem;
          letter-spacing:.12em;
          color:var(--teal);
          background:rgba(251,247,236,0.08);
          border:1.5px solid var(--teal);
          border-radius:999px;
          padding:5px 10px;
          opacity:0;
          transform:scale(.6) rotate(-12deg);
          transition:opacity .45s ease, transform .45s cubic-bezier(.34,1.56,.64,1);
        }
        .ticket-page .stub-stamp.show{
          opacity:1;
          transform:scale(1) rotate(-8deg);
          color:#7FD9A8;
          border-color:#7FD9A8;
        }

        .ticket-page .ticket::before, .ticket-page .ticket::after{
          content:"";
          position:absolute;
          left:178px;
          width:26px;
          height:26px;
          background:var(--navy-deep);
          border-radius:50%;
          transform:translate(-50%, -50%);
          z-index:2;
        }
        .ticket-page .ticket::before{ top:0; }
        .ticket-page .ticket::after{ top:100%; }

        .ticket-page .seam{
          position:absolute;
          left:178px;
          top:14px;
          bottom:14px;
          width:0;
          border-left:2px dashed rgba(28,37,65,0.18);
          z-index:1;
        }

        .ticket-page .ticket-main{
          flex:1;
          padding:36px 36px 30px;
          min-width:0;
        }

        .ticket-page .eyebrow{
          font-family:'Space Mono', monospace;
          font-size:.7rem;
          letter-spacing:.2em;
          text-transform:uppercase;
          color:var(--teal);
          margin-bottom:6px;
        }

        .ticket-page h1{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.9rem;
          color:var(--ink);
          margin-bottom:6px;
          letter-spacing:.01em;
        }

        .ticket-page .subtext{
          color:var(--muted);
          font-size:.92rem;
          margin-bottom:24px;
        }

        .ticket-page .form-label{
          font-weight:600;
          font-size:.83rem;
          color:var(--ink);
          margin-bottom:6px;
        }

        .ticket-page .form-control, .ticket-page .form-select{
          border:1.5px solid #E3DDCB;
          border-radius:10px;
          padding:.62rem .8rem;
          font-size:.94rem;
          background:#FFFEFB;
        }
        .ticket-page .form-control:focus, .ticket-page .form-select:focus{
          border-color:var(--teal);
          box-shadow:0 0 0 .18rem rgba(47,111,107,0.15);
        }
        .ticket-page .form-control.is-invalid{ border-color:var(--unpaid); }
        .ticket-page .invalid-feedback{ font-size:.78rem; color:var(--unpaid); }

        .ticket-page .ticket-count-group .btn{
          border:1.5px solid #E3DDCB;
          background:#FFFEFB;
          color:var(--ink);
          font-weight:600;
          width:42px;
        }
        .ticket-page .ticket-count-group .btn:hover{ background:#F1ECDD; }
        .ticket-page .ticket-count-group input{
          text-align:center;
          font-weight:600;
          border-left:none;
          border-right:none;
          border-radius:0 !important;
        }
        .ticket-page .ticket-count-group .btn:first-child{ border-radius:10px 0 0 10px !important; }
        .ticket-page .ticket-count-group .btn:last-child{ border-radius:0 10px 10px 0 !important; }

        .ticket-page .status-toggle{ display:flex; gap:10px; }
        .ticket-page .status-toggle input{ display:none; }
        .ticket-page .status-toggle label{
          flex:1;
          text-align:center;
          padding:.6rem .5rem;
          border:1.5px solid #E3DDCB;
          border-radius:10px;
          font-weight:600;
          font-size:.88rem;
          color:var(--muted);
          background:#FFFEFB;
          cursor:pointer;
          transition:all .15s ease;
        }
        .ticket-page .status-toggle input:checked + label.label-paid{
          background:rgba(47,111,107,0.1);
          border-color:var(--teal);
          color:var(--teal);
        }
        .ticket-page .status-toggle input:checked + label.label-unpaid{
          background:rgba(181,72,47,0.08);
          border-color:var(--unpaid);
          color:var(--unpaid);
        }
        .ticket-page .status-toggle label i{ margin-right:6px; }
        .ticket-page .status-toggle input:focus-visible + label{
          outline:2px solid var(--teal);
          outline-offset:2px;
        }

        .ticket-page .btn-reserve{
          width:100%;
          background:var(--navy);
          border:none;
          color:var(--paper);
          font-family:'Oswald', sans-serif;
          font-weight:600;
          letter-spacing:.04em;
          text-transform:uppercase;
          font-size:.92rem;
          padding:.72rem 1rem;
          border-radius:10px;
          margin-top:8px;
          transition:background .15s ease, transform .1s ease;
        }
        .ticket-page .btn-reserve:hover{ background:var(--navy-deep); }
        .ticket-page .btn-reserve:active{ transform:scale(.98); }
        .ticket-page .btn-reserve:focus-visible{ outline:2px solid var(--navy); outline-offset:2px; }

        .ticket-page .privacy-note{
          font-size:.74rem;
          color:var(--muted);
          margin-top:12px;
          text-align:center;
        }
        .ticket-page .privacy-note i{ color:var(--teal); margin-right:4px; }

        .ticket-page .success-msg{ text-align:center; padding:18px 0 6px; }
        .ticket-page .success-msg .icon{
          font-size:2.4rem;
          color:var(--teal);
          margin-bottom:10px;
          display:block;
        }
        .ticket-page .success-msg h2{
          font-family:'Oswald', sans-serif;
          font-size:1.4rem;
          color:var(--ink);
          margin-bottom:6px;
        }
        .ticket-page .success-msg p{ color:var(--muted); font-size:.9rem; margin-bottom:18px; }
        .ticket-page .success-msg .btn-reset{
          background:transparent;
          border:1.5px solid var(--ink);
          color:var(--ink);
          border-radius:10px;
          padding:.5rem 1.2rem;
          font-weight:600;
          font-size:.85rem;
        }
        .ticket-page .success-msg .btn-reset:hover{ background:var(--ink); color:var(--paper); }

        @media (max-width: 575.98px){
          .ticket-page .ticket{ flex-direction:column; }
          .ticket-page .ticket-stub{
            width:100%;
            border-radius:18px 18px 0 0;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
            padding:16px 18px;
            gap:14px;
          }
          .ticket-page .stub-rotated{
            writing-mode:horizontal-tb;
            transform:none;
            flex:1;
            justify-content:flex-start;
            padding:0;
            font-size:.74rem;
          }
          .ticket-page .stub-number{ margin:0; white-space:nowrap; }
          .ticket-page .stub-preview{ display:none; }
          .ticket-page .stub-stamp{ display:none; }
          .ticket-page .ticket::before, .ticket-page .ticket::after, .ticket-page .seam{ display:none; }
          .ticket-page .ticket-main{ padding:28px 22px 24px; border-top:2px dashed #cbe3d3; }
          .ticket-page h1{ font-size:1.55rem; }
        }

        @media (prefers-reduced-motion: reduce){
          .ticket-page .stub-stamp, .ticket-page .btn-reserve, .ticket-page .status-toggle label{ transition:none !important; }
        }
      `}</style>
    </div>
  );
}

export default RegistrationForm;