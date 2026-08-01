import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SideLink from "../../components/SideLink";
import SideSection from "../../components/SideSection";
import SideBar from "../../components/SideBar";
import Card from "../../components/Card";
import Header from "../.././components/Header.jsx";
import { api } from '../../api'; // adjust path to wherever you put api.js

// ---- Resource links (sidebar + quick links) ----------------------------------
const RESOURCES = [
  { name: 'ACORN', desc: 'Enrolment & finances', url: 'https://acorn.utoronto.ca/' },
  { name: 'Quercus', desc: 'Courses & grades', url: 'https://q.utoronto.ca/', badgeCount: 3 },
  { name: 'Crowdmark', desc: 'Submit assignments', url: 'https://crowdmark.com/', badgeCount: 1 },
  { name: 'MarkUs', desc: 'Code & assignment grading', url: 'https://markus.teach.cs.toronto.edu/' },
  { name: 'Folio', desc: 'Co-curricular record', url: 'https://folio.utoronto.ca/' },
  { name: 'CLNx', desc: 'Career learning network', url: 'https://clnx.utoronto.ca/' },
  { name: 'Guides', desc: 'Guides for students', url: '/guides'},
]; 

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const WORKOUT_TYPES = ['Run', 'Gym', 'Swim', 'Bike', 'Sport', 'Other'];

// ---- Seed data -----------------------------------------------------------------
const TODAY_CLASSES = [
  { id: 1, course: 'CSC207', title: 'Software Design Lecture', time: '10:00 AM', location: 'BA 1170' },
  { id: 2, course: 'MAT223', title: 'Linear Algebra Tutorial', time: '1:00 PM', location: 'SS 1088' },
  { id: 3, course: 'STA257', title: 'Probability Lecture', time: '3:00 PM', location: 'MP 134' },
];

const INITIAL_CHECKLIST = [
  { id: 1, text: 'Verify your contact information on ACORN', done: true },
  { id: 2, text: 'Enrol in Fall/Winter courses', done: false },
  { id: 3, text: 'Pay or defer your tuition fees', done: false },
  { id: 4, text: 'Set up two-factor authentication for UTORid', done: true },
  { id: 5, text: 'Order your TCard', done: false },
];

// ---- Helpers --------------------------------------------------------------------

function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

