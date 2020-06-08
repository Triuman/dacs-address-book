import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, match } from 'react-router-dom';

import { AddressBookPage } from './content/adress-book-list/AddressBookPage';
import { AddressCardEditPage } from './content/address-card-editor/AddressCardEditPage';
import { selectIsLoggedIn, selectIsSessionLoaded } from '../../store/session';
import { NavigationService } from '../../services/navigation.service';
import { HeaderComponent } from './header/HeaderComponent';


function UserAreaPage({ match }: { match: match }) {

    const isSessionLoaded = useSelector(selectIsSessionLoaded);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    useEffect(() => {
        //if user is not logged in, redirect to the login page.
        if (isSessionLoaded && !isLoggedIn) {
            NavigationService.toLogin();
        }
    }, [isLoggedIn]);

    return (
        <div>
            <HeaderComponent></HeaderComponent>
            <Switch>
                <Route path="/user/addressbook/edit" component={AddressCardEditPage} />
                <Route path="/user/addressbook/add" component={AddressCardEditPage} />
                <Route path="/user/addressbook" exact component={AddressBookPage} />
            </Switch>
        </div>
    );
}

export { UserAreaPage };