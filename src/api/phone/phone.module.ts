import { Module } from '@nestjs/common';
import PhoneService from './service/phone.service';
import PhoneController from './controller/phone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/repository/typeOrmEx.module';
import Phone from './domain/phone.entity';
import PhoneRepository from './repository/phone.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Phone]),
    TypeOrmExModule.forCustomRepository([PhoneRepository]),
  ],
  controllers: [PhoneController],
  providers: [PhoneService],
})
export default class PhoneModule {}
