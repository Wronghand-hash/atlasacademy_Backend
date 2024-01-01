import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrationDto } from './dto/RegistrationDto';

@Injectable()
export class RegistrationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRegistrations() {
    // const registrations = await this.prismaService.registrations.findMany({});
    // return { registrations: registrations };
  }

  async addRegistration(dto: RegistrationDto) {
    // const registration = await this.prismaService.registrations.create({
    //   data: {
    //     fullname: dto.fullName,
    //     phone_number: dto.phoneNumber,
    //     category: dto.category,
    //     birth_date: dto.birthDate,
    //     address: dto.address,
    //   },
    // });
    // return { msg: 'درخواست اضافه شد', registration: registration };
  }
}
