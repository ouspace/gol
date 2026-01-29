import '@testing-library/jest-dom';

// @ts-expect-error unsupported `PointerEvent` in JSDOM
globalThis.PointerEvent = class PointerEvent extends Event {};
