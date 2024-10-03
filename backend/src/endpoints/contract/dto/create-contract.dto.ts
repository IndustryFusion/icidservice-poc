export class CreateContractDto {
    data_consumer_company_ifric_id: string;
    contract_datetime_string: string;
}

export class CreateBindingDto {
    data_consumer_company_ifric_id: string;
    data_provider_company_ifric_id: string;
    binding_datetime_string: string;
}
