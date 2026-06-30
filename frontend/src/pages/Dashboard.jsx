import { useState } from "react";
import { useNavigate } from "react-router-dom";

const weeklyData = [
  { day: 'Mon', count: 12 },
  { day: 'Tue', count: 18 },
  { day: 'Wed', count: 9 },
  { day: 'Thu', count: 24 },
  { day: 'Fri', count: 31 },
  { day: 'Sat', count: 42 },
  { day: 'Sun', count: 28 },
];

const recentRegs = [
  { id: 1, name: 'Asha Menon', tickets: 2, status: 'Paid', time: '2 min ago' },
  { id: 2, name: 'Rahul Nair', tickets: 1, status: 'Unpaid', time: '14 min ago' },
  { id: 3, name: 'Priya Pillai', tickets: 4, status: 'Paid', time: '38 min ago' },
  { id: 4, name: 'Vishnu Das', tickets: 1, status: 'Unpaid', time: '1 hr ago' },
  { id: 5, name: 'Meera Krishnan', tickets: 3, status: 'Paid', time: '2 hr ago' },
];

const avatarPalette = ['#6D5DF6', '#FF7A5C', '#22C9E0', '#FF63A5'];

function initials(name) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}
function avatarColor(name) {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum += name.charCodeAt(i);
  return avatarPalette[sum % avatarPalette.length];
}

