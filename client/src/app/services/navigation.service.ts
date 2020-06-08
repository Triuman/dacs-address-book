import { history } from "../helpers/history";


function redirectTo(path: string) {
    history.push(path);
}

export const LoginPagePath = "/login";
export const RegisterPagePath = "/register";
export const UserAreaPath = "/user";
export const AddressBookPagePath = UserAreaPath + "/addressbook";
export const AddressCardEditPagePath = AddressBookPagePath + "/edit";

const toLogin = () => redirectTo(LoginPagePath);
const toRegister = () => redirectTo(RegisterPagePath);
const toAddressBook = () => redirectTo(AddressBookPagePath);
const toAddressCardEdit = () => redirectTo(AddressCardEditPagePath);

const goBack = () => history.goBack();

export const NavigationService = {
    goBack,
    toLogin,
    toRegister,
    toAddressBook,
    toAddressCardEdit
}