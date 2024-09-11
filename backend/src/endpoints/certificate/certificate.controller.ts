import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCompanyCertificateDto, CreateAssetCertificateDto } from './dto/create-certificate.dto';


@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post('create-company-certificate')
  async generateCompanyCertificate(@Body() data: CreateCompanyCertificateDto) {
    try {
      return await this.certificateService.generateCompanyCertificate(data.company_ifric_id, new Date(data.expiry));
    } catch(err) {
      throw err;
    }
  }

  @Post('create-asset-certificate')
  async generateAssetCertificate(@Body() data: CreateAssetCertificateDto) {
    try {
      return await this.certificateService.generateAssetCertificate(data.asset_ifric_id, new Date(data.expiry));
    } catch(err) {
      throw err;
    }
  }

  @Post('verify-company-certificate')
  async verifyCertificate(@Body() data: {company_ifric_id: string, certificate_data: string}) {
    try {
      return await this.certificateService.verifyCertificate(data.certificate_data);
    } catch(err) {
      throw err;
    }
  }

  @Post('verify-asset-certificate')
  async verifyAssetCertificate(@Body() data: {asset_ifric_id: string, certificate_data: string}) {
    try {
      return await this.certificateService.verifyCertificate(data.certificate_data);
    } catch(err) {
      throw err;
    }
  }
}
