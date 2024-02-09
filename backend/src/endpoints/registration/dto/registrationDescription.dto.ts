export interface RegistrationDescriptionDto {
    companyName: string;
    street: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    company_registration_number: string;
    factory_server_uuid: string[];
    gateway_uuid: string[];
    ifric_id_company: string;
    ifric_id_Factory_server: string[];
    ifric_id_gateway: string[]
}