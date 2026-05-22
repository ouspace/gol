---
name: jest-unit-testing
description: Rules and best practices for writing maintainable, readable, and trustworthy unit tests using Jest and principles from The Art of Unit Testing.
---

# Jest & Unit Testing Skill

Use this skill when writing, reviewing, or refactoring unit tests. This skill establishes a high standard for test suite reliability, readability, and speed, drawing on the foundational principles of *The Art of Unit Testing* and the full capabilities of the Jest testing library.

## Core Workflow

1.  **Define the Unit of Work**: Identify the public entry point and the expected behavior/outcome (return value, state change, or third-party interaction).
2.  **Ensure Test Isolation**: Eliminate interactions with external shared states (network, file system, database, global variables, other tests).
3.  **Name the Test Standardly**: Use the Roy Osherove convention: `[UnitOfWork_StateUnderTest_ExpectedBehavior]`.
4.  **Structure the Test Body (AAA)**: Visually divide the test into three distinct blocks: **Arrange**, **Act**, and **Assert**.
5.  **Separate Stubs and Mocks**: Use stubs to provide inputs/allow execution; use at most one mock per test to verify outputs/interactions.
6.  **Run with Determinism**: Stub out non-deterministic APIs (current system time, random values).
7.  **Clean up State**: Clear mock history and restore original implementations in the lifecycle hooks (`beforeEach`, `afterEach`) to prevent test pollution.

## Atomic Rules

Load only the rules needed for the current testing task:

-   [rules/unit-testing-principles.md](./rules/unit-testing-principles.md): Core unit testing concepts (AAA, naming, mocks vs. stubs, DAMP vs. DRY).
-   [rules/jest-guidelines.md](./rules/jest-guidelines.md): Jest framework guidelines (mocking/spying, matchers, fake timers, snapshots, async handling).

## Bundled References

-   [examples/user-service.test.ts](./examples/user-service.test.ts): Concrete unit tests showing how to mock/stub dependencies, write AAA tests, and handle async flows.

## When To Bend The Rules

-   **Existing Suite Patterns**: If modifying legacy tests that use BDD-style phrasing (`it('should return...')`), maintain consistency within that file but apply the Osherove convention to new files.
-   **Integration/E2E Tests**: If explicitly writing integration or E2E tests, you *must* access the filesystem, DB, or network. Clearly flag these as integration tests (e.g. `*.integration.test.ts`) and separate them from quick-running unit tests.
-   **Multiple Mock Assertions**: In complex sagas or multi-step coordination functions, you may assert on multiple calls to the same mock, or occasionally verify interactions with two highly coupled dependencies. Keep this to an absolute minimum to avoid brittle tests.
-   **DAMP vs. DRY limit**: While readability (DAMP) is prioritized in tests, if you find yourself copying 50+ lines of setup code across dozens of tests, extract a test-specific utility builder (e.g., Object Mother) to prevent excessive boilerplate.
