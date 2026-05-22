import { jest, describe, beforeEach, test, expect } from '@jest/globals';

// ============================================================================
// Inline Domain Definitions (for self-contained compilation/execution)
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export interface EmailService {
  sendWelcomeEmail(email: string, name: string): Promise<void>;
}

export class DuplicateUserError extends Error {
  constructor(email: string) {
    super(`User with email ${email} already exists.`);
    this.name = 'DuplicateUserError';
  }
}

export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User with id ${id} was not found.`);
    this.name = 'UserNotFoundError';
  }
}

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  async register(email: string, name: string): Promise<User> {
    if (!email || !name) {
      throw new Error('Email and name are required.');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new DuplicateUserError(email);
    }

    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      email,
      name,
      isActive: true,
    };

    const savedUser = await this.userRepository.save(newUser);
    
    // Fire and forget, or awaited
    await this.emailService.sendWelcomeEmail(savedUser.email, savedUser.name);

    return savedUser;
  }

  async deactivate(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError(id);
    }

    user.isActive = false;
    return this.userRepository.save(user);
  }
}

// ============================================================================
// Object Mother / Test Data Builder Pattern
// ============================================================================

function createTestUser(overrides?: Partial<User>): User {
  return {
    id: 'user-123',
    email: 'john.doe@example.com',
    name: 'John Doe',
    isActive: true,
    ...overrides,
  };
}

// ============================================================================
// Unit Tests
// ============================================================================

describe('libs/user/user-service', () => {
  // We declare the mocks and SUT interfaces
  let stubUserRepository: jest.Mocked<UserRepository>;
  let mockEmailService: jest.Mocked<EmailService>;
  let userService: UserService;

  beforeEach(() => {
    // Re-create dependencies before each test to prevent test pollution
    stubUserRepository = {
      findById: jest.fn<UserRepository['findById']>(),
      findByEmail: jest.fn<UserRepository['findByEmail']>(),
      save: jest.fn<UserRepository['save']>(),
    } as unknown as jest.Mocked<UserRepository>;

    mockEmailService = {
      sendWelcomeEmail: jest.fn<EmailService['sendWelcomeEmail']>(),
    } as unknown as jest.Mocked<EmailService>;

    userService = new UserService(stubUserRepository, mockEmailService);

    // Clear call history of all mocked structures
    jest.clearAllMocks();
  });

  describe('register', () => {
    test('should register the user and return the saved user object when registration details are valid', async () => {
      // Arrange
      const email = 'john.doe@example.com';
      const name = 'John Doe';
      const expectedUser = createTestUser({ email, name });

      // stubUserRepository is acting as a STUB (indirect input helper)
      stubUserRepository.findByEmail.mockResolvedValue(null);
      stubUserRepository.save.mockResolvedValue(expectedUser);
      mockEmailService.sendWelcomeEmail.mockResolvedValue(undefined);

      // Act
      const result = await userService.register(email, name);

      // Assert
      expect(result).toStrictEqual(expectedUser);
    });

    test('should send a welcome email when a valid new user is registered', async () => {
      // Arrange
      const email = 'john.doe@example.com';
      const name = 'John Doe';
      const expectedUser = createTestUser({ email, name });

      stubUserRepository.findByEmail.mockResolvedValue(null);
      stubUserRepository.save.mockResolvedValue(expectedUser);
      // mockEmailService is acting as a MOCK (asserting indirect output/interaction)
      mockEmailService.sendWelcomeEmail.mockResolvedValue(undefined);

      // Act
      await userService.register(email, name);

      // Assert (One Mock assertion)
      expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(email, name);
      expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledTimes(1);
    });

    test('should throw a DuplicateUserError when registering a user whose email is already in use', async () => {
      // Arrange
      const email = 'john.doe@example.com';
      const name = 'John Doe';
      const existingUser = createTestUser({ email });

      stubUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      // We expect the promise to reject with a specific class of error
      await expect(userService.register(email, name)).rejects.toThrow(DuplicateUserError);
    });

    test('should throw an error when attempting to register with an empty email address', async () => {
      // Arrange
      const emptyEmail = '';
      const name = 'John Doe';

      // Act & Assert
      await expect(userService.register(emptyEmail, name)).rejects.toThrow(
        'Email and name are required.'
      );
    });
  });

  describe('deactivate', () => {
    test('should set isActive to false and return the deactivated user when deactivating an active user', async () => {
      // Arrange
      const userId = 'user-123';
      const activeUser = createTestUser({ id: userId, isActive: true });

      stubUserRepository.findById.mockResolvedValue(activeUser);
      stubUserRepository.save.mockImplementation(async (u) => u); // Stub echo implementation

      // Act
      const result = await userService.deactivate(userId);

      // Assert
      expect(result.isActive).toBe(false);
      // Verify that save was called with the modified user object containing isActive: false
      expect(stubUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ id: userId, isActive: false })
      );
    });

    test('should throw a UserNotFoundError when attempting to deactivate a user that does not exist', async () => {
      // Arrange
      const nonExistentId = 'user-999';
      stubUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.deactivate(nonExistentId)).rejects.toThrow(UserNotFoundError);
    });
  });
});