function Dashboard() {

  const navigate = useNavigate();
  const [range, setRange] = useState("7d");
  const maxCount = Math.max.apply(null, weeklyData.map((d) => d.count));
  const totalGuests = 164;
  const paidPct = 78;

  const donutSize = 140;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const paidOffset = circumference - (paidPct / 100) * circumference;

  return (
    <div className="dash-page">

      <div className="dash-header">
        <div>
          <div className="dash-eyebrow"><i className="bi bi-grid-1x2-fill"></i> Dashboard</div>
          <h1>Welcome back, organizer</h1>
          <p className="dash-subtext">Here is how your event is shaping up.</p>
        </div>
        <div className="dash-range">
          {['7d', '30d', '90d'].map((r) => (
            <button
              key={r}
              className={'range-btn' + (range === r ? ' active' : '')}
              onClick={() => setRange(r)}
              type="button"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card stat-purple">
          <div className="stat-top">
            <i className="bi bi-people-fill"></i>
            <span className="stat-trend up"><i className="bi bi-arrow-up-short"></i>12%</span>
          </div>
          <div className="stat-value">{totalGuests}</div>
          <div className="stat-label">Total guests</div>
        </div>

        <div className="stat-card stat-coral">
          <div className="stat-top">
            <i className="bi bi-ticket-perforated-fill"></i>
            <span className="stat-trend up"><i className="bi bi-arrow-up-short"></i>8%</span>
          </div>
          <div className="stat-value">312</div>
          <div className="stat-label">Tickets sold</div>
        </div>

        <div className="stat-card stat-cyan">
          <div className="stat-top">
            <i className="bi bi-check2-circle"></i>
            <span className="stat-trend up"><i className="bi bi-arrow-up-short"></i>5%</span>
          </div>
          <div className="stat-value">128</div>
          <div className="stat-label">Paid registrations</div>
        </div>

        <div className="stat-card stat-pink">
          <div className="stat-top">
            <i className="bi bi-hourglass-split"></i>
            <span className="stat-trend down"><i className="bi bi-arrow-down-short"></i>3%</span>
          </div>
          <div className="stat-value">36</div>
          <div className="stat-label">Unpaid registrations</div>
        </div>
      </div>

      <div className="charts-row">

        <div className="chart-card bar-chart-card">
          <div className="chart-head">
            <h3>Registrations this week</h3>
            <span className="chart-sub">
              {weeklyData.reduce((s, d) => s + d.count, 0)} total
            </span>
          </div>
          <div className="bar-chart">
            {weeklyData.map((d) => (
              <div className="bar-col" key={d.day}>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ height: ((d.count / maxCount) * 100) + '%' }}
                  >
                    <span className="bar-tooltip">{d.count}</span>
                  </div>
                </div>
                <span className="bar-day">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card donut-chart-card">
          <div className="chart-head">
            <h3>Payment status</h3>
          </div>
          <div className="donut-wrap">
            <svg width={donutSize} height={donutSize} viewBox={'0 0 ' + donutSize + ' ' + donutSize}>
              <circle
                cx={donutSize / 2}
                cy={donutSize / 2}
                r={radius}
                fill="none"
                stroke="#F3E8F8"
                strokeWidth="16"
              />
              <circle
                cx={donutSize / 2}
                cy={donutSize / 2}
                r={radius}
                fill="none"
                stroke="url(#donutGradient)"
                strokeWidth="16"
                strokeDasharray={circumference}
                strokeDashoffset={paidOffset}
                strokeLinecap="round"
                transform={'rotate(-90 ' + (donutSize / 2) + ' ' + (donutSize / 2) + ')'}
              />
              <defs>
                <linearGradient id="donutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6D5DF6" />
                  <stop offset="100%" stopColor="#FF63A5" />
                </linearGradient>
              </defs>
            </svg>
            <div className="donut-center">
              <div className="donut-value">{paidPct}%</div>
              <div className="donut-label">Paid</div>
            </div>
          </div>
          <div className="donut-legend">
            <div className="legend-item">
              <span className="legend-dot legend-purple"></span> Paid ({paidPct}%)
            </div>
            <div className="legend-item">
              <span className="legend-dot legend-gray"></span> Unpaid ({100 - paidPct}%)
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-row">

        <div className="panel-card recent-card">
          <div className="chart-head">
            <h3>Recent registrations</h3>
            <button className="view-all-btn" type="button">
              View all <i className="bi bi-arrow-right"></i>
            </button>
          </div>
          <div className="recent-list">
            {recentRegs.map((r) => (
              <div className="recent-row" key={r.id}>
                <span className="avatar" style={{ background: avatarColor(r.name) }}>
                  {initials(r.name)}
                </span>
                <div className="recent-info">
                  <div className="recent-name">{r.name}</div>
                  <div className="recent-meta">{r.tickets} tickets - {r.time}</div>
                </div>
                <span className={'status-pill ' + (r.status === 'Paid' ? 'pill-paid' : 'pill-unpaid')}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card quick-card">
          <div className="chart-head">
            <h3>Quick actions</h3>
          </div>
          <div className="quick-actions">
            <button
  className="quick-btn quick-purple"
  type="button"
  onClick={() => navigate("/add-registration")}
>
  <i className="bi bi-person-plus-fill"></i>
  Add registration
</button>
            <button
  className="quick-btn quick-coral"
  type="button"
  onClick={() => navigate("/registration-list")}
>
  <i className="bi bi-list-ul"></i>
  View guest list
</button>
            <button className="quick-btn quick-cyan" type="button">
              <i className="bi bi-download"></i>
              Export data
            </button>
            <button className="quick-btn quick-pink" type="button">
              <i className="bi bi-envelope-paper-fill"></i>
              Send reminders
            </button>
          </div>

          <div className="capacity-block">
            <div className="capacity-head">
              <span>Venue capacity</span>
              <span className="capacity-value">312 / 400</span>
            </div>
            <div className="capacity-track">
              <div className="capacity-fill" style={{ width: '78%' }}></div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .dash-page {
          font-family: 'Inter', sans-serif;
          color: #211B3D;
          background: #F7F6FD;
          padding: 36px 28px 60px;
          max-width: 1180px;
          margin: 0 auto;
        }
        .dash-page * { box-sizing: border-box; }

        .dash-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 0.74rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #5645D6;
          margin-bottom: 8px;
        }

        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 30px;
        }
        .dash-header h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 800;
          font-size: 1.85rem;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .dash-subtext { color: #6E6B85; font-size: 0.95rem; margin: 0; }

        .dash-range {
          display: flex;
          gap: 4px;
          background: #fff;
          border-radius: 10px;
          padding: 4px;
          box-shadow: 0 4px 14px -8px rgba(33,27,61,0.18);
        }
        .range-btn {
          border: none;
          background: transparent;
          color: #6E6B85;
          font-weight: 600;
          font-size: 0.82rem;
          padding: 7px 14px;
          border-radius: 7px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .range-btn.active {
          background: linear-gradient(135deg, #6D5DF6, #FF63A5);
          color: #fff;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-bottom: 24px;
        }
        .stat-card {
          border-radius: 18px;
          padding: 22px 22px 20px;
          color: #fff;
          box-shadow: 0 18px 36px -18px rgba(33,27,61,0.3);
        }
        .stat-purple { background: linear-gradient(135deg, #6D5DF6, #5645D6); }
        .stat-coral { background: linear-gradient(135deg, #FF7A5C, #F0573A); }
        .stat-cyan { background: linear-gradient(135deg, #22C9E0, #16A8BC); }
        .stat-pink { background: linear-gradient(135deg, #FF63A5, #EC4488); }

        .stat-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
        .stat-top i { font-size: 1.4rem; opacity: 0.85; }
        .stat-trend {
          display: inline-flex;
          align-items: center;
          font-size: 0.78rem;
          font-weight: 700;
          background: rgba(255,255,255,0.18);
          padding: 2px 8px 2px 4px;
          border-radius: 999px;
        }
        .stat-trend.down { background: rgba(0,0,0,0.12); }

        .stat-value { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.9rem; line-height: 1; }
        .stat-label { font-size: 0.85rem; opacity: 0.85; margin-top: 4px; }

        .charts-row {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }
        .chart-card, .panel-card {
          background: #fff;
          border-radius: 18px;
          padding: 24px 24px 20px;
          box-shadow: 0 14px 32px -22px rgba(33,27,61,0.22);
        }
        .chart-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }
        .chart-head h3 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 1.02rem;
          margin: 0;
        }
        .chart-sub { font-size: 0.8rem; color: #6E6B85; }

        .bar-chart {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 10px;
          height: 180px;
        }
        .bar-col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; }
        .bar-track {
          flex: 1;
          width: 100%;
          max-width: 34px;
          display: flex;
          align-items: flex-end;
          background: #F4F2FE;
          border-radius: 8px;
        }
        .bar-fill {
          width: 100%;
          border-radius: 8px;
          background: linear-gradient(180deg, #6D5DF6, #FF63A5);
          position: relative;
          transition: height 0.4s ease;
        }
        .bar-tooltip {
          position: absolute;
          top: -22px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.7rem;
          font-weight: 700;
          color: #5645D6;
        }
        .bar-day { font-size: 0.74rem; color: #6E6B85; margin-top: 8px; }

        .donut-chart-card { display: flex; flex-direction: column; align-items: center; }
        .donut-wrap { position: relative; display: flex; align-items: center; justify-content: center; }
        .donut-center { position: absolute; text-align: center; }
        .donut-value { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 1.5rem; }
        .donut-label { font-size: 0.76rem; color: #6E6B85; }
        .donut-legend { display: flex; gap: 16px; margin-top: 18px; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: #6E6B85; }
        .legend-dot { width: 9px; height: 9px; border-radius: 50%; display: inline-block; }
        .legend-purple { background: linear-gradient(135deg, #6D5DF6, #FF63A5); }
        .legend-gray { background: #E5E2F5; }

        .bottom-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 18px;
        }

        .view-all-btn {
          background: none;
          border: none;
          color: #5645D6;
          font-weight: 600;
          font-size: 0.82rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
        }

        .recent-list { display: flex; flex-direction: column; gap: 4px; }
        .recent-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 4px;
          border-radius: 10px;
          transition: background 0.12s ease;
        }
        .recent-row:hover { background: #F7F6FD; }
        .avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          font-size: 0.78rem;
          flex-shrink: 0;
        }
        .recent-info { flex: 1; min-width: 0; }
        .recent-name { font-weight: 600; font-size: 0.92rem; }
        .recent-meta { font-size: 0.78rem; color: #6E6B85; }

        .status-pill {
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 11px;
          border-radius: 999px;
          flex-shrink: 0;
        }
        .pill-paid { background: rgba(34,201,224,0.14); color: #16A8BC; }
        .pill-unpaid { background: rgba(255,99,165,0.14); color: #EC4488; }

        .quick-actions { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .quick-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          border-radius: 12px;
          padding: 12px 14px;
          font-weight: 600;
          font-size: 0.88rem;
          color: #fff;
          cursor: pointer;
          transition: transform 0.12s ease;
        }
        .quick-btn:hover { transform: translateX(2px); }
        .quick-purple { background: linear-gradient(135deg, #6D5DF6, #5645D6); }
        .quick-coral { background: linear-gradient(135deg, #FF7A5C, #F0573A); }
        .quick-cyan { background: linear-gradient(135deg, #22C9E0, #16A8BC); }
        .quick-pink { background: linear-gradient(135deg, #FF63A5, #EC4488); }

        .capacity-block {
          background: #F7F6FD;
          border-radius: 12px;
          padding: 14px 16px;
        }
        .capacity-head {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          font-weight: 600;
          color: #211B3D;
          margin-bottom: 8px;
        }
        .capacity-value { color: #5645D6; }
        .capacity-track {
          height: 8px;
          border-radius: 999px;
          background: #E5E2F5;
          overflow: hidden;
        }
        .capacity-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #6D5DF6, #FF63A5);
        }

        @media (max-width: 991.98px) {
          .charts-row, .bottom-row { grid-template-columns: 1fr; }
        }
        @media (max-width: 575.98px) {
          .dash-page { padding: 24px 16px 44px; }
          .dash-header h1 { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;