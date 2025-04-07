import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { CompanyFactory } from './company.factory';
import { MainSeeder } from './main.seeder';
import configuration from '../config/configuration';

const config = configuration();

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: config.postgres.host,
  port: config.postgres.port,
  username: config.postgres.username,
  password: config.postgres.password,
  database: config.postgres.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  factories: [CompanyFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
