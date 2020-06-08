import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllPersonCards, setSelectedPersonCardId, selectAllPersonCards } from '../../../../store/address-book';
import { NavigationService } from '../../../../services/navigation.service';

function AddressBookPage() {
    const dispatch = useDispatch();

    const personCards = useSelector(selectAllPersonCards);

    useEffect(() => {
        //Load person cards
        dispatch(getAllPersonCards());
    }, []);

    useEffect(() => {
        console.info('person card loaded: ', personCards);
    }, [personCards]);


    function onPersonCardClick(personCardId: string) {
        dispatch(setSelectedPersonCardId(personCardId));
        NavigationService.toAddressCardEdit();
    }
    function onNewPersonCardClick() {
        dispatch(setSelectedPersonCardId(''));
        NavigationService.toAddressCardEdit();
    }

    return (
        <div className="col-lg-12 offset-lg-0">
            <h2>Address Book Page</h2>

            <div className="list-group">
                <a className="list-group-item">
                    <div className="row">
                        <div className="col">Name</div>
                        <div className="col">Surname</div>
                        <div className="col">Email</div>
                        <div className="col">Phone</div>
                        <div className="col">Address</div>
                    </div>
                </a>

                {personCards.map(p =>
                    <a key={p.dbId} onClick={() => onPersonCardClick(p.dbId)} className="list-group-item list-group-item-action">
                        <div className="row">
                            <div className="col">{p.name}</div>
                            <div className="col">{p.surname}</div>
                            <div className="col">{p.email}</div>
                            <div className="col">{p.phone}</div>
                            <div className="col">{p.address?.length > 10 ? p.address?.substr(0, 8) + '..' : p.address}</div>
                        </div>
                    </a>)}
            </div>
            <button type="button" className="btn btn-primary" onClick={onNewPersonCardClick}>Add New</button>
        </div>
    );
}

export { AddressBookPage };