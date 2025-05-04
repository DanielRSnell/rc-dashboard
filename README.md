# Nightcrawler Dashboard (React + Vite)

This project is a React-based dashboard application built with Vite, migrated from a Next.js application. It provides a modern UI for managing and monitoring compute resources and workflows.

## Project Structure

```
src/
├── assets/         # Static assets like images and icons
├── components/     # Reusable UI components
│   ├── auth/       # Authentication related components
│   ├── dashboard/  # Dashboard specific components
│   ├── ui/         # Base UI components (buttons, cards, etc.)
│   └── workflow/   # Workflow related components
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and store
│   ├── store/      # Zustand stores for state management
│   └── utils/      # Utility functions
├── pages/          # Application pages
│   ├── dashboard/  # Dashboard pages
│   ├── login/      # Authentication pages
│   └── ...         # Other page directories
├── routes/         # Routing configuration
└── styles/         # Global styles and CSS
```

## Technologies Used

- **React**: Frontend library for building user interfaces
- **Vite**: Next-generation frontend tooling
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Zustand**: State management
- **Lucide React**: Icon library
- **Radix UI**: Accessible UI primitives

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v7 or higher)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Features

- Modern, responsive dashboard UI
- Authentication system
- Resource monitoring and visualization
- Workflow management
- Team management
- Settings and configuration

## Migrated from Next.js

This project was migrated from a Next.js application to a Vite-based React SPA. The migration preserved all the components and functionality while removing server-side rendering dependencies.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
