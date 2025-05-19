import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3001', // Allow requests from Next.js frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // Allow these HTTP methods
    credentials: true, // Allow cookies and authorization headers
    allowedHeaders: 'Content-Type, Authorization, x-apollo-operation-name', // Allow specific headers
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
