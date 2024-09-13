// src/components/SessionManager.js
import React, { Suspense } from 'react';
import useInactiveLogout from '../../hooks/useInactiveLogout'; // Your custom hook
import { convertMinutesToMilliseconds } from '@/utils/common';
import { useAppSelector, useToggle } from '@/hooks';
import SessionExpiredDialog from '../header/SessionExpiredDialog';

const SessionManager = ({ children }: any) => {
    const { configDetails: configDetailsState, isLoggedIn } = useAppSelector((state) => state.homePage)
    const [openSessionExpireDialog, toggleSessionExpireDialog] = useToggle(false)
    useInactiveLogout(
        isLoggedIn
            ? convertMinutesToMilliseconds(configDetailsState?.SessionTimeoutMins_LoggedInUsers?.value)
            : convertMinutesToMilliseconds(configDetailsState?.SessionTimeoutMins_Guest?.value),
        toggleSessionExpireDialog
    );

    return (<>
        {children}
        {openSessionExpireDialog && (
            <Suspense fallback={<></>}>
                <SessionExpiredDialog
                    open={openSessionExpireDialog}
                    onClose={toggleSessionExpireDialog}
                />
            </Suspense>
        )}
    </>);
};

export default SessionManager;
