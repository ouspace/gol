/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { json } from 'body-parser';
import { AppModule } from './app/controller/app.module';

async function bootstrap() {
	Logger.log(`Application is starting...`);

	const globalPrefix = 'api';
	const port = process.env.PORT ?? 3000 as number;

	const service = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

	// service.use(json({ limit: '50mb' }));
	service.useBodyParser('application/json', { bodyLimit: 1 * 1000 * 1024 }); // INFO: 50mb
	service.setGlobalPrefix(globalPrefix);

	await service.listen(port);

	Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

// eslint-disable-next-line unicorn/prefer-top-level-await -- `bootstrap` is the main process so it is an exception `await` usage.
void bootstrap();
