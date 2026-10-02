const STORAGE_KEY = "study-diary-sessions";

function getToday() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatDate(date) {
    return date.toISOString().split("T")[0];
}

function parseDate(dateStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function loadSessions() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveSessions(sessions) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

function calculateStreak(sessions) {
    if (sessions.length === 0) return 0;

    const today = getToday();
    const datesWithSessions = new Set(sessions.map(s => s.date));

    let streak = 0;
    let currentDate = new Date(today);

    while (datesWithSessions.has(formatDate(currentDate))) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
}

function calculateBestStreak(sessions) {
    if (sessions.length === 0) return 0;

    const dates = [...new Set(sessions.map(s => s.date))]
        .map(d => parseDate(d))
        .sort((a, b) => a - b);

    let best = 1;
    let current = 1;

    for (let i = 1; i < dates.length; i++) {
        const diff = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            current++;
            best = Math.max(best, current);
        } else {
            current = 1;
        }
    }

    return best;
}

function renderStreak(streak, bestStreak) {
    document.getElementById("streakNumber").textContent = streak;
    document.getElementById("bestStreakNumber").textContent = bestStreak;
}

function renderSessions(sessions) {
    const list = document.getElementById("sessionsList");
    const emptyMsg = document.getElementById("emptyMessage");

    if (sessions.length === 0) {
        list.innerHTML = "";
        emptyMsg.hidden = false;
        return;
    }

    emptyMsg.hidden = true;
    list.innerHTML = sessions
        .slice()
        .sort((a, b) => parseDate(b.date) - parseDate(a.date))
        .map(session => `
            <li class="session-item">
                <div class="session-header">
                    <span class="session-date">${formatDisplayDate(session.date)}</span>
                    <span class="session-minutes">${session.minutes} min</span>
                </div>
                <span class="session-topic">${escapeHtml(session.topic)}</span>
            </li>
        `).join("");
}

function formatDisplayDate(dateStr) {
    const date = parseDate(dateStr);
    const options = { weekday: "short", day: "numeric", month: "short" };
    return date.toLocaleDateString("es-ES", options);
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function init() {
    const form = document.getElementById("sessionForm");
    const dateInput = document.getElementById("date");

    dateInput.value = formatDate(getToday());

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const date = dateInput.value;
        const topic = document.getElementById("topic").value.trim();
        const minutes = parseInt(document.getElementById("minutes").value, 10);

        if (!date || !topic || !minutes || minutes < 1) return;

        const sessions = loadSessions();
        sessions.push({ date, topic, minutes });
        saveSessions(sessions);

        renderStreak(calculateStreak(sessions), calculateBestStreak(sessions));
        renderSessions(sessions);

        form.reset();
        dateInput.value = formatDate(getToday());
    });

    const sessions = loadSessions();
    renderStreak(calculateStreak(sessions), calculateBestStreak(sessions));
    renderSessions(sessions);
}

document.addEventListener("DOMContentLoaded", init);