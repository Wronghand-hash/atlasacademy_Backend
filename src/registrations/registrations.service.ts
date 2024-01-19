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

  async getResume(id: string) {
    const file = await this.prismaService.colleagesResume.findUnique({
      where: {
        colleage_id: Number(id),
      },
      select: {
        id: true,
        colleage_name: true,
        file: true,
      },
    });
    const pdfBuffer = Buffer.from(file.file, 'base64');
    return pdfBuffer;
  }

  async getRequests() {
    const requests = await this.prismaService.colleages.findMany({});
    return { requests: requests };
  }

  async addRequest(dto: CoopRequestDto) {
    const request = await this.prismaService.colleages.create({
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
    return { msg: 'درخواست اضافه شد', request: request };
  }

  async addResume(file: any, body) {
    const resume = await this.prismaService.colleagesResume.create({
      data: {
        colleage_id: Number(body.colleageId),
        file: file.buffer.toString('base64'),
        colleage_name: body.name,
      },
    });
    return { resume: resume };
  }
}
