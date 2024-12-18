import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from '../services/country.service';

@Controller('api')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('available-countries')
  async getAvailableCountries() {
    return this.countryService.getAvailableCountries();
  }

  @Get('country-info/:code')
  async getCountryInfo(@Param('code') code: string) {
    return this.countryService.getCountryInfo(code);
  }
}
