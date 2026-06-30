import { useState,useEffect } from "react";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { QRCodeCanvas } from "qrcode.react";


const avatarPalette = ['var(--navy)', 'var(--teal)', 'var(--gold-deep)'];

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function avatarColor(name) {
  const sum = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
}

function RegistrationList() {
  const [regs, setRegs] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: '', ticketCount: 1, contact: '', status: 'PAID' });
  const [showQR, setShowQR] = useState(false);
const [selectedReg, setSelectedReg] = useState(null);
  

 useEffect(() => {
  fetchRegistrations();
}, []);

async function fetchRegistrations() {
  try {
    const response = await fetch("http://localhost:3000/registrations");
    const data = await response.json();

    console.log(data);

    setRegs(data);
  } catch (error) {
    console.log(error);
  }
}

  const filtered = regs.filter((r) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q || r.userName.toLowerCase().includes(q) || r.contact.toLowerCase().includes(q);
    const matchesStatus = statusFilter === 'All' || r.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalGuests = regs.length;
  const totalTickets = regs.reduce((sum, r) => sum + r.ticketCount, 0);
  const paidCount = regs.filter((r) => r.paymentStatus === 'PAID').length;
  const unpaidCount = regs.filter((r) => r.paymentStatus === 'UNPAID').length;

  const startEdit = (reg) => {
    setEditingId(reg._id);
    setDraft({ name: reg.userName, tickets: reg.ticketCount, contact: reg.contact, status: reg.paymentStatus });
  };

  const cancelEdit = () => setEditingId(null);

  const saveEdit = async (id) => {
  if (!draft.name.trim()) return;

  try {
    await fetch(`http://localhost:3000/registrations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: draft.name,
        ticketCount: draft.tickets,
        contact: draft.contact,
        paymentStatus: draft.status,
      }),
    });

    fetchRegistrations(); // Updated list refresh cheyyum
    setEditingId(null);

  } catch (error) {
    console.log(error);
  }
};

  const handleDelete = async (id) => {
 const result = await Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to recover this registration!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: "Yes, delete it!",
});
if (!result.isConfirmed) return;

  try {
    await fetch(`http://localhost:3000/registrations/${id}`, {
      method: "DELETE",
    });
Swal.fire({
  icon: "success",
  title: "Deleted!",
  text: "Registration deleted successfully.",
  timer: 1500,
  showConfirmButton: false,
});
    fetchRegistrations(); // delete kazhinjal list refresh cheyyum
  } catch (error) {
    console.log(error);
  }
};

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('All');
  };
  const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Event Registration List", 14, 20);

  autoTable(doc, {
    startY: 30,
    head: [["Name", "Tickets", "Contact", "Payment"]],
    body: regs.map((reg) => [
      reg.userName,
      reg.ticketCount,
      reg.contact,
      reg.paymentStatus,
    ]),
  });

  doc.save("Event_Registrations.pdf");
};

  return (
    <div className="reglist-page">
      <div className="reglist-wrap">
        <div className="reglist-card">

          <div className="reglist-header">
            <div>
              <div className="reglist-eyebrow">Event Registrations</div>
              <h1>Guest List</h1>
              <p className="reglist-subtext">Everyone who's reserved a seat so far.</p>
            </div>
          </div>

          <button
           className="btn btn-danger"
           onClick={exportPDF}
>
  <i className="bi bi-file-earmark-pdf-fill"></i> Export PDF
</button>

          <div className="reglist-stats">
            <div className="stat-pill">
              <i className="bi bi-people" />
              <div>
                <div className="stat-value">{totalGuests}</div>
                <div className="stat-label">Guests</div>
              </div>
            </div>
            <div className="stat-pill">
              <i className="bi bi-ticket-perforated" />
              <div>
                <div className="stat-value">{totalTickets}</div>
                <div className="stat-label">Tickets</div>
              </div>
            </div>
            <div className="stat-pill stat-paid">
              <i className="bi bi-check2-circle" />
              <div>
                <div className="stat-value">{paidCount}</div>
                <div className="stat-label">Paid</div>
              </div>
            </div>
            <div className="stat-pill stat-unpaid">
              <i className="bi bi-hourglass-split" />
              <div>
                <div className="stat-value">{unpaidCount}</div>
                <div className="stat-label">Unpaid</div>
              </div>
            </div>
          </div>

          <div className="reglist-toolbar">
            <div className="search-box">
              <i className="bi bi-search" />
              <input
                type="text"
                placeholder="Search by name or contact..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>

          <p className="reglist-count">
            Showing {filtered.length} of {totalGuests} guests
          </p>

          <div className="table-scroll">
            <table className="reglist-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Tickets</th>
                  <th>Contact</th>
                  <th>Status</th>
                  <th>Qr code</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((reg) =>
                  editingId === reg._id ? (
                    <tr key={reg._id} className="editing-row">
                      <td>
                        <input
                          className="edit-input"
                          value={draft.name}
                          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          className="edit-input edit-input-narrow"
                          value={draft.tickets}
                          onChange={(e) => setDraft({ ...draft, tickets: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          className="edit-input"
                          value={draft.contact}
                          onChange={(e) => setDraft({ ...draft, contact: e.target.value })}
                        />
                      </td>
                      <td>
                        <select
                          className="edit-input"
                          value={draft.status}
                          onChange={(e) => setDraft({ ...draft, status: e.target.value })}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Unpaid">Unpaid</option>
                        </select>
                      </td>
                      <td className="actions-col">
                        <button className="icon-btn icon-btn-save" onClick={() => saveEdit(reg._id)} aria-label="Save">
                          <i className="bi bi-check2" />
                        </button>
                        <button className="icon-btn icon-btn-cancel" onClick={cancelEdit} aria-label="Cancel">
                          <i className="bi bi-x" />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={reg._id}>
                      <td>
                        <div className="guest-cell">
                          <span className="avatar" style={{ background: avatarColor(reg.userName) }}>
                            {initials(reg.userName)}
                          </span>
                          {reg.userName}
                        </div>
                      </td>
                      <td>
                        <span className="ticket-chip">
                          <i className="bi bi-ticket-perforated" /> {reg.ticketCount}
                        </span>
                      </td>
                      <td className="contact-cell">{reg.contact}</td>
                      <td>
                        <span className={`status-badge ${reg.paymentStatus === 'PAID' ? 'badge-paid' : 'badge-unpaid'}`}>
                          <i className={reg.paymentStatus === 'Paid' ? 'bi bi-check2-circle' : 'bi bi-hourglass-split'} />
                          {reg.paymentStatus}
                        </span>
                      </td>
                     <td>
  <div
    style={{ cursor: "pointer" }}
    onClick={() => {
      setSelectedReg(reg);
      setShowQR(true);
    }}
  >
    <QRCodeCanvas
      value={`
Name: ${reg.userName}
Tickets: ${reg.ticketCount}
Contact: ${reg.contact}
Payment: ${reg.paymentStatus}
`}
      size={70}
    />
  </div>
</td>
                      <td className="actions-col">
                        <button className="icon-btn icon-btn-edit" onClick={() => startEdit(reg)} aria-label="Edit">
                          <i className="bi bi-pencil" />
                        </button>
                        <button className="icon-btn icon-btn-delete" onClick={() => handleDelete(reg._id)} aria-label="Delete">
                          <i className="bi bi-trash" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="empty-state">
                <i className="bi bi-ticket-perforated" />
                <h3>No registrations found</h3>
                <p>Try a different search term or filter.</p>
                <button className="clear-btn" onClick={clearFilters}>Clear filters</button>
              </div>
            )}
          </div>
          {showQR && selectedReg && (
  <div className="qr-overlay">
    <div className="qr-popup">

      <h2>Registration QR Code</h2>

      <QRCodeCanvas
        value={`
Name: ${selectedReg.userName}
Tickets: ${selectedReg.ticketCount}
Contact: ${selectedReg.contact}
Payment: ${selectedReg.paymentStatus}
`}
        size={220}
      />

      <h3>{selectedReg.userName}</h3>

      <p>🎫 Tickets : {selectedReg.ticketCount}</p>

      <p>📞 {selectedReg.contact}</p>

      <p>💳 {selectedReg.paymentStatus}</p>

      <button
        className="btn btn-danger"
        onClick={() => setShowQR(false)}
      >
        Close
      </button>

    </div>
  </div>
)}

        </div>
      </div>

      <style>{`
        .reglist-page{
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
            radial-gradient(circle at 20% 15%, rgba(255,224,160,0.18), transparent 50%),
            radial-gradient(circle at 85% 85%, rgba(212,162,76,0.20), transparent 55%),
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
          padding:48px 16px;
          box-sizing:border-box;
        }
        .reglist-page *{ box-sizing:border-box; }

        .reglist-wrap{ max-width:980px; margin:0 auto; }

        .reglist-card{
          background:var(--paper);
          border-radius:18px;
          padding:32px 32px 24px;
          box-shadow:0 35px 70px -25px rgba(15,20,40,.55), 0 0 0 1px rgba(255,255,255,.08);
        }

        .reglist-eyebrow{
          font-family:'Space Mono', monospace;
          font-size:.7rem;
          letter-spacing:.2em;
          text-transform:uppercase;
          color:var(--teal);
          margin-bottom:6px;
        }
        .reglist-header h1{
          font-family:'Oswald', sans-serif;
          font-weight:700;
          font-size:1.9rem;
          color:var(--ink);
          margin:0 0 4px;
        }
        .reglist-subtext{ color:var(--muted); font-size:.92rem; margin:0; }

        .reglist-stats{
          display:flex;
          flex-wrap:wrap;
          gap:12px;
          margin:22px 0;
        }
        .stat-pill{
          flex:1;
          min-width:130px;
          display:flex;
          align-items:center;
          gap:10px;
          background:#FFFEFB;
          border:1.5px solid #E3DDCB;
          border-radius:12px;
          padding:12px 14px;
        }
        .stat-pill i{ font-size:1.2rem; color:var(--navy); }
        .stat-pill.stat-paid i{ color:var(--teal); }
        .stat-pill.stat-unpaid i{ color:var(--unpaid); }
        .stat-value{ font-family:'Oswald', sans-serif; font-weight:700; font-size:1.15rem; line-height:1; }
        .stat-label{ font-size:.72rem; color:var(--muted); text-transform:uppercase; letter-spacing:.06em; margin-top:2px; }

        .reglist-toolbar{
          display:flex;
          gap:10px;
          flex-wrap:wrap;
          margin-bottom:8px;
        }
        .search-box{
          flex:1;
          min-width:200px;
          display:flex;
          align-items:center;
          gap:8px;
          background:#FFFEFB;
          border:1.5px solid #E3DDCB;
          border-radius:10px;
          padding:.55rem .8rem;
        }
        .search-box i{ color:var(--muted); }
        .search-box input{
          border:none;
          outline:none;
          background:transparent;
          font-size:.9rem;
          width:100%;
          color:var(--ink);
        }
        .status-select{
          border:1.5px solid #E3DDCB;
          border-radius:10px;
          padding:.55rem .8rem;
          background:#FFFEFB;
          font-size:.88rem;
          color:var(--ink);
        }
        .search-box:focus-within, .status-select:focus{
          border-color:var(--teal);
          box-shadow:0 0 0 .15rem rgba(47,111,107,0.15);
        }

        .reglist-count{
          font-size:.78rem;
          color:var(--muted);
          margin:0 0 12px;
        }

        .table-scroll{ overflow-x:auto; border-radius:12px; }

        .reglist-table{
          width:100%;
          border-collapse:separate;
          border-spacing:0;
          font-size:.9rem;
          min-width:640px;
        }
        .reglist-table thead th{
          background:var(--navy);
          color:var(--paper);
          font-family:'Oswald', sans-serif;
          font-weight:600;
          font-size:.74rem;
          letter-spacing:.08em;
          text-transform:uppercase;
          text-align:left;
          padding:12px 14px;
        }
        .reglist-table thead th:first-child{ border-radius:10px 0 0 0; }
        .reglist-table thead th:last-child{ border-radius:0 10px 0 0; }

        .reglist-table tbody tr{
          background:#FFFEFB;
          border-bottom:1px solid #EEE7D4;
          transition:background .12s ease;
        }
        .reglist-table tbody tr:nth-child(even){ background:#FBF6E9; }
        .reglist-table tbody tr:hover{ background:rgba(47,111,107,0.06); }
        .reglist-table td{ padding:12px 14px; vertical-align:middle; color:var(--ink); }

        .guest-cell{ display:flex; align-items:center; gap:10px; font-weight:600; }
        .avatar{
          width:32px; height:32px;
          border-radius:50%;
          color:var(--paper);
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:'Oswald', sans-serif;
          font-size:.75rem;
          font-weight:700;
          flex-shrink:0;
        }

        .ticket-chip{
          display:inline-flex;
          align-items:center;
          gap:6px;
          background:rgba(22,35,74,0.06);
          border-radius:999px;
          padding:3px 10px;
          font-family:'Space Mono', monospace;
          font-size:.8rem;
          color:var(--navy);
        }

        .contact-cell{ color:var(--muted); }

        .status-badge{
          display:inline-flex;
          align-items:center;
          gap:6px;
          padding:4px 10px;
          border-radius:999px;
          font-size:.78rem;
          font-weight:600;
        }
        .badge-paid{ background:rgba(47,111,107,0.12); color:var(--teal); }
        .badge-unpaid{ background:rgba(181,72,47,0.10); color:var(--unpaid); }

        .actions-col{ white-space:nowrap; }
        .icon-btn{
          width:32px; height:32px;
          border-radius:8px;
          border:1.5px solid #E3DDCB;
          background:#FFFEFB;
          margin-right:6px;
          cursor:pointer;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          transition:background .12s ease, border-color .12s ease;
        }
        .icon-btn-edit{ color:var(--teal); }
        .icon-btn-edit:hover{ background:rgba(47,111,107,0.1); border-color:var(--teal); }
        .icon-btn-delete{ color:var(--unpaid); }
        .icon-btn-delete:hover{ background:rgba(181,72,47,0.1); border-color:var(--unpaid); }
        .icon-btn-save{ color:var(--teal); border-color:var(--teal); }
        .icon-btn-save:hover{ background:rgba(47,111,107,0.12); }
        .icon-btn-cancel{ color:var(--muted); }
        .icon-btn-cancel:hover{ background:#F1ECDD; }

        .edit-input{
          width:100%;
          border:1.5px solid var(--teal);
          border-radius:8px;
          padding:.4rem .55rem;
          font-size:.85rem;
          background:#fff;
        }
        .edit-input-narrow{ max-width:70px; }

        .empty-state{
          text-align:center;
          padding:48px 20px;
          background:#FFFEFB;
        }
        .empty-state i{ font-size:2.2rem; color:var(--gold-deep); }
        .empty-state h3{
          font-family:'Oswald', sans-serif;
          font-size:1.15rem;
          margin:10px 0 4px;
          color:var(--ink);
        }
        .empty-state p{ color:var(--muted); font-size:.88rem; margin-bottom:14px; }
        .clear-btn{
          border:1.5px solid var(--navy);
          color:var(--navy);
          background:transparent;
          padding:.45rem 1.1rem;
          border-radius:8px;
          font-weight:600;
          font-size:.85rem;
          cursor:pointer;
        }
        .clear-btn:hover{ background:var(--navy); color:var(--paper); }

        @media (max-width: 575.98px){
          .reglist-card{ padding:22px 18px 18px; }
          .reglist-header h1{ font-size:1.5rem; }
          .reglist-toolbar{ flex-direction:column; }
        }
          .qr-overlay{
    position:fixed;
    inset:0;
    background:rgba(0,0,0,.65);
    backdrop-filter:blur(8px);
    display:flex;
    justify-content:center;
    align-items:center;
    z-index:9999;
    animation:fadeIn .3s ease;
}

.qr-popup{
    width:380px;
    background:#fff;
    border-radius:22px;
    padding:30px;
    text-align:center;
    box-shadow:0 20px 60px rgba(0,0,0,.25);
    animation:popup .35s ease;
}

.qr-popup h2{
    margin-bottom:20px;
    font-weight:700;
}

.qr-popup canvas{
    border:8px solid #f5f5f5;
    border-radius:18px;
    padding:10px;
}

.qr-popup h3{
    margin-top:20px;
    color:#222;
}

.qr-popup p{
    margin:6px 0;
    color:#666;
}

.qr-popup button{
    margin-top:20px;
    width:100%;
    border-radius:12px;
}

@keyframes popup{
    from{
        transform:scale(.7);
        opacity:0;
    }
    to{
        transform:scale(1);
        opacity:1;
    }
}

@keyframes fadeIn{
    from{
        opacity:0;
    }
    to{
        opacity:1;
    }
}
      `}</style>
    </div>
  );
}

export default RegistrationList;