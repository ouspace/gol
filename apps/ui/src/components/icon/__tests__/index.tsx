import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { SyntheticEvent } from 'react';

import { Icon } from '../index';

describe('apps/ui/src/components/icon', () => {
	const getIcon = (role: 'img' | 'button' = 'img') => screen.getByRole(role, { hidden: true });

	describe('layouts', () => {
		test('should render with default classes and image role when no properties are provided', () => {
			const target = <Icon />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('icon');
		});

		test('should set the name attribute on the icon element when a valid icon name is provided', () => {
			const target = <Icon name="10k" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveAttribute('name', '10k');
		});

		test('should apply rotation styles with 180 degrees when the rotated property is true', () => {
			const target = <Icon rotated />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: 180deg');
		});

		test('should apply rotation style of 0 degrees when rotated is set to north', () => {
			const target = <Icon rotated="north" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: 0deg');
		});

		test('should apply rotation style of 90 degrees when rotated is set to east', () => {
			const target = <Icon rotated="east" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: 90deg');
		});

		test('should apply rotation style of 180 degrees when rotated is set to south', () => {
			const target = <Icon rotated="south" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: 180deg');
		});

		test('should apply rotation style of 270 degrees when rotated is set to west', () => {
			const target = <Icon rotated="west" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: 270deg');
		});

		test('should apply custom radian rotation style when rotated specifies a value and a radian unit', () => {
			const target = <Icon rotated={{ value: 0.25, unit: 'rad' }} />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: 0.25rad');
		});

		test('should apply custom turn rotation style when rotated specifies a value and a turn unit', () => {
			const target = <Icon rotated={{ value: 1, unit: 'turn' }} />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: 1turn');
		});

		test('should apply negative rotation style when rotated direction is counter-clockwise', () => {
			const target = <Icon rotated={{ value: 90, unit: 'deg', direction: 'counter-clockwise' }} />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveClass('rotated');
			expect(getIcon()).toHaveStyle('--icon-rotate: -90deg');
		});

		test('should apply weight style of 400 when weight is normal', () => {
			const target = <Icon weight="normal" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveStyle('--icon-weight: 400;');
		});

		test('should apply weight style of 100 when weight is lightest', () => {
			const target = <Icon weight="lightest" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveStyle('--icon-weight: 100;');
		});

		test('should apply weight style of 200 when weight is light', () => {
			const target = <Icon weight="light" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveStyle('--icon-weight: 200;');
		});

		test('should apply weight style of 300 when weight is lightless', () => {
			const target = <Icon weight="lightless" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveStyle('--icon-weight: 300;');
		});

		test('should apply weight style of 500 when weight is boldless', () => {
			const target = <Icon weight="boldless" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveStyle('--icon-weight: 500;');
		});

		test('should apply weight style of 600 when weight is bold', () => {
			const target = <Icon weight="bold" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveStyle('--icon-weight: 600;');
		});

		test('should apply weight style of 700 when weight is boldest', () => {
			const target = <Icon weight="boldest" />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).toHaveStyle('--icon-weight: 700;');
		});

		test('should apply the smallest class when size is smallest', () => {
			const target = <Icon size="smallest" />;

			render(target);

			expect(getIcon()).toHaveClass('smallest');
		});

		test('should apply the biggest class when size is biggest', () => {
			const target = <Icon size="biggest" />;

			render(target);

			expect(getIcon()).toHaveClass('biggest');
		});

		test('should not apply numeric weight style when weight is specified as a custom positive number', () => {
			const target = <Icon weight={450} />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).not.toHaveStyle('--icon-weight: 450;');
		});

		test('should not apply the weight style variable when weight is specified as zero', () => {
			const target = <Icon weight={0} />;

			render(target);

			expect(getIcon()).toBeDefined();
			expect(getIcon()).not.toHaveStyle('--icon-weight: 0;');
		});

		xtest('should render the icon as filled when fill property is true', () => {
			const target = <Icon name="10k" fill />;

			render(target);

			expect(getIcon()).toBeDefined();
		});

		test('should not render the style attribute when no custom style is provided', () => {
			const target = <Icon />;

			render(target);

			expect(getIcon()).not.toHaveAttribute('style');
		});

		test('should apply custom style properties when a custom style object is provided', () => {
			const customStyle = { color: 'red', marginTop: '10px' };
			const target = <Icon style={customStyle} />;

			render(target);

			const element = getIcon();
			expect(element).toHaveStyle('color: rgb(255, 0, 0)');
			expect(element).toHaveStyle('margin-top: 10px');
		});

		test('should merge custom styles with internal style variables when both custom style and internal modifiers are provided', () => {
			const customStyle = { color: 'red', fontSize: '18px' };
			const target = <Icon style={customStyle} size="smallest" rotated />;

			render(target);

			const element = getIcon();
			expect(element).toHaveStyle('color: rgb(255, 0, 0)');
			expect(element).toHaveStyle('font-size: 18px');
			expect(element).toHaveStyle('--icon-rotate: 180deg');
		});

		test('should override the color variable with custom style color when both style color and color property are provided', () => {
			const target = <Icon color="red" style={{ color: 'blue' }} />;

			render(target);

			const element = getIcon();
			expect(element).toHaveStyle('color: rgb(0, 0, 255)');
			expect(element).toHaveStyle('--icon-color: red');
		});

		test('should render the custom SVG content directly when the svg XML string is provided', () => {
			const customXml = '<svg data-testid="custom-svg"><path d="M0,0 L10,10" /></svg>';
			const target = <Icon svg={customXml} />;

			render(target);

			expect(screen.getByTestId('svg-xml-mock')).toHaveAttribute('data-xml', customXml);
		});

		test('should forward native HTML attributes to the span wrapper when extra HTML attributes are provided', () => {
			const target = <Icon id="test-icon-id" aria-label="custom-aria-label" data-custom="value" />;

			render(target);

			const element = getIcon();
			expect(element).toHaveAttribute('id', 'test-icon-id');
			expect(element).toHaveAttribute('aria-label', 'custom-aria-label');
			expect(element).toHaveAttribute('data-custom', 'value');
		});
	});

	describe('events', () => {
		test('should trigger the onClick callback when the button variant is clicked', async () => {
			let eventMock: SyntheticEvent | null = null;
			const onClick = jest.fn((event: SyntheticEvent) => { eventMock = event; });
			const user = userEvent.setup();
			const target = <Icon onClick={onClick} />;
			render(target);

			await user.click(getIcon('button'));

			expect(getIcon('button')).toBeDefined();
			expect(onClick).toHaveBeenCalled();
			expect(onClick).toHaveBeenCalledWith(eventMock, {
				disabled: false,
				variant: 'outlined',
				viewBox: '120 -840 720 720',
			});
		});

		test('should trigger the onClick callback twice when Enter and Space keys are pressed on the focused button', async () => {
			const onClick = jest.fn();
			const user = userEvent.setup();
			const target = <Icon onClick={onClick} />;
			render(target);
			const element = getIcon('button');
			element.focus();

			await user.keyboard('{Enter}');
			await user.keyboard(' ');

			expect(onClick).toHaveBeenCalledTimes(2);
		});

		test('should not trigger the onClick callback when Enter or Space keys are pressed and the button is disabled', async () => {
			const onClick = jest.fn();
			const user = userEvent.setup();
			const target = <Icon onClick={onClick} disabled />;
			render(target);
			const element = getIcon('button');
			element.focus();

			await user.keyboard('{Enter}');
			await user.keyboard(' ');

			expect(onClick).not.toHaveBeenCalled();
		});

		test('should not trigger the onClick callback when clicked and the button is disabled', async () => {
			const onClick = jest.fn();
			const user = userEvent.setup();
			const target = <Icon onClick={onClick} disabled />;
			render(target);

			await user.click(getIcon('button'));

			expect(getIcon('button')).toBeDefined();
			expect(onClick).not.toHaveBeenCalled();
		});
	});
});