function formatDateKey(d) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}
// returns the start of the day (midnight) at 0 miliseconds
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells = [];

  for (let i = startWeekday - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    cells.push({ day, current: false, dateObj: new Date(year, month - 1, day) });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, dateObj: new Date(year, month, d) });
  }

  const totalCells = Math.ceil(cells.length / 7) * 7;
  const trailing = totalCells - cells.length;
  for (let d = 1; d <= trailing; d++) {
    cells.push({ day: d, current: false, dateObj: new Date(year, month + 1, d) });
  }

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function parseTimeToMinutes(timeStr) {
  const [time, period] = timeStr.split(' ');
  let [h, m] = time.split(':').map(Number);
  if (period.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (period.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function getDeadlineStatus(due, today) {
  const msPerDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round((startOfDay(due) - startOfDay(today)) / msPerDay);
  if (diffDays < 0) return { label: 'Overdue', tone: 'red' };
  if (diffDays <= 2) return { label: 'Due soon', tone: 'orange' };
  return { label: 'Upcoming', tone: 'green' };
}



function Dashboard() {
  // Stable "today" reference so derived values (deadlines, weekly totals) stay
  // consistent for the life of the session instead of drifting every render.
  const [today] = useState(() => new Date());
  const todayKey = formatDateKey(today);

  // Sidebar active link (visual highlight only)
  const [activeLink, setActiveLink] = useState('dashboard');

  // Checklist state
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

  // ---- Single source of truth: raw events from the backend -------------------
  // Deadlines are just events with is_deadline = true, so both the calendar
  // and the deadlines panel derive from this one array.
  const [allEvents, setAllEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    api.getEvents()
      .then((rows) => setAllEvents(rows))
      .catch((err) => console.error("Failed to load events:", err))
      .finally(() => setLoadingEvents(false));
  }, []);

  // Calendar view: grouped by date, keeping id + title so items can be removed
  const events = useMemo(() => {
    const grouped = {};
    for (const ev of allEvents) {
      const key = formatDateKey(new Date(ev.start_time));
      (grouped[key] ||= []).push({ id: ev.id, title: ev.title });
    }
    return grouped;
  }, [allEvents]);

  // Deadlines panel: just the events flagged as deadlines
  const deadlines = useMemo(() => {
    return allEvents
      .filter((ev) => ev.is_deadline)
      .map((ev) => ({ ...ev, due: new Date(ev.start_time) }))
      .sort((a, b) => a.due - b.due);
  }, [allEvents]);

  // Calendar state
  const [calMonth, setCalMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const [selectedDay, setSelectedDay] = useState(todayKey);
  const [newEventText, setNewEventText] = useState('');
  const [newEventCourse, setNewEventCourse] = useState('');
  const [newEventIsDeadline, setNewEventIsDeadline] = useState(false);

  // Fitness state
  const [workouts, setWorkouts] = useState([]); // [{ id, type, duration, date }]
  const [workoutType, setWorkoutType] = useState('Run');
  const [workoutDuration, setWorkoutDuration] = useState('');

  const monthMatrix = useMemo(
    () => getMonthMatrix(calMonth.getFullYear(), calMonth.getMonth()),
    [calMonth]
  );

  function changeMonth(delta) {
    setCalMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  function handleSelectDay(dateObj) {
    setSelectedDay(formatDateKey(dateObj));
    setCalMonth(new Date(dateObj.getFullYear(), dateObj.getMonth(), 1)); 
  }

  async function handleAddEvent(e) {
    e.preventDefault();
    console.log("Adding event...");

    if (!newEventText.trim()) return;

    const [y, m, d] = selectedDay.split('-').map(Number);
    const start = new Date(y, m - 1, d, 9, 0); // default 9am — adjust as needed
    const end = new Date(y, m - 1, d, 10, 0);

    try {
      await api.addEvent({
        title: newEventText.trim(),
        description: "",
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        course: newEventCourse.trim() || null,
        is_deadline: newEventIsDeadline,
      });

      // Refetch so the calendar and deadlines panel both stay in sync,
      // since they're both derived from allEvents.
      const rows = await api.getEvents();
      setAllEvents(rows);

      setNewEventText('');
      setNewEventCourse('');
      setNewEventIsDeadline(false);
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  }

  async function handleRemoveEvent(id) {
    try {
      await api.deleteEvent(id);

      setAllEvents((prev) =>
        prev.filter((ev) => ev.id !== id)
      );

    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  }

  function toggleChecklistItem(id) {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }

  function handleAddWorkout(e) {
    e.preventDefault();
    if (!workoutDuration || Number(workoutDuration) <= 0) return;
    setWorkouts((prev) => [
      { id: Date.now(), type: workoutType, duration: Number(workoutDuration), date: todayKey },
      ...prev,
    ]);
    setWorkoutDuration('');
  }

  const weeklyMinutes = useMemo(() => {
    const weekAgo = addDays(today, -7);
    return workouts
      .filter((w) => new Date(w.date) >= weekAgo)
      .reduce((sum, w) => sum + w.duration, 0);
  }, [workouts, today]);

  const completedCount = checklist.filter((c) => c.done).length;

  // Attach "Now" / "Next" status tags to today's class schedule
  const nowMinutes = today.getHours() * 60 + today.getMinutes();
  const scheduleWithStatus = useMemo(() => {
    const withStart = TODAY_CLASSES.map((c) => ({ ...c, start: parseTimeToMinutes(c.time) }));
    const upcoming = withStart.filter((c) => c.start > nowMinutes).sort((a, b) => a.start - b.start);
    const nextId = upcoming.length ? upcoming[0].id : null;
    return withStart.map((c) => ({
      ...c,
      status:
        nowMinutes >= c.start && nowMinutes < c.start + 60 ? 'now' : c.id === nextId ? 'next' : null,
    }));
  }, [nowMinutes]);

  const todaysEvents = events[todayKey] || [];
  const selectedDayLabel = useMemo(() => {
    const [y, m, d] = selectedDay.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-CA', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  }, [selectedDay]);

  return (
    <div className="app">
      {/* Top bar */}

      <div className="layout">
        {/* Sidebar */}

        {/* Main content */}
        <main className="main-content" id="dashboard">
          <div className="card-grid">
            {/* Today's schedule */}
            <section className="card">
              <h2 className="card-title">Today's Schedule</h2>
              <ul className="schedule-list">
                {scheduleWithStatus.map((c) => (
                  <li key={c.id} className="schedule-item">
                    <div className="schedule-time">{c.time}</div>
                    <div className="schedule-info">
                      <span className="schedule-course">{c.course}</span>
                      <span className="schedule-location">{c.title} · {c.location}</span>
                    </div>
                    {c.status && (
                      <span className={`status-tag status-tag-${c.status === 'now' ? 'green' : 'blue'}`}>
                        {c.status === 'now' ? 'Now' : 'Next'}
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {todaysEvents.length > 0 && (
                <>
                  <h3 className="panel-heading subheading">From your calendar</h3>
                  <ul className="plain-list">
                    {todaysEvents.map((ev) => (
                      <li key={ev.id}>{ev.title}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="card-actions">
                <a className="btn btn-primary" href="#calendar" onClick={() => setActiveLink('calendar')}>
                  View Calendar
                </a>
              </div>
            </section>

            {/* Task checklist */}
            <Card
              icon="✓"
              title="Task Checklist"
              subtitle={`${completedCount} of ${checklist.length} completed`}
              badge={`${Math.round((completedCount / checklist.length) * 100)}%`}
              footer="Click any task to mark it as complete"
            >
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${(completedCount / checklist.length) * 100}%` }}
                />
              </div>

              <ul className="checklist">
                {checklist.map((item) => (
                  <li key={item.id} className={`checklist-item${item.done ? " done" : ""}`}>
                    <button
                      type="button"
                      className="checklist-toggle"
                      onClick={() => toggleChecklistItem(item.id)}
                      aria-pressed={item.done}
                      aria-label={item.done ? "Mark task incomplete" : "Mark task complete"}
                    >
                      {item.done ? "✓" : ""}
                    </button>
                    <span>{item.text}</span>
                    {item.done && <span className="done-label">Done</span>}
                  </li>
                ))}
              </ul>
            </Card>

            {/* Quick links */}
            <Card title="Quick Links">
              <div className="quicklinks-grid">
                {RESOURCES.map((r) => (
                  <a
                    key={r.name}
                    className="quicklink"
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="quicklink-badge-wrap">
                      <span className="quicklink-badge">{r.name.charAt(0)}</span>
                      {r.badgeCount ? (
                        <span className="badge-dot">{r.badgeCount}</span>
                      ) : null}
                    </span>

                    <span className="quicklink-text">
                      <span className="quicklink-name">{r.name}</span>
                      <span className="quicklink-desc">{r.desc}</span>
                    </span>
                  </a>
                ))}
              </div>
            </Card>
            {/* Deadlines */}
            <Card
              icon="📅"
              title="Upcoming Deadlines"
              subtitle={`${deadlines.length} tracked`}
              id="deadlines"
              footer={
                <a className="btn btn-primary" href="#calendar" onClick={() => setActiveLink("calendar")}>
                  Add to Calendar
                </a>
              }
            >
              {loadingEvents ? (
                <p className="muted-text">Loading deadlines…</p>
              ) : deadlines.length === 0 ? (
                <p className="muted-text">No deadlines tracked yet.</p>
              ) : (
                <ul className="deadline-list">
                  {deadlines.map((d) => {
                    const status = getDeadlineStatus(d.due, today);
                    return (
                      <li key={d.id} className="deadline-row">
                        <div className="deadline-info">
                          <span className="deadline-course">{d.course}</span>
                          <span className="deadline-title">{d.title}</span>
                        </div>
                        <div className="deadline-meta">
                          <span className="deadline-date">
                            {d.due.toLocaleDateString("en-CA", { month: "short", day: "numeric" })}
                          </span>
                          <span className={`status-tag status-tag-${status.tone}`}>{status.label}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </Card>
            {/* Calendar */}
            <section className="card card-wide" id="calendar">
              <h2 className="card-title">Calendar</h2>
              <div className="calendar-layout">
                <div className="calendar-widget">
                  <div className="calendar-header">
                    <button type="button" className="cal-nav" onClick={() => changeMonth(-1)} aria-label="Previous month">
                      ‹
                    </button>
                    <span className="calendar-month-label">
                      {MONTH_NAMES[calMonth.getMonth()]} {calMonth.getFullYear()}
                    </span>
                    <button type="button" className="cal-nav" onClick={() => changeMonth(1)} aria-label="Next month">
                      ›
                    </button>
                  </div>
                  <div className="calendar-grid calendar-weekdays">
                    {WEEKDAYS.map((w) => (
                      <div key={w} className="weekday-cell">{w}</div>
                    ))}
                  </div>
                  {monthMatrix.map((week, wi) => (
                    <div className="calendar-grid" key={wi}>
                      {week.map((cell, ci) => {
                        const key = formatDateKey(cell.dateObj);
                        const isToday = key === todayKey;
                        const isSelected = key === selectedDay;
                        const hasEvents = !!events[key];
                        return (
                          <button
                            type="button"
                            key={ci}
                            className={[
                              'day-cell',
                              !cell.current ? 'day-cell-muted' : '',
                              isToday ? 'day-cell-today' : '',
                              isSelected ? 'day-cell-selected' : '',
                            ].join(' ').trim()}
                            onClick={() => handleSelectDay(cell.dateObj)}
                          >
                            {cell.day}
                            {hasEvents && <span className="day-dot" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="calendar-side-panel">
                  <h3 className="panel-heading">{selectedDayLabel}</h3>
                  {(events[selectedDay] || []).length === 0 ? (
                    <p className="muted-text">No events for this day.</p>
                  ) : (
                    <ul className="event-list">
                      {(events[selectedDay] || []).map((ev) => (
                        <li key={ev.id}>
                          <span>{ev.title}</span>
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => handleRemoveEvent(ev.id)}
                            aria-label="Remove event"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <form className="add-event-form" onSubmit={handleAddEvent}>
                    <input
                      type="text"
                      placeholder="Add an event..."
                      value={newEventText}
                      onChange={(e) => setNewEventText(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Course (optional)"
                      value={newEventCourse}
                      onChange={(e) => setNewEventCourse(e.target.value)}
                    />
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                      <input
                        type="checkbox"
                        checked={newEventIsDeadline}
                        onChange={(e) => setNewEventIsDeadline(e.target.checked)}
                      />
                      This is a deadline
                    </label>
                    <button type="submit" className="btn btn-primary btn-sm">Add</button>
                  </form>
                </div>
              </div>
            </section>

            {/* Fitness tracker */}
            <section className="card card-wide" id="fitness">
              <h2 className="card-title">Fitness Tracker</h2>
              <div className="info-box">
                <span className="info-icon">i</span>
                <p>
                  You've logged <strong>{weeklyMinutes} minutes</strong> of activity in the last 7 days.
                  Keep it up!
                </p>
              </div>

              <div className="fitness-layout">
                <form className="workout-form" onSubmit={handleAddWorkout}>
                  <label>
                    Activity
                    <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)}>
                      {WORKOUT_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Duration (minutes)
                    <input
                      type="number"
                      min="1"
                      placeholder="e.g. 30"
                      value={workoutDuration}
                      onChange={(e) => setWorkoutDuration(e.target.value)}
                    />
                  </label>
                  <button type="submit" className="btn btn-primary">Log Workout</button>
                </form>

                <div className="workout-history">
                  <h3 className="panel-heading">Recent activity</h3>
                  {workouts.length === 0 ? (
                    <p className="muted-text">No workouts logged yet.</p>
                  ) : (
                    <ul className="plain-list workout-list">
                      {workouts.slice(0, 6).map((w) => (
                        <li key={w.id}>
                          <span className="workout-type">{w.type}</span>
                          <span>{w.duration} min</span>
                          <span className="muted-text">{w.date}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;