import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
	let app: TestingModule;

	beforeAll(async () => {
		app = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService],
		}).compile();
	});

	test('should get a message', () => {
		
		const controller = app.get<AppController>(AppController);
	  

		const response = controller.getData();
	  
		
		expect(response).toEqual({ message: 'Hello API' });
	  });
	  
});