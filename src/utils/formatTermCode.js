const SEMESTER_MAP = {
    '01': 'Spring',
    '07': 'Summer',
    '09': 'Fall',
    '12': 'Winter',
};

/**
 * Converts a term code (YYYYSS) into a human-readable label.
 * SS → semester name; Winter advances the year by one (e.g. 202412 → Winter 2025).
 * Unknown suffixes fall back to "Term SS".
 *
 * @param {string|number} termCode  Six-character term code, e.g. "202609"
 * @returns {string}                Human-readable label, e.g. "Fall 2026"
 */
export function formatTermCode(termCode) {
    const code = String(termCode ?? '').trim();
    if (code.length < 6) return code || 'Unknown term';

    let year = code.slice(0, 4);
    const suffix = code.slice(4, 6);
    const semester = SEMESTER_MAP[suffix] ?? `Term ${suffix}`;

    if (suffix === '12') {
        const y = Number(year);
        if (Number.isFinite(y)) year = String(y + 1);
    }

    return `${semester} ${year}`;
}
