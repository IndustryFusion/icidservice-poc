import { Injectable } from '@nestjs/common';
import { generatePrivateKey, createCSR, generateClientCertificate, verifyCertificate } from '../../utils/certificate';

@Injectable()
export class CertificateService {
  constructor() {}

  async generateCompanyCertificate(company_ifric_id: string, expiry: Date) {
    try {
      const { privateKey, publicKey } = generatePrivateKey();

      // Create CSR embedding UID (company_ifric_id) and expiry
      const csr = createCSR(privateKey, company_ifric_id, expiry);

      // Generate client certificate using Root CA
      const clientCert = generateClientCertificate(csr, expiry);

      return clientCert;
    } catch(err) {
      throw err;
    }
  }

  async generateAssetCertificate(asset_ifric_id: string, expiry: Date) {
    try {
      const { privateKey, publicKey } = generatePrivateKey();
    
      // Create CSR embedding UID (asset_ifric_id) and expiry
      const csr = createCSR(privateKey, asset_ifric_id, expiry);
      
      // Generate client certificate using Root CA
      const clientCert = generateClientCertificate(csr, expiry);
      
      return clientCert;
    } catch(err) {
      throw err;
    }
  }

  async verifyCertificate(certificate_data: string) {
    try {
      const formattedCertData = certificate_data.replace(/\\r\\n/g, '\n');
      return verifyCertificate(formattedCertData);
    } catch(err) {
      throw err;
    }
  }
}
