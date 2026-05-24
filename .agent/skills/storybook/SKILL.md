---
name: storybook
description: Manage and run Storybook for components. INVOKE when the user wants to view component stories, create new stories, or run the Storybook development server. Trigger words - storybook, view stories, create story, run storybook.
---

# Storybook Management Guide (CSF 3.0 & React 19)

This skill provides the standards and instructions for maintaining visual component documentation and automated behavior tests using Storybook.

## Key Principles

1. **CSF 3.0 Object Syntax**: Write all stories using Component Story Format 3 (CSF 3) object syntax. Avoid legacy `Template.bind({})` functions.
2. **Strict TypeScript Typing**: Always type stories using `Meta<typeof Component>` and `StoryObj<typeof Component>` from `@storybook/react`.
3. **Automate Interaction Tests**: Write CSF `play` functions for interactive states (e.g. checkbox toggle, dropdown expand) to execute Given/When/Then assertions automatically.
4. **Theme Alignment**: Wrap stories in the required MD3 theme providers or CSS class container decorators to ensure custom properties are loaded.
5. **Accessibility (a11y)**: Ensure stories have correct ARIA attributes and visible focus rings. Verify against WCAG AA standards.
6. **Use Nx CLI**: Execute storybook tasks through Nx workspace scripts: `npx nx run <project>:storybook` or `npx nx run <project>:test-storybook`.

---

## Action Steps

### 1. Project Discovery
Check `project.json` or `package.json` to find Storybook targets:
```bash
npx nx show projects --with-target storybook
```

### 2. Run Storybook Server
Start the local development server:
```bash
npx nx run <project-name>:storybook
```

### 3. Create a Story (Template)
Create `<component-name>.stories.tsx` next to the component file:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { expect } from '@storybook/test';
import { userEvent, within } from '@storybook/test';
import { Button } from './root';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'elevated', 'tonal', 'outlined', 'text'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// Default View Story
export const Default: Story = {
  args: {
    variant: 'filled',
    children: 'Click me',
  },
};

// Interactive / Behavior Story
export const InteractiveClick: Story = {
  args: {
    variant: 'filled',
    children: 'Action Button',
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    await step('Click and Focus Button', async () => {
      await userEvent.click(button);
      await expect(button).toHaveFocus();
    });
  },
};
```

### 4. Running Storybook Test Runner
Run integration tests against running stories:
```bash
npx nx run <project-name>:test-storybook
```
