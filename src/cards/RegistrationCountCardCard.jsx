import { useEffect, useMemo, useRef, useState } from 'react';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { makeStyles, Typography } from '@ellucian/react-design-system/core';
import { useCardInfo, useData } from '@ellucian/experience-extension-utils';
import { formatTermCode } from '../utils/formatTermCode';

const useStyles = makeStyles()({
    card: {
        margin: `0 ${spacing40}`,
    }
});

const POLL_MS = 5000;

const RegistrationCountCardCard = () => {
    const { classes } = useStyles();

    const { configuration = {} } = useCardInfo();
    const termCode = configuration.termCode;
    const termLabel = configuration.termLabel;

    const displayTerm = useMemo(() => {
        if (termLabel && String(termLabel).trim()) return termLabel;
        return formatTermCode(termCode);
    }, [termCode, termLabel]);

    const { authenticatedEthosFetch } = useData();

    const [totalCount, setTotalCount] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const intervalRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function fetchTotal() {
            if (!termCode) return;

            try {
                setError(null);

                const endpoint = `get-registration-total-by-term?termCode=${encodeURIComponent(termCode)}`;

                // authenticatedEthosFetch returns JSON directly
                const json = await authenticatedEthosFetch(endpoint, { method: 'GET' });

                const count = json?.data?.sectionRegistrations16?.totalCount;

                if (!cancelled) {
                    setTotalCount(typeof count === 'number' ? count : null);
                    setLastUpdated(new Date());
                    setLoading(false);
                }
            } catch (e) {
                if (!cancelled) {
                    setError(e?.message || String(e));
                    setLoading(false);
                }
            }
        }

        setLoading(true);
        fetchTotal();

        intervalRef.current = setInterval(fetchTotal, POLL_MS);

        return () => {
            cancelled = true;
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [authenticatedEthosFetch, termCode]);

    if (!termCode) {
        return (
            <div className={classes.card}>
                <Typography variant="h3">Registrations</Typography>
                <Typography>Please configure a term code.</Typography>
            </div>
        );
    }

    return (
        <div className={classes.card}>
            <Typography variant="h3">Registrations — {displayTerm}</Typography>

            {loading && <Typography>Loading…</Typography>}

            {error && (
                <Typography color="error">
                    Error: {error}
                </Typography>
            )}

            {!loading && !error && (
                <Typography variant="h2">
                    {totalCount ?? '—'}
                </Typography>
            )}

            {lastUpdated && (
                <Typography variant="caption">
                    Term: {termCode} • Updated: {lastUpdated.toLocaleTimeString()}
                </Typography>
            )}
        </div>
    );
};

export default RegistrationCountCardCard;