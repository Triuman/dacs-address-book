import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '..';
import { history } from '../../helpers/history'
import { AddressBookService } from '../../services/address-book.service';
import { IPersonCard } from '../../models/PersonCard.interface';
import { useSelector } from 'react-redux';
import { selectToken, selectUser } from '../session';


interface IAddressBookState {
  personCards: IPersonCard[],
  selectedPersonCardId: string | null
}

const initialState: IAddressBookState = {
  personCards: [],
  selectedPersonCardId: null
};

export const addressBookSlice = createSlice({
  name: 'address-book',
  initialState,
  reducers: {
    setPersonCards: (state, action: PayloadAction<IPersonCard[]>) => {
      state.personCards = action.payload;
    },
    addPersonCard: (state, action: PayloadAction<IPersonCard>) => {
      state.personCards.push(action.payload);
    },
    updatePersonCard: (state, action: PayloadAction<IPersonCard>) => {
      const personCard = state.personCards.find(a => a.dbId === action.payload.dbId);
      if (personCard) {
        personCard.name = action.payload.name;
        personCard.surname = action.payload.surname;
        personCard.age = action.payload.age;
        personCard.phone = action.payload.phone;
        personCard.email = action.payload.email;
        personCard.address = action.payload.address;
      }
    },
    deletePersonCard: (state, action: PayloadAction<string>) => {
      state.personCards = state.personCards.filter(a => a.dbId !== action.payload);
    },
    setSelectedPersonCardId: (state, action: PayloadAction<string>) => {
      state.selectedPersonCardId = action.payload;
    },
  },
});


const { addPersonCard, updatePersonCard, deletePersonCard } = addressBookSlice.actions;
export const { setPersonCards, setSelectedPersonCardId } = addressBookSlice.actions;

export const getAllPersonCards = (): AppThunk => dispatch => {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUser)?.id;
  if (!token || !userId) {
    history.push('/login');
    return;
  }
  AddressBookService.getAllPersonCards(token, userId)
    .then(personCards => {
      dispatch(setPersonCards(personCards));
    });
};

export const addPersonCardAsync = (personCard: IPersonCard): AppThunk => dispatch => {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUser)?.id;
  if (!token || !userId) {
    history.push('/login');
    return;
  }
  AddressBookService.addPersonCard(token, userId, personCard)
    .then(() => {
      dispatch(addPersonCard(personCard));
    });
};

export const updatePersonCardAsync = (personCard: IPersonCard): AppThunk => dispatch => {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUser)?.id;
  if (!token || !userId) {
    history.push('/login');
    return;
  }
  AddressBookService.updatePersonCard(token, userId, personCard)
    .then(() => {
      dispatch(updatePersonCard(personCard));
    });
};

export const deletePersonCardAsync = (personCardId: string): AppThunk => dispatch => {
  const token = useSelector(selectToken);
  const userId = useSelector(selectUser)?.id;
  if (!token || !userId) {
    history.push('/login');
    return;
  }
  AddressBookService.deletePersonCard(token, userId, personCardId)
    .then(() => {
      dispatch(deletePersonCard(personCardId));
    });
};

export const selectPersonCard = (state: RootState) => state.addressBook.personCards.find(a => a.dbId === state.addressBook.selectedPersonCardId);

export default addressBookSlice.reducer;
