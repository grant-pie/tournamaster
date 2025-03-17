import { DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare const getDatabaseConfig: (configService: ConfigService) => DataSourceOptions;
