import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return this.configService.get(
      'APP_NAME',
      'Valor por defecto si no existe la variable APP_NAME',
    );
    throw new NotFoundException('No existe esta ruta');
    return 'Hello World!';
  }
}
