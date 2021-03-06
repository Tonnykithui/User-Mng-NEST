import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors:true });
  const config = new DocumentBuilder()
  .setTitle('USER-POSSESSIN ENDPOINT')
  .setDescription('Keeps track of users and the items they own')
  .setVersion('V1')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(3330);
}
bootstrap();
