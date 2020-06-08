import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectPersonCard, updatePersonCardAsync, addPersonCardAsync } from '../../../../store/address-book';
import { IPersonCard } from '../../../../models/PersonCard.interface';
import { NavigationService } from '../../../../services/navigation.service';

function AddressCardEditPage() {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState<IPersonCard>({
        dbId: '',
        name: '',
        surname: '',
        phone: '',
        email: '',
        address: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { name, surname, phone, email, address } = inputs;

    const personCard = useSelector(selectPersonCard);
    useEffect(() => {
        if (personCard) {
            setInputs(personCard);
        }
    }, [personCard]);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        setSubmitted(true);
        if (inputs.name && inputs.surname && inputs.phone && inputs.email && inputs.address) {
            if (inputs.dbId)
                (dispatch(updatePersonCardAsync(inputs)) as Promise<void>).then(() => {
                    NavigationService.toAddressBook();
                });
            else
                (dispatch(addPersonCardAsync(inputs)) as Promise<void>).then(() => {
                    NavigationService.toAddressBook();
                });
        }
    }

    function onCancelClick() {
        NavigationService.goBack();
    }

    return (
        <div className="col-md-8 offset-md-2">
            <h2>Person Card Edit</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputName">Name</label>
                        <input type="text" className="form-control" id="inputName" name="name" placeholder="Name" required onChange={handleChange} value={name} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputSurname">Surname</label>
                        <input type="text" className="form-control" id="inputSurname" name="surname" placeholder="Surname" required onChange={handleChange} value={surname} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail">Email</label>
                        <input type="email" className="form-control" id="inputEmail" name="email" placeholder="Email" required onChange={handleChange} value={email} />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPhone">Phone</label>
                        <input type="tel" className="form-control" id="inputPhone" name="phone" placeholder="Phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required onChange={handleChange} value={phone} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" name="address" placeholder="1234 Main St" required onChange={handleChange} value={address} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn" onClick={onCancelClick}>Cancel</button>
            </form>
        </div>
    );
}

export { AddressCardEditPage };