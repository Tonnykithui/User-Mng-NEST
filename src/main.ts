import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors:true });
  
  const config = new DocumentBuilder()
   .setTitle('Possession List')
   .setDescription('List of items associated with owners')
   .setVersion('v1')
   .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3330);
}
bootstrap();
