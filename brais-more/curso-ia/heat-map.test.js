const test = require('node:test');
const assert = require('node:assert/strict');

// Esqueleto T-1: los tests fallan hasta que existan las funciones puras en app.js.
let app = {};
try {
    app = require('./app.js');
} catch (e) {
    // app.js aún no es un módulo Node (o falla al cargar en Node): no hay implementación.
}

test('sumMinutesByDate: lista vacía devuelve objeto vacío', () => {
    assert.equal(typeof app.sumMinutesByDate, 'function');
    assert.deepEqual(app.sumMinutesByDate([]), {});
});

test('sumMinutesByDate: varias sesiones el mismo día se suman', () => {
    assert.equal(typeof app.sumMinutesByDate, 'function');
    const sessions = [
        { date: '2026-10-05', topic: 'CSS', minutes: 30 },
        { date: '2026-10-05', topic: 'JS', minutes: 15 },
    ];
    assert.deepEqual(app.sumMinutesByDate(sessions), { '2026-10-05': 45 });
});

test('sumMinutesByDate: días distintos se separan', () => {
    assert.equal(typeof app.sumMinutesByDate, 'function');
    const sessions = [
        { date: '2026-10-05', topic: 'CSS', minutes: 30 },
        { date: '2026-10-06', topic: 'JS', minutes: 60 },
    ];
    assert.deepEqual(app.sumMinutesByDate(sessions), {
        '2026-10-05': 30,
        '2026-10-06': 60,
    });
});

test('levelForMinutes: 0 minutos es nivel 0', () => {
    assert.equal(typeof app.levelForMinutes, 'function');
    assert.equal(app.levelForMinutes(0), 0);
});

test('levelForMinutes: bordes de nivel 1 (1 y 15)', () => {
    assert.equal(typeof app.levelForMinutes, 'function');
    assert.equal(app.levelForMinutes(1), 1);
    assert.equal(app.levelForMinutes(15), 1);
});

test('levelForMinutes: bordes de nivel 2 (16 y 45)', () => {
    assert.equal(typeof app.levelForMinutes, 'function');
    assert.equal(app.levelForMinutes(16), 2);
    assert.equal(app.levelForMinutes(45), 2);
});

test('levelForMinutes: bordes de nivel 3 (46 y 90)', () => {
    assert.equal(typeof app.levelForMinutes, 'function');
    assert.equal(app.levelForMinutes(46), 3);
    assert.equal(app.levelForMinutes(90), 3);
});

test('levelForMinutes: más de 90 es nivel 4', () => {
    assert.equal(typeof app.levelForMinutes, 'function');
    assert.equal(app.levelForMinutes(91), 4);
});

// --- T-4 ---
test('weekStartMonday: un domingo devuelve el lunes anterior', () => {
    assert.equal(typeof app.weekStartMonday, 'function');
    assert.equal(app.weekStartMonday(new Date(2026, 9, 4)).getTime(), new Date(2026, 8, 28).getTime()); // domingo 4 oct → lunes 28 sep
});

test('weekStartMonday: un lunes devuelve el mismo día', () => {
    assert.equal(typeof app.weekStartMonday, 'function');
    assert.equal(app.weekStartMonday(new Date(2026, 9, 5)).getTime(), new Date(2026, 9, 5).getTime());
});

test('buildHeatMapData: empieza en lunes y termina en domingo', () => {
    assert.equal(typeof app.buildHeatMapData, 'function');
    const today = new Date(2026, 9, 6); // martes 6 oct 2026
    const days = app.buildHeatMapData([], today, 2);
    assert.equal(days.length, 14);
    assert.equal(days[0].date, '2026-09-28'); // lunes
    assert.equal(days[13].date, '2026-10-11'); // domingo
});

test('buildHeatMapData: días futuros se marcan y un día suma sus sesiones', () => {
    assert.equal(typeof app.buildHeatMapData, 'function');
    const today = new Date(2026, 9, 6);
    const sessions = [{ date: '2026-10-06', topic: 'JS', minutes: 45 }];
    const days = app.buildHeatMapData(sessions, today, 1);
    const todayCell = days.find(d => d.date === '2026-10-06');
    assert.equal(todayCell.minutes, 45);
    assert.equal(todayCell.level, 2);
    const futureCell = days.find(d => d.date === '2026-10-07');
    assert.equal(futureCell.isFuture, true);
    assert.equal(futureCell.level, 'future');
});

// --- T-6 ---
test('filterSessionsByDate: devuelve solo las de ese día', () => {
    assert.equal(typeof app.filterSessionsByDate, 'function');
    const sessions = [
        { date: '2026-10-05', topic: 'CSS', minutes: 30 },
        { date: '2026-10-06', topic: 'JS', minutes: 60 },
    ];
    const out = app.filterSessionsByDate(sessions, '2026-10-05');
    assert.equal(out.length, 1);
    assert.equal(out[0].topic, 'CSS');
});

test('filterSessionsByDate: fecha sin sesiones devuelve lista vacía', () => {
    assert.equal(typeof app.filterSessionsByDate, 'function');
    assert.deepEqual(app.filterSessionsByDate([], '2026-10-05'), []);
});

test('formatTooltip: día con sesiones incluye los minutos', () => {
    assert.equal(typeof app.formatTooltip, 'function');
    const text = app.formatTooltip('2026-10-05', 45);
    assert.match(text, /45 min/);
});

test('formatTooltip: día sin sesiones dice "sin sesiones"', () => {
    assert.equal(typeof app.formatTooltip, 'function');
    assert.match(app.formatTooltip('2026-10-05', 0), /sin sesiones/);
});
