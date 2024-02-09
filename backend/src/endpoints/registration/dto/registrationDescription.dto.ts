export interface RegistrationDescriptionDto {
    companyName: string;
    street: string;
    city: string;
    zip: string;
    state: string;
    country: string;
    companyRegistrationNumber: string;
    factoryServerUUID: string[];
    gatewayUUID: string[];
    ifric_id_company: string;
    ifric_id_Factory_server: string[];
    ifric_id_gateway: string[]
}