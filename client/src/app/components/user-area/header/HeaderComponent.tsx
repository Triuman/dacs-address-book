import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout, selectUser } from '../../../store/session';


function HeaderComponent() {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);

    //This will trigger the 'useEffect' below and redirect to the login page
    function onLogoutClick() {
        dispatch(logout());
    }

    return (
        <div>
            Welcome {user?.username}
            <button onClick={onLogoutClick}>Logout</button>
        </div>
    );
}

export { HeaderComponent };