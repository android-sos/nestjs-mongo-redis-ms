import { Get, Controller } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  root(): string {
    return 'Bintrix CRM is ready to success....';
  }
}