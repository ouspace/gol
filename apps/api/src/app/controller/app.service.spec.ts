import { Test } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
	let service: AppService;

	beforeAll(async () => {
		const app = await Test.createTestingModule({
			providers: [AppService],
		}).compile();

		service = app.get<AppService>(AppService);
	});

	test('should get a message', () => {
		
		const result = service.getData();
		
		expect(result).toEqual({ message: 'Hello API' });
	});
});
