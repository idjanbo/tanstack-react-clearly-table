# TanStack React Table Project Instructions

## Project Overview

This is a React + TypeScript + Vite application demonstrating advanced table functionality using `@tanstack/react-table`. The project showcases a specialized orders table with grouped row display patterns and custom styling.

## Key Architecture Patterns

### Table Structure Pattern

- Uses `createColumnHelper<Order>()` for type-safe column definitions
- Implements **grouped row rendering**: each order displays as a header row followed by a detail row
- Custom cell component pattern: `TitleCell` wrapper for consistent padding (`px-4 py-3`)
- Mixed column types: `accessor()` for data fields, `display()` for computed/composite content

### Component Organization

```
src/
├── components/OrdersTable.tsx    # Main table implementation
├── types/order.ts               # Data models and mock data
└── App.tsx                      # Simple layout wrapper
```

### Data Modeling

- `Order` interface with nested `OrderItem[]` and `address` object
- Mock data pattern in `mockOrders` array within type file
- Status as union type: `'Completed' | 'Pending' | 'Cancelled'`

## Development Workflow

### Commands

- `pnpm dev` - Start development server
- `pnpm build` - TypeScript compilation + Vite build
- `pnpm lint` - ESLint with TypeScript rules

### Build System

- **Vite with Rolldown**: Uses `rolldown-vite@7.1.14` override for faster builds
- **Tailwind CSS v4**: Configured via `@tailwindcss/vite` plugin (no config file needed)
- **TypeScript**: Strict mode with project references (`tsconfig.app.json` + `tsconfig.node.json`)

## Project-Specific Conventions

### Styling Approach

- **Tailwind CSS v4** with `@import "tailwindcss"` (no traditional config file)
- Component-scoped styling with utility classes
- Status badges: `bg-green-100 text-green-800` pattern
- Hover states: `hover:bg-gray-100 transition-colors`

### Table Rendering Pattern

```tsx
{
  table.getRowModel().rows.map((row) => (
    <React.Fragment key={row.id}>
      {/* Spacing row */}
      <tr>
        <td colSpan={8} className="h-2 bg-white"></td>
      </tr>

      {/* Header row with order info */}
      <tr className="bg-slate-50">...</tr>

      {/* Detail row with column data */}
      <tr className="bg-white">...</tr>
    </React.Fragment>
  ));
}
```

### Column Definition Pattern

- Extract reusable cell components (`TitleCell`)
- Use `columnHelper.display()` for computed columns (payment, address, actions)
- Use `columnHelper.accessor()` for direct data access (items, status, description)
- Size control with `size: 48` for narrow columns

## Dependencies & Integrations

### Core Stack

- `@tanstack/react-table@^8.21.3` - Primary table library
- `react@^19.1.1` - Latest React with concurrent features
- `tailwindcss@^4.1.14` - Latest major version with new architecture

### Development Tools

- ESLint with `typescript-eslint` and React plugins
- Modern config format: `eslint.config.js` with `defineConfig()`
- PNPM for package management with overrides support

## When Adding Features

1. **New columns**: Use `columnHelper` pattern, extract cell components for complex content
2. **Data changes**: Update `Order` interface and mock data together
3. **Styling**: Leverage existing Tailwind patterns (`bg-slate-50`, `text-gray-600`, etc.)
4. **Table features**: Refer to TanStack React Table v8 patterns (sorting, filtering, pagination)

## Critical Files to Understand

- `src/components/OrdersTable.tsx` - Main implementation with grouped row pattern
- `src/types/order.ts` - Data models and mock data structure
- `package.json` - Rolldown Vite override and dependency configuration
