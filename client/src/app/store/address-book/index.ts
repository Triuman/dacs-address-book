import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '..';
import { AddressBookService } from '../../services/address-book.service';
import { IPersonCard } from '../../models/PersonCard.interface';
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

      //Option 1: Immutable state
      //state.personCards = {...state.personCards.filter(a => a.dbId !== action.payload.dbId), [action.payload.dbId]: action.payload};

      //Option 2: if this does not work, use Option 1
      //TODO: this may not work.
      const personCard = state.personCards.find(a => a.dbId === action.payload.dbId);
      if (personCard) {
        personCard.name = action.payload.name;
        personCard.surname = action.payload.surname;
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


//TODO: put common parts of these methods into one.
export const getAllPersonCards = (): AppThunk => (dispatch, getState) => {
  const state = getState();
  const token = selectToken(state);
  const userId = selectUser(state)?.id;
  if (!token || !userId) {
    return;
  }
  AddressBookService.getAllPersonCards(token, userId)
    .then(personCards => {
      dispatch(setPersonCards(personCards));
    });
};

export const addPersonCardAsync = (personCard: IPersonCard): AppThunk | Promise<void> => (dispatch, getState) =>
  new Promise((resolve, reject) => {
    const state = getState();
    const token = selectToken(state);
    const userId = selectUser(state)?.id;
    if (!token || !userId) {
      reject();
      return;
    }
    AddressBookService.addPersonCard(token, userId, personCard)
      .then(() => {
        dispatch(addPersonCard(personCard));
        resolve();
      });
  });

export const updatePersonCardAsync = (personCard: IPersonCard): AppThunk | Promise<void> => (dispatch, getState) =>
  new Promise<void>((resolve, reject) => {
    const state = getState();
    const token = selectToken(state);
    const userId = selectUser(state)?.id;
    if (!token || !userId) {
      reject();
      return;
    }
    AddressBookService.updatePersonCard(token, userId, personCard)
      .then(() => {
        dispatch(updatePersonCard(personCard));
        resolve();
      });
  });

export const deletePersonCardAsync = (personCardId: string): AppThunk | Promise<void> => (dispatch, getState) =>
  new Promise<void>((resolve, reject) => {
    const state = getState();
    const token = selectToken(state);
    const userId = selectUser(state)?.id;
    if (!token || !userId) {
      reject();
      return;
    }
    AddressBookService.deletePersonCard(token, userId, personCardId)
      .then(() => {
        dispatch(deletePersonCard(personCardId));
        resolve();
      });
  });

export const selectAllPersonCards = (state: RootState) => state.addressBook.personCards;
export const selectPersonCard = (state: RootState) => state.addressBook.personCards.find(a => a.dbId === state.addressBook.selectedPersonCardId);

export default addressBookSlice.reducer;
