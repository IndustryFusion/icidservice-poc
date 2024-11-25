import { Injectable } from '@nestjs/common';
import { generatePrivateKey, createCSR, generateClientCertificate, verifyCertificate } from '../../utils/certificate';
import { HttpException, HttpStatus } from '@nestjs/common';

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
      if (err instanceof HttpException) {
        throw err;
      } else if(err.response) {
        throw new HttpException(err.response.data.message, err.response.status);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
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
      if (err instanceof HttpException) {
        throw err;
      } else if(err.response) {
        throw new HttpException(err.response.data.message, err.response.status);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async verifyCertificate(certificate_data: string) {
    try {
      const formattedCertData = certificate_data.replace(/\\r\\n/g, '\n');
      return verifyCertificate(formattedCertData);
    } catch(err) {
      if (err instanceof HttpException) {
        throw err;
      } else if(err.response) {
        throw new HttpException(err.response.data.message, err.response.status);
      } else {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
