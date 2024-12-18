import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class AppModule {}
