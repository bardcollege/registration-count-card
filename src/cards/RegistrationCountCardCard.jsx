import { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@ellucian/react-design-system/core';
import { colorFillAlertError, spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { useCardInfo, useData, useExtensionControl } from '@ellucian/experience-extension-utils';
import { formatTermCode } from '../utils/formatTermCode';

const POLL_INTERVAL_MS = 5000;

const useStyles = makeStyles()({
    card: {
        margin: `0 ${spacing40}`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing40,
    },
    count: {
        fontSize: '3rem',
        fontWeight: 700,
        lineHeight: 1,
    },
    updated: {
        opacity: 0.6,
    },
});

const RegistrationCountCardCard = () => {
    const { classes } = useStyles();
    const { getEthosQuery } = useData();
    const { configuration: { termCode = '', termLabel = '' } = {} } = useCardInfo();
    const { setLoadingStatus, setErrorMessage } = useExtensionControl();

    const [count, setCount] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);

    const termDisplay = termLabel || formatTermCode(termCode);

    useEffect(() => {
        if (!termCode) return;

        let isMounted = true;
        let isFirstFetch = true;

        const fetchCount = async () => {
            try {
                const result = await getEthosQuery({
                    queryId: 'registration-count',
                    properties: { termCode },
                });
                if (!isMounted) return;
                const total = result?.data?.sectionRegistrations16?.totalCount ?? null;
                setCount(total);
                setLastUpdated(new Date());
                if (isFirstFetch) {
                    isFirstFetch = false;
                    setLoadingStatus(false);
                }
            } catch (error) {
                if (!isMounted) return;
                if (isFirstFetch) {
                    isFirstFetch = false;
                    setLoadingStatus(false);
                    setErrorMessage({
                        headerMessage: 'Unable to load registration data',
                        textMessage: 'Please check the term code configuration or contact your administrator.',
                        iconName: 'warning',
                        iconColor: colorFillAlertError,
                    });
                }
            }
        };

        setLoadingStatus(true);
        fetchCount();
        const intervalId = setInterval(fetchCount, POLL_INTERVAL_MS);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [getEthosQuery, termCode, setLoadingStatus, setErrorMessage]);

    return (
        <div className={classes.card}>
            <Typography variant="h3">
                {termDisplay} Registrations
            </Typography>
            {count !== null && (
                <>
                    <Typography className={classes.count}>
                        {count.toLocaleString()}
                    </Typography>
                    {lastUpdated && (
                        <Typography variant="body3" className={classes.updated}>
                            Last updated: {lastUpdated.toLocaleTimeString()}
                        </Typography>
                    )}
                </>
            )}
        </div>
    );
};

export default RegistrationCountCardCard;

