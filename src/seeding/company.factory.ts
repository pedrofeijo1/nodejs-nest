import { setSeederFactory } from 'typeorm-extension';
import { Company } from '../entities/company.entity';

export const CompanyFactory = setSeederFactory(
  Company,
  () => {
  const company = new Company();
  company.id = 1;
  company.name = 'Financial Control';
  return company;
});
