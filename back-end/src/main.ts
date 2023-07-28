import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*COnfiguration de swagger*/
  const config = new DocumentBuilder()
    .setTitle('Réseau')
    .setDescription('The Réseau API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /*Permet l'activation de la validation de manière globale*/
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
