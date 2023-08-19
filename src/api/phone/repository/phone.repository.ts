// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import { CustomRepository } from 'src/repository/typeorm-ex.decorator';
import Phone from '../domain/phone.entity';

@CustomRepository(Phone)
export default class PhoneRepository extends Repository<Phone> {}
