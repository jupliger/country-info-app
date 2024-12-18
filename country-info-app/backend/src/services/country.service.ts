import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountryService {
  constructor(private readonly httpService: HttpService) {}

  async getAvailableCountries() {
    const response = await firstValueFrom(this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'));
    return response.data;
  }

  async getCountryInfo(code: string) {
    const countryInfoResponse = await firstValueFrom(this.httpService.get(`https://date.nager.at/api/v3/CountryInfo/${code}`));
    const populationResponse = await firstValueFrom(this.httpService.get(`https://countriesnow.space/api/v0.1/countries/population`));
    const flagResponse = await firstValueFrom(this.httpService.get(`https://countriesnow.space/api/v0.1/countries/flag/images`));

    return {
      ...countryInfoResponse.data,
      populationData: populationResponse.data,
      flagUrl: flagResponse.data,
    };
  }
}
