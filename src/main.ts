import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000;
  const config = new DocumentBuilder()
    .setTitle('Lesson 1')
    .setDescription('Documentation about REST API')
    .setVersion('1.0.0')
    .addTag('Vova')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
