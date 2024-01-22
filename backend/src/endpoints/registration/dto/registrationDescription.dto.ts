export interface RegistrationDescriptionDto {
    username?: string;
    password?: string;
    confirm_password: string;
    manufacturer_name: string;
    icid_manufacturer: string;
    street: string;
    city: string;
    zip: string;
    state: string;
    country: string;
}