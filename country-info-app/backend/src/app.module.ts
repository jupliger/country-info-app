import { CountryModule } from './module/country.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CountryModule],
})
export class AppModule {}
