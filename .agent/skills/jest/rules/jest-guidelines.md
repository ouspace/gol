# Jest Specific Guidelines

These guidelines govern how Jest APIs must be used to write deterministic, readable, and highly maintainable test suites in JavaScript and TypeScript.

---

## 1. Choosing the Right Matcher

Always use the most precise matcher available to ensure test failures provide clear diagnostic information.

-   **Primitive values and references**: Use `.toBe(value)` (uses `Object.is`).
-   **Deep objects / Arrays**: Use `.toEqual(object)` for structural equality.
-   **Strict equality (Recommended)**: Use `.toStrictEqual(object)`. This is safer than `.toEqual` because it checks for:
    -   `undefined` properties (e.g. `{a: undefined, b: 2}` is not equal to `{b: 2}`).
    -   Array sparseness (e.g. `[, 1]` is not equal to `[undefined, 1]`).
    -   Object type/class matching (checks if prototypes match).
-   **Partial matching**: Use `expect.objectContaining()` or `expect.arrayContaining()` to assert only on specific properties/elements, reducing boilerplate and test brittleness.

---

## 2. Preventing Test Pollution (Mock Lifecycle)

Mutable mocks and global spies can leak state across tests, causing execution-order dependencies. Clean up after every test.

### Default Setup
Implement mock reset behaviors in hooks. Standardize on the following configuration:

```typescript
describe('libs/my-service', () => {
  beforeEach(() => {
    // 1. Reset all call counts and history of mocks, retaining their custom implementations.
    jest.clearAllMocks();
  });

  afterEach(() => {
    // 2. Restore mock implementations to their original methods (only works for spyOn).
    jest.restoreAllMocks();
  });
});
```

### Mock API Reference
-   `jest.clearAllMocks()`: Clears history (calls, arguments, results) of mock functions. *Recommended for beforeEach.*
-   `jest.resetAllMocks()`: Resets history **and** deletes mock implementations (reverts them to return `undefined`).
-   `jest.restoreAllMocks()`: Restores original methods mocked via `jest.spyOn()`. *Recommended for afterEach.*

---

## 3. Mocking Modules & TypeScript Support

When using module-level mocking (`jest.mock`), ensure you type the mocked imports correctly to maintain autocomplete and compiler safety.

### Module Mocking and Casting
Use `jest.mocked()` to cast mock imports for type-safe assertions:

```typescript
import { sendEmail } from './email-client';

jest.mock('./email-client'); // Auto-mocks the export

// Cast to mocked function in tests
const mockedSendEmail = jest.mocked(sendEmail);

test('should call the email client when a user is successfully registered', async () => {
  mockedSendEmail.mockResolvedValue({ success: true }); // Type-safe stubbing
  
  await sut.registerUser(user);
  
  expect(mockedSendEmail).toHaveBeenCalledWith(user.email, expect.any(String)); // Type-safe mocking
});
```

### Manual Mocks for Components via `__mocks__/`
When mocking custom components (e.g., `components/icon`), implement a manual mock inside a `__mocks__/` directory adjacent to the module or index file. 

When tests mock the path to the component, Jest automatically looks for the `__mocks__/` folder under that component path and resolves to it:

```typescript
// In a sibling component test file, e.g. components/card/__tests__/card.test.tsx
import Icon from '../../icon'; // Resolves to components/icon/index.ts

jest.mock('../../icon'); 
// Jest automatically resolves this mock call to:
// "components/icon/__mocks__/index.ts"

test('should render the mocked icon component', () => {
  // Now, any render or use of <Icon /> will use the mock implementation defined in "__mocks__/index.ts"
});
```

---

## 4. Virtualizing Time & Determinism

Never rely on raw clocks (`Date.now()`, `new Date()`) or real timeouts (`setTimeout`) in unit tests.

-   **Fake Timers**: Call `jest.useFakeTimers()` to intercept timers and system clock.
-   **Mock System Time**: Set a constant system time to make assertions predictable.
-   **Clean Up**: Restore real timers in `afterEach` or `afterAll`.

```typescript
describe('libs/time-sensitive-service', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-05-21T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should execute the scheduled task after the delay period', () => {
    const callback = jest.fn();
    
    sut.schedule(callback, 5000); // 5 seconds
    
    // Act
    jest.advanceTimersByTime(5000);
    
    // Assert
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

---

## 5. Testing Asynchronous Code & Exceptions

Always structure async tests with standard promise patterns. Do not mix `done()` callbacks with promises.

### Asynchronous Flow
Ensure the test returns the promise or uses `await` directly in the test body.

```typescript
test('should return data when fetching with a valid id', async () => {
  // Act
  const data = await sut.fetchData('id-123');

  // Assert
  expect(data).toStrictEqual({ id: 'id-123', value: 'foo' });
});
```

### Exception Assertions
When verifying that a function throws an error, wrap the action or use promise rejects matchers:

```typescript
// Synchronous error testing (Standard B style is also acceptable for utilities)
test('should throw a SyntaxError when parsing invalid JSON', () => {
  expect(() => sut.parse('{invalid}')).toThrow(SyntaxError);
});

// Asynchronous error testing (Option A - rejects matcher)
test('should reject with a NotFoundError when the user id is invalid', async () => {
  await expect(sut.fetchData('invalid-id')).rejects.toThrow(NotFoundError);
});

// Asynchronous error testing (Option B - try/catch)
test('should reject with a NotFoundError when using try/catch on an invalid id', async () => {
  expect.hasAssertions(); // Ensures the test fails if no exception is thrown
  try {
    await sut.fetchData('invalid-id');
  } catch (error) {
    expect(error).toBeInstanceOf(NotFoundError);
  }
});
```

---

## 6. Snapshot Rules

Snapshot tests are fragile, easy to update blindly (`jest -u`), and offer poor documentation value.

1.  **Avoid Large Snapshots**: Do not snapshot large DOM structures or huge data arrays. Prefer fine-grained assertions.
2.  **Use Inline Snapshots**: For small config outputs or serializations, prefer `toMatchInlineSnapshot()`. It makes the expected output immediately visible inside the code, facilitating reviews:

```typescript
test('should serialize the config object into the correct layout structure', () => {
  const config = sut.buildConfig();

  expect(config).toMatchInlineSnapshot(`
    Object {
      "port": 8080,
      "protocol": "https",
      "timeout": 3000,
    }
  `);
});
```
