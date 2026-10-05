const STORAGE_KEY = "study-diary-sessions";
const THEME_KEY = "study-diary-theme";

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

// --- Tema ---
function getInitialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = document.getElementById("themeIcon");
    if (icon) {
        icon.textContent = theme === "dark" ? "🌙" : "☀️";
    }
    const toggle = document.getElementById("themeToggle");
    if (toggle) {
        toggle.setAttribute("aria-label", theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro");
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
}

// --- Total minutos esta semana ---
function getWeekStartDate() {
    const today = getToday();
    const day = today.getDay(); // 0=dom, 1-lun, 2-mar, ...
    const diff = day === 0 ? -6 : 1 - day; // si es dom (0), restar 6 para ir al lunes anterior; otherwise restar para ir al lunes
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + diff);
    weekStart.setHours(0, 0, 0, 0);
    return weekStart;
}

function calculateWeeklyMinutes(sessions) {
    const weekStart = getWeekStartDate();
    const today = getToday();
    let total = 0;

    for (const session of sessions) {
        const sessionDate = parseDate(session.date);
        if (sessionDate >= weekStart && sessionDate <= today) {
            total += session.minutes;
        }
    }

    return total;
}

function renderWeeklyTotal(total) {
    const el = document.getElementById("weeklyTotal");
    if (el) {
        el.textContent = `${total} min esta semana`;
    }
}

// --- Total días este mes ---
function getMonthStartDate() {
    const today = getToday();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // getMonth() es 0-indexado
    return `${year}-${month.toString().padStart(2, '0')}-01`;
}

function calculateDaysThisMonth(sessions) {
    const monthStart = getMonthStartDate();
    const today = getToday();
    const datesWithSessions = new Set();

    for (const session of sessions) {
        // Only count sessions from this month onwards
        if (session.date >= monthStart && session.date <= formatDate(today)) {
            datesWithSessions.add(session.date);
        }
    }

    return datesWithSessions.size;
}

function renderDaysThisMonth(total) {
    const el = document.getElementById("daysThisMonth");
    if (el) {
        el.textContent = `${total} días este mes`;
    }
}

// --- Fecha actual en navbar ---
function updateCurrentDate() {
    const dateEl = document.getElementById("currentDate");
    if (dateEl) {
        dateEl.textContent = formatDate(getToday());
    }
}

function startDateUpdater() {
    updateCurrentDate();
    // Actualizar cada minuto para capturar el cambio de día
    setInterval(updateCurrentDate, 60 * 1000);
}

function init() {
    // Tema
    const theme = getInitialTheme();
    applyTheme(theme);

    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }

    // Escuchar cambios de preferencia del sistema
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });

    // Fecha actual
    startDateUpdater();

    // Formulario
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
        renderWeeklyTotal(calculateWeeklyMinutes(sessions));
        renderDaysThisMonth(calculateDaysThisMonth(sessions));

        form.reset();
        dateInput.value = formatDate(getToday());
    });

    const sessions = loadSessions();
    renderStreak(calculateStreak(sessions), calculateBestStreak(sessions));
    renderSessions(sessions);
    renderWeeklyTotal(calculateWeeklyMinutes(sessions));
    renderDaysThisMonth(calculateDaysThisMonth(sessions));
}

document.addEventListener("DOMContentLoaded", init);