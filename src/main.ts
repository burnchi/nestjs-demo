import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExecptionTsFilter } from './common/filters/http-execption.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  app.useGlobalFilters(new HttpExecptionTsFilter());
  await app.listen(3000);
}
bootstrap();
