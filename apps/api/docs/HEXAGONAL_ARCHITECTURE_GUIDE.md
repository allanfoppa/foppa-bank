# Ports and Adapters (Hexagonal Architecture) - Best Practices Implementation

This project demonstrates a comprehensive implementation of the Ports and Adapters pattern (also known as Hexagonal Architecture) with best practices applied.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        External World                           │
├─────────────────────────────────────────────────────────────────┤
│     Adapters In (Driving)      │     Adapters Out (Driven)      │
│  ┌─────────────────────────┐   │   ┌─────────────────────────┐  │
│  │   Web Controller        │   │   │   Repository (DB)       │  │
│  │   CLI Interface         │   │   │   Email Service         │  │
│  │   Message Queue         │   │   │   File System           │  │
│  └─────────────────────────┘   │   └─────────────────────────┘  │
├────────────────────────────────┼────────────────────────────────┤
│           Ports In             │           Ports Out            │
│  ┌─────────────────────────┐   │   ┌─────────────────────────┐  │
│  │    Use Case Interfaces  │   │   │   Repository Interface  │  │
│  │  - CreateAccountUseCase │   │   │  - AccountRepository    │  │
│  │  - DepositUseCase       │   │   │  - NotificationService  │  │
│  │  - WithdrawUseCase      │   │   │                         │  │
│  └─────────────────────────┘   │   └─────────────────────────┘  │
├─────────────────────────────────────────────────────────────────┤
│                           Core Domain                           │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                Application Services                       │  │
│  │  - AccountService (implements use cases)                  │  │
│  │                                                           │  │
│  │                Domain Layer                               │  │
│  │  - AccountDomainEntity                                    │  │
│  │  - TransactionDomainVO                                    │  │
│  │  - AccountDomainException                                 │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 1. **Domain Layer Enhancements**
- **Immutable Value Objects**: `TransactionDomainVO` with proper validation
- **Rich Domain Entities**: `AccountDomainEntity` with business logic and invariants
- **Domain Exceptions**: Custom exceptions that carry business meaning
- **Encapsulation**: Private fields with controlled access through methods

### 2. **Application Layer (Use Cases)**
- **Clear Interfaces**: Separate use case interfaces for each business operation
- **Command/Query Separation**: Different models for commands and queries
- **Error Handling**: Proper domain exception propagation
- **Single Responsibility**: Each use case focuses on one business operation

### 3. **Port Definitions**
- **Input Ports**: Use case interfaces that define what the application can do
- **Output Ports**: Repository and service interfaces for external dependencies
- **Type Safety**: Strong typing with TypeScript interfaces
- **Dependency Inversion**: High-level modules don't depend on low-level modules

### 4. **Adapter Implementations**
- **Input Adapters**: Web controllers that convert HTTP requests to use case calls
- **Output Adapters**: Repository and service implementations
- **DTOs**: Data Transfer Objects for external communication
- **Error Translation**: Converting domain exceptions to appropriate HTTP responses

### 5. **Configuration and Wiring**
- **Dependency Injection**: Proper wiring of dependencies
- **Factory Methods**: Easy swapping of implementations
- **Testability**: Clean separation allows easy mocking and testing

## Project Structure

```
src/
├── domain/                           # Core business logic
│   └── account/
│       ├── account.domain-entity.ts  # Rich domain entity
│       ├── account.domain-exception.ts # Domain-specific exceptions
│       └── transaction.domain-vo.ts   # Value object with validation
├── application/                      # Use cases and business orchestration
│   └── account/
│       └── ports/
│           ├── in/                   # Input ports (use cases)
│           │   ├── create-account.use-case.ts
│           │   ├── deposit.use-case.ts
│           │   ├── withdraw.use-case.ts
│           │   ├── get-account.use-case.ts
│           │   └── account.service.ts # Service implementing use cases
│           └── out/                  # Output ports (interfaces)
│               ├── account.repository.ts
│               └── notification.service.ts
└── adapters/                         # External interface implementations
    ├── in/                          # Input adapters (driving)
    │   └── web/
    │       └── account/
    │           ├── dto/             # Data transfer objects
    │           ├── account.controller.ts
    │           └── account.module.ts
    └── out/                         # Output adapters (driven)
        ├── persistence/
        │   └── account/
        │       └── account.repository.ts # In-memory implementation
        └── notification/
            └── email-notification.service.ts
```

## Best Practices Applied

### 1. **Dependency Flow**
- Dependencies point inward toward the domain
- External layers depend on inner layers, never the reverse
- Use interfaces to invert dependencies

### 2. **Domain Integrity**
- Business rules are enforced in domain entities
- Invariants are maintained through encapsulation
- Domain exceptions carry business meaning

### 3. **Separation of Concerns**
- Each layer has a single responsibility
- Business logic is isolated from infrastructure concerns
- External communication details are handled by adapters

### 4. **Testability**
- Pure domain logic can be tested without external dependencies
- Use cases can be tested with mocked repositories
- Adapters can be tested independently

### 5. **Flexibility**
- Easy to swap implementations (database, notification service, etc.)
- New input adapters can be added without changing business logic
- Framework-independent core business logic

## Benefits Achieved

1. **Framework Independence**: Core business logic doesn't depend on web frameworks
2. **Database Independence**: Can easily switch between different storage solutions
3. **Testability**: Each component can be tested in isolation
4. **Maintainability**: Clear separation of concerns makes the code easier to maintain
5. **Scalability**: New features can be added without affecting existing code
6. **Flexibility**: Easy to swap implementations and adapt to changing requirements

This implementation serves as a template for building robust, maintainable applications using the Ports and Adapters pattern.