import { Injectable } from '@nestjs/common';
import { CreateRegistrationInput } from '../dto/create-registration.input';
import { UpdateRegistrationInput } from '../dto/update-registration.input';

@Injectable()
export class RegistrationsService {
  create(createRegistrationInput: CreateRegistrationInput) {
    return 'This action adds a new registration';
  }

  findAll() {
    return `This action returns all registrations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} registration`;
  }

  update(id: number, updateRegistrationInput: UpdateRegistrationInput) {
    return `This action updates a #${id} registration`;
  }

  remove(id: number) {
    return `This action removes a #${id} registration`;
  }
}
