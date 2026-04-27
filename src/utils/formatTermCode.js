export function formatTermCode(termCode) {
    const code = String(termCode ?? '').trim();
    if (code.length < 6) return code || 'Unknown term';

    let year = code.slice(0, 4);
    const suffix = code.slice(4, 6);

    const semesters = {
        '01': 'Spring',
        '07': 'Summer',
        '09': 'Fall',
        '12': 'Winter'
    };

    const semester = semesters[suffix] ?? `Term ${suffix}`;

    // Winter belongs to next calendar year per your rule
    if (suffix === '12') {
        const y = Number(year);
        if (Number.isFinite(y)) year = String(y + 1);
    }

    return `${semester} ${year}`;
}