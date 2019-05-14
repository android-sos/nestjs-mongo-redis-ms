import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const appOptions = {cors: true};
  const app = await NestFactory.create(ApplicationModule, appOptions);
  
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('Bintrix Company')
    .setDescription('The Best CRM App Starting with logistics')
    .setVersion('0.0.1')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  
  // En esta Crapeta esta la docuemtacion de Swagger
  // TODO: Colocar esta en un servidor.
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();