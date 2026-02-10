# Component Documentation

## Table of Contents

1. [Data Access Layer](#data-access-layer)
2. [API Response System](#api-response-system)
3. [Reusable UI Components](#reusable-ui-components)
4. [Performance Optimizations](#performance-optimizations)
5. [Error Handling](#error-handling)
6. [Usage Examples](#usage-examples)

## Data Access Layer

### Repository Pattern

The application uses a repository pattern for data access, providing a clean abstraction over Prisma queries.

#### Base Repository

```typescript
import { BaseRepository } from '@/lib/repository/base';

class CustomRepository extends BaseRepository<Model> {
  constructor() {
    super(db.model);
  }
}
```

#### Available Repositories

- `CharacterRepository` - Character data operations
- `UserRepository` - User data operations  
- `HolyRelicRepository` - Holy relic data operations

#### Usage Example

```typescript
import { characterRepository } from '@/lib/repository';

// Get characters with filters
const characters = await characterRepository.findWithFilters({
  rarity: 'SSR',
  game: 'Base'
}, {
  page: 1,
  limit: 20,
  sortBy: 'name'
});

// Search characters
const searchResults = await characterRepository.search('Merlin');

// Get character with relations
const characterWithSkills = await characterRepository.findWithRelations({
  where: { slug: 'merlin' },
  include: { skills: true }
});
```

## API Response System

### Standardized Response Format

All API responses follow a consistent format for better error handling and client-side processing.

#### Success Response

```typescript
{
  success: true,
  data: T,
  message?: string,
  meta: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    },
    timestamp: string,
    requestId?: string
  }
}
```

#### Error Response

```typescript
{
  success: false,
  error: {
    code: string,
    message: string,
    details?: any
  },
  meta: {
    timestamp: string,
    requestId?: string
  }
}
```

#### Usage Example

```typescript
import { ApiHandler } from '@/lib/api-handler';

export async function GET(request: Request) {
  try {
    const data = await fetchData();
    
    return ApiHandler.success(data, 'Data fetched successfully', pagination);
  } catch (error) {
    return ApiHandler.serverError('Failed to fetch data', error);
  }
}
```

## Reusable UI Components

### DataTable Component

A powerful, reusable data table with built-in sorting, pagination, and search functionality.

```typescript
import { DataTable, Column } from '@/components/ui/data-table';

const columns: Column<User>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    searchable: true
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    searchable: true
  },
  {
    key: 'role',
    label: 'Role',
    render: (value) => <Badge>{value}</Badge>
  }
];

<DataTable
  data={users}
  columns={columns}
  searchable={true}
  pagination={true}
  pageSize={10}
  onRowClick={(user) => navigate(`/users/${user.id}`)}
/>
```

### SimpleForm Component

Dynamic form component that generates forms from configuration.

```typescript
import { SimpleForm } from '@/components/ui/simple-form';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.enum(['USER', 'ADMIN'])
});

const fields = [
  {
    name: 'name',
    label: 'Name',
    type: 'text' as const,
    required: true
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    required: true
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select' as const,
    options: [
      { label: 'User', value: 'USER' },
      { label: 'Admin', value: 'ADMIN' }
    ]
  }
];

<SimpleForm
  schema={schema}
  fields={fields}
  onSubmit={handleSubmit}
  submitText="Create User"
/>
```

### Layout Components

#### PageLayout

```typescript
import { PageLayout } from '@/components/ui/layout';

<PageLayout size="lg" padding="md">
  <h1>Page Title</h1>
  <Page Content />
</PageLayout>
```

#### Section

```typescript
import { Section } from '@/components/ui/layout';

<Section
  title="User Management"
  subtitle="Manage application users"
  action={<Button>Add User</Button>}
  bordered={true}
>
  <Section Content />
</Section>
```

#### CardGrid

```typescript
import { CardGrid } from '@/components/ui/layout';

<CardGrid columns={3} gap="md" responsive={true}>
  {characters.map(char => (
    <CharacterCard key={char.id} character={char} />
  ))}
</CardGrid>
```

### Loading States

#### LoadingState Component

```typescript
import { LoadingState } from '@/components/ui/loading-state';

<LoadingState type="spinner" text="Loading..." size="md" />
<LoadingState type="skeleton" />
<LoadingState type="dots" text="Processing..." />
```

#### Skeleton Components

```typescript
import { SkeletonCard, CharacterGridSkeleton } from '@/components/ui/loading-state';

// Single card skeleton
<SkeletonCard showImage showBadge lines={2} />

// Character grid skeleton
<CharacterGridSkeleton count={12} />
```

### Empty States

```typescript
import { EmptyState } from '@/components/ui/layout';

<EmptyState
  title="No characters found"
  description="Try adjusting your search filters"
  action={<Button>Clear Filters</Button>}
/>
```

## Performance Optimizations

### Memoized Components

The `optimizeComponent` utility helps create memoized components with optional deep comparison.

```typescript
import { optimizeComponent } from '@/lib/performance';

const OptimizedComponent = optimizeComponent(MyComponent, {
  memo: true,
  deepCompare: true
});
```

### Performance Hooks

```typescript
import { useMemoCallback, useDeepMemo } from '@/lib/performance';

// Memoized callback
const handleClick = useMemoCallback((id: string) => {
  // Handle click
}, [dependency]);

// Deep memo
const expensiveValue = useDeepMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### Performance Monitoring

```typescript
import { performance } from '@/lib/performance';

// Mark start
performance.mark('operation-start');

// Do work

// Mark end and measure
performance.mark('operation-end');
performance.measure('operation-duration', 'operation-start', 'operation-end');
```

### Optimized Character Card Example

```typescript
import { CharacterCard } from '@/components/characters/optimized-character-card';

// Automatically memoized with deep comparison
<CharacterCard
  character={character}
  onClick={handleClick}
  onAddToCollection={addToCollection}
  inCollection={inCollection}
/>
```

## Error Handling

### Error Boundary

```typescript
import { createErrorBoundary } from '@/components/ui/error-boundary';

const ErrorBoundary = createErrorBoundary((error, errorInfo) => {
  console.error('Caught error:', error, errorInfo);
});

<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Error Handler Utilities

```typescript
import { ErrorHandler } from '@/components/ui/error-boundary';

// Wrap async functions
const safeApiCall = ErrorHandler.wrapAsync(async (id: string) => {
  return fetchUser(id);
}, 'fetch-user');

// Handle specific error types
try {
  await apiCall();
} catch (error) {
  if (error instanceof NetworkError) {
    await ErrorHandler.handleNetworkError(error, 'api-call');
  }
}
```

## Usage Examples

### Complete Character List Page

```typescript
'use client';

import React, { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/ui/data-table';
import { LoadingState } from '@/components/ui/loading-state';
import { PageLayout, Section } from '@/components/ui/layout';
import { ApiHandler } from '@/lib/api-handler';
import { characterRepository } from '@/lib/repository';

const columns: Column<Character>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    searchable: true,
    render: (value, character) => (
      <div className="flex items-center gap-2">
        <img src={character.imageUrl} alt={value} className="w-8 h-8 rounded" />
        <span>{value}</span>
      </div>
    )
  },
  {
    key: 'rarity',
    label: 'Rarity',
    sortable: true,
    render: (value) => <Badge>{value}</Badge>
  },
  {
    key: 'attribute',
    label: 'Attribute',
    sortable: true
  },
  {
    key: 'game',
    label: 'Game',
    sortable: true
  }
];

export default function CharacterListPage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const result = await characterRepository.findWithFilters({}, {
        page: 1,
        limit: 20,
        sortBy: 'name'
      });
      
      setCharacters(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error('Failed to load characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (character: Character) => {
    window.location.href = `/characters/${character.slug}`;
  };

  if (loading) {
    return (
      <PageLayout>
        <LoadingState type="skeleton" text="Loading characters..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Section
        title="Characters"
        subtitle="Browse all characters in the database"
        action={<Button>Add Character</Button>}
      >
        <DataTable
          data={characters}
          columns={columns}
          pagination={true}
          onRowClick={handleRowClick}
          emptyMessage="No characters found"
        />
      </Section>
    </PageLayout>
  );
}
```

### API Route Example

```typescript
import { NextRequest } from 'next/server';
import { ApiHandler } from '@/lib/api-handler';
import { characterRepository } from '@/lib/repository';
import { ErrorHandler } from '@/components/ui/error-boundary';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');

    let result;
    if (search) {
      result = await characterRepository.search(search, { page, limit });
    } else {
      result = await characterRepository.getBasicInfo({ page, limit });
    }

    return ApiHandler.success(
      result.data,
      'Characters retrieved successfully',
      result.pagination
    );
  } catch (error) {
    return ErrorHandler.handleGenericError(error, 'characters-get');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.name || !body.imageUrl) {
      return ApiHandler.badRequest('Name and image URL are required');
    }

    const character = await characterRepository.create(body);
    
    return ApiHandler.created(
      character,
      'Character created successfully'
    );
  } catch (error) {
    return ErrorHandler.handleGenericError(error, 'character-create');
  }
}
```

## Best Practices

1. **Always use repositories** for data access instead of direct Prisma calls
2. **Follow the API response format** for all endpoints
3. **Use memoized components** for expensive renders
4. **Implement loading states** for better UX
5. **Use error boundaries** to catch React errors
6. **Optimize images** with lazy loading
7. **Use TypeScript interfaces** for all component props
8. **Follow consistent naming** conventions
9. **Implement proper error handling** in all async functions
10. **Use the performance utilities** to monitor critical operations

## Migration Guide

To migrate existing components:

1. **Replace direct Prisma calls** with repository methods
2. **Update API routes** to use `ApiHandler`
3. **Replace manual tables** with `DataTable` component
4. **Add loading states** using `LoadingState` components
5. **Wrap components** with `optimizeComponent` where needed
6. **Add error boundaries** around major sections

This optimized architecture provides better maintainability, performance, and developer experience while following modern React and Next.js best practices.