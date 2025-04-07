import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Company } from '../entities/company.entity';
import { Bank } from '../entities/bank.entity';
import { User } from '../entities/user.entity';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    await this.bankSeed(dataSource);
    const companies: Company[] = await this.companySeed(dataSource);
    await this.userSeed(dataSource, companies);
  }

  public async bankSeed(dataSource: DataSource): Promise<any> {
    console.log('Seeding banks...');
    const repo = dataSource.getRepository(Bank);
    await repo.save([
      { name: 'Bradesco' },
      { name: 'Inter' }
    ]);
    console.log('Banks seeded!');
  }

  public async companySeed(dataSource: DataSource): Promise<Company[]> {
    console.log('Seeding companies....');
    const repo = dataSource.getRepository(Company);
    const companies = await repo.save([
      { id: 1, name: 'Financial Control' },
    ]);
    console.log('Companies seeded!');

    return companies;
  }

  public async userSeed(
    dataSource: DataSource,
    companies: Company[],
  ): Promise<any> {
    console.log('Seeding users....');
    const repo = dataSource.getRepository(User);
    await repo.save([
      {
        name: 'Pedro Feijó',
        username: 'pedrofeijo',
        email: 'pedrofeijo1997@gmail.com',
        password:
          '$2b$10$aYHSyIvzkfJTmuJcHZbK3emzp05.nzLtD5ct/DlB0F36pCepf0d/.',
        company: companies.at(0),
      },
    ]);
    console.log('Users seeded!');
  }
}
