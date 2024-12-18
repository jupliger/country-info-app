import * as https from 'https';

import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries() {
    try {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      const response = await firstValueFrom(this.httpService.get('https://date.nager.at/api/v3/AvailableCountries', { httpsAgent }));
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar países:', error);
      throw new InternalServerErrorException('Erro ao buscar países');
    }
  }

  async getCountryInfo(code: string) {
    try {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      const countryInfoResponse = await firstValueFrom(this.httpService.get(`https://date.nager.at/api/v3/CountryInfo/${code}`, { httpsAgent }));
      const populationResponse = await firstValueFrom(this.httpService.get(`https://countriesnow.space/api/v0.1/countries/population`, { httpsAgent }));
      const flagResponse = await firstValueFrom(this.httpService.get(`https://countriesnow.space/api/v0.1/countries/flag/images`, { httpsAgent }));

      return {
        ...countryInfoResponse.data,
        populationData: populationResponse.data,
        flagUrl: flagResponse.data,
      };
    } catch (error) {
      console.error('Erro ao buscar informações do país:', error);
      throw new InternalServerErrorException('Erro ao buscar informações do país');
    }
  }
}
