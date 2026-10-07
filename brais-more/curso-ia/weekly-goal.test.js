const test = require('node:test');
const assert = require('node:assert/strict');

// T-1: los tests fallan hasta que existan las funciones puras en app.js.
let app = {};
try {
    app = require('./app.js');
} catch (e) {
    // app.js aún no exporta estas funciones: no hay implementación.
}

// --- T-1: sumWeeklyMinutes (RF-5, RF-10) ---

test('sumWeeklyMinutes: lista vacía devuelve 0', () => {
    assert.equal(typeof app.sumWeeklyMinutes, 'function');
    assert.equal(app.sumWeeklyMinutes([], new Date(2026, 9, 7)), 0);
});

test('sumWeeklyMinutes: suma solo las sesiones entre el lunes y hoy', () => {
    assert.equal(typeof app.sumWeeklyMinutes, 'function');
    const today = new Date(2026, 9, 7); // miércoles 7 oct 2026
    const sessions = [
        { date: '2026-10-04', topic: 'Domingo previo', minutes: 60 }, // semana anterior
        { date: '2026-10-05', topic: 'CSS', minutes: 30 }, // lunes
        { date: '2026-10-07', topic: 'JS', minutes: 45 }, // hoy
        { date: '2026-10-08', topic: 'Futuro', minutes: 90 }, // jueves, posterior a hoy
    ];
    assert.equal(app.sumWeeklyMinutes(sessions, today), 75);
});

test('sumWeeklyMinutes: varias sesiones del mismo día se suman dentro de la semana', () => {
    assert.equal(typeof app.sumWeeklyMinutes, 'function');
    const today = new Date(2026, 9, 7);
    const sessions = [
        { date: '2026-10-06', topic: 'JS', minutes: 20 },
        { date: '2026-10-06', topic: 'CSS', minutes: 25 },
    ];
    assert.equal(app.sumWeeklyMinutes(sessions, today), 45);
});

// --- T-1: goalPercent (RF-4, RF-6) ---

test('goalPercent: 0 minutos estudiados es 0 %', () => {
    assert.equal(typeof app.goalPercent, 'function');
    assert.equal(app.goalPercent(0, 300), 0);
});

test('goalPercent: progreso parcial redondea el porcentaje', () => {
    assert.equal(typeof app.goalPercent, 'function');
    assert.equal(app.goalPercent(150, 300), 50);
});

test('goalPercent: objetivo alcanzado es 100 %', () => {
    assert.equal(typeof app.goalPercent, 'function');
    assert.equal(app.goalPercent(300, 300), 100);
});

test('goalPercent: superar el objetivo da más de 100 %', () => {
    assert.equal(typeof app.goalPercent, 'function');
    assert.equal(app.goalPercent(390, 300), 130);
});

test('goalPercent: objetivo 0 o negativo devuelve 0 %', () => {
    assert.equal(typeof app.goalPercent, 'function');
    assert.equal(app.goalPercent(120, 0), 0);
    assert.equal(app.goalPercent(120, -10), 0);
});

// --- T-4: weeklyGoalProgress (RF-4, RF-6, RF-7) ---

test('weeklyGoalProgress: sin objetivo no hay meta ni cumplimiento', () => {
    assert.equal(typeof app.weeklyGoalProgress, 'function');
    const today = new Date(2026, 9, 7);
    const sessions = [{ date: '2026-10-06', topic: 'JS', minutes: 45 }];
    const res = app.weeklyGoalProgress(sessions, today, 0);
    assert.equal(res.hasGoal, false);
    assert.equal(res.studied, 45);
    assert.equal(res.goal, 0);
    assert.equal(res.percent, 0);
    assert.equal(res.achieved, false);
});

test('weeklyGoalProgress: progreso parcial calcula porcentaje sin cumplir', () => {
    assert.equal(typeof app.weeklyGoalProgress, 'function');
    const today = new Date(2026, 9, 7);
    const sessions = [{ date: '2026-10-06', topic: 'JS', minutes: 150 }];
    const res = app.weeklyGoalProgress(sessions, today, 300);
    assert.equal(res.hasGoal, true);
    assert.equal(res.studied, 150);
    assert.equal(res.goal, 300);
    assert.equal(res.percent, 50);
    assert.equal(res.achieved, false);
});

test('weeklyGoalProgress: justo el objetivo se considera cumplido', () => {
    assert.equal(typeof app.weeklyGoalProgress, 'function');
    const today = new Date(2026, 9, 7);
    const sessions = [{ date: '2026-10-06', topic: 'JS', minutes: 300 }];
    const res = app.weeklyGoalProgress(sessions, today, 300);
    assert.equal(res.percent, 100);
    assert.equal(res.achieved, true);
});

test('weeklyGoalProgress: superar el objetivo da más de 100 % y cumplido', () => {
    assert.equal(typeof app.weeklyGoalProgress, 'function');
    const today = new Date(2026, 9, 7);
    const sessions = [{ date: '2026-10-06', topic: 'JS', minutes: 390 }];
    const res = app.weeklyGoalProgress(sessions, today, 300);
    assert.equal(res.percent, 130);
    assert.equal(res.achieved, true);
});

// --- T-4: parseGoalInput (RF-2) ---

test('parseGoalInput: valores no válidos devuelven null', () => {
    assert.equal(typeof app.parseGoalInput, 'function');
    assert.equal(app.parseGoalInput(''), null);
    assert.equal(app.parseGoalInput('0'), null);
    assert.equal(app.parseGoalInput('-5'), null);
    assert.equal(app.parseGoalInput('abc'), null);
    assert.equal(app.parseGoalInput(null), null);
    assert.equal(app.parseGoalInput('12.5'), null);
    assert.equal(app.parseGoalInput(12.5), null);
});

test('parseGoalInput: entero positivo se devuelve como número', () => {
    assert.equal(typeof app.parseGoalInput, 'function');
    assert.equal(app.parseGoalInput('300'), 300);
    assert.equal(app.parseGoalInput(300), 300);
});
