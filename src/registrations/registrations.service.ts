import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegistrationDto } from './dto/RegistrationDto';
import { CoopRequestDto } from './dto/CoopRequestDto';

@Injectable()
export class RegistrationsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getRegistrations() {
    const registrations = await this.prismaService.registrations.findMany({});
    return { registrations: registrations };
  }

  async addRegistration(dto: RegistrationDto) {
    const registration = await this.prismaService.registrations.create({
      data: {
        fullname: dto.fullName,
        phone_number: dto.phoneNumber,
        category: dto.category,
        birth_date: dto.birthDate,
        address: dto.address,
        line_number: dto.lineNumber,
      },
    });
    return { msg: 'درخواست اضافه شد', registration: registration };
  }

  async getRequests() {
    const requests = await this.prismaService.colleages.findMany({});
    return { requests: requests };
  }

  async addRequest(dto: CoopRequestDto) {
    const requests = await this.prismaService.colleages.create({
      data: {
        fullname: dto.fullName,
        father_name: dto.fatherName,
        personal_id: dto.personalId,
        status: dto.status,
        phone_number: dto.phoneNumber,
        category: 'مدرس',
        birth_date: dto.birthDate,
        address: dto.address,
        birth_place: dto.birthPlace,
      },
    });
    return { msg: 'درخواست اضافه شد', requests: requests };
  }
}
