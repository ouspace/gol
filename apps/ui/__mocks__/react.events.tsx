import type { SyntheticEvent } from 'react';

export function createSyntheticEvent<T extends EventTarget>(event: Partial<SyntheticEvent<T>> = {}): SyntheticEvent<T> {
	const defaultProps: Partial<SyntheticEvent<T, MouseEvent>> | Partial<MouseEvent> = {
		// @ts-expect-error unsupported `view` property
		_reactName: "onClick",
		_targetInst: null,
		nativeEvent: new PointerEvent(event.type ?? 'click'),
		// nativeEvent: {
		// 	isTrusted: false,
		// } as MouseEvent,
		currentTarget: null,
		target: null,
		bubbles: true,
		cancelable: true,
		defaultPrevented: false,
		eventPhase: 3, // BUBBLING_PHASE
		isTrusted: false,
		preventDefault: jest.fn(),
		stopPropagation: jest.fn(),
		persist: jest.fn(), // persist() does nothing in React 17+

		// Partial<MouseEvent>
		altKey: false,
		button: 0,
		buttons: 0,
		clientX: 0,
		clientY: 0,
		ctrlKey: false,
		detail: 1,
		getModifierState: jest.fn(),
		isDefaultPrevented: jest.fn(),
		isPropagationStopped: jest.fn(),

		metaKey: false,
		movementX: 0,
		movementY: 0,
		offsetX: 0,
		offsetY: 0,
		pageY: 0,
		pageX: 0,
		relatedTarget: null,
		screenY: 0,
		screenX: 0,
		shiftKey: false,
		timeStamp: Date.now(),
		view: null,
	};

	return { ...defaultProps, ...event } as SyntheticEvent<T>;
}
