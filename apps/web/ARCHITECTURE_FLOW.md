# Application Flow & Feature Development Guide

## 🚀 Application Entry Point

### 1. Initial Load Sequence

```
main.tsx → App.tsx → Providers → Routes → Pages
```

**File: [src/main.tsx](src/main.tsx)**

- React application bootstrap
- Renders the root `<App />` component

**File: [src/App.tsx](src/App.tsx)**

- Wraps application with `<BrowserRouter>` (routing context)
- Sets up dependency injection via `<DependencyProvider>`
- Sets up authentication via `<AuthProvider>`
- Renders `<AppRoutes />` component
- Includes `<Toaster />` for notifications

---

## 📐 Hexagonal Architecture Layers

### Layer 1: **Domain Layer** (Core Business Logic)

**Location:** `src/domain/`

- **Entities** (`entities/`): Pure business objects (User, Account, Transaction, ScheduledTransfer)
- **Ports (Secondary/OUT)** (`ports/out/`): Interfaces for external dependencies
  - IAccountRepository
  - ITransactionRepository
  - IAuthService
  - IExchangeRateService
  - INotificationService

**Responsibility:** Contains business rules, completely independent of frameworks

---

### Layer 2: **Application Layer** (Use Cases)

**Location:** `src/application/`

- **Ports (Primary/IN)** (`ports/in/`): Interfaces that define use case contracts
  - ILoginUseCase
  - ILogoutUseCase
  - IDepositMoneyUseCase
  - IWithdrawMoneyUseCase
  - IConvertBalanceUseCase
  - IScheduleTransferUseCase

- **Use Cases** (`use-cases/`): Classes implementing primary ports
  - `auth/`: LoginUser, LogoutUser
  - `bank/`: DepositMoney, WithdrawWithLimit
  - `exchange/`: ConvertBalance
  - `schedule/`: ScheduleTransfer

**Responsibility:** Orchestrates domain entities and coordinates business workflows through dependency injection

---

### Layer 3: **Infrastructure Layer** (External Adapters)

**Location:** `src/infrastructure/`

- **Repositories** (`adapters/repositories/`): Data persistence implementations
  - InMemoryAccountRepository
  - InMemoryTransactionRepository
  - InMemoryScheduledTransferRepository

- **Services** (`adapters/services/`): External service implementations
  - InMemoryAuthService
  - ApiExchangeRateService
  - ConsoleNotificationService (framework-agnostic)

**Responsibility:** Implements ports defined in domain layer

---

### Layer 4: **UI Layer** (React Framework)

**Location:** `src/ui/`

- **Components** (`components/`): React UI components
- **Pages** (`pages/`): Route-level components (LoginPage, DashboardPage)
- **Contexts** (`contexts/`): React state management
- **Hooks** (`hooks/`): Custom React hooks for UI logic
- **Router** (`router/`): Application routing
- **Adapters** (`adapters/`): UI-specific implementations (ReactToastNotificationService)

**Responsibility:** Presents data to users and captures user input

---

## 🔄 Complete Request Flow

### Example: User Makes a Deposit

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. USER INTERACTION (UI Layer)                                  │
│    File: src/ui/pages/DashboardPage.tsx                         │
│    User clicks "Deposit" button                                 │
|     depositMoneyUseCase (IDepositMoneyUseCase)         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. PRIMARY PORT (Application Layer)                             │
│    File: src/application/ports/in/IDepositMoneyUseCase.ts  │
│    Interface: execute(accountId, amount)                        │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. USE CASE IMPLEMENTATION (Application Layer)                  │
│    File: src/application/use-cases/bank/DepositMoney.ts    │
│    Class: DepositMoney implements IDepositMoneyUseCase          │
│    - Validates business rules                                   │
│    - Calls repository through secondary port                    │
│    - Orchestrates domain logic          ────────────────────────┐
│ 3. DEPENDENCY INJECTION (UI Context)                            │
│    File: src/ui/contexts/DependenciesContext.tsx                │
│    Provides: accountRepo, notificationService                   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. USE CASE EXECUTION (Application Layer)                       │
│    File: src/application/use-cases/bank/DepositMoney.ts    │
│    - Validates business rules                                   │
│ 6. SECONDARY PORT (Domain Layer)                                │
│    File: src/domain/ports/IAccountRepository.ts            │
│    Interface: getAccount(), updateBalance()                     │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. REPOSITORY IMPLEMENTATION (Infrastructure Layer)             │
│    File: src/infrastructure/adapters/repositories/              │
│          InMemoryAccountRepository.ts                           │
│    - getAccount(): Retrieves account data                       │
│    - updateBalance(): Persists new balance                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. DOMAIN ENTITY (Domain Layer)                                 │
│    File: src/domain/entities/Account.ts                    │
│    Account interface with balance property                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. NOTIFICATION (UI Adapter)                                    │
│    File: src/domain/entities/Account.ts                    │
│    Account interface/class with balance property                │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. NOTIFICATION SERVICE (UI Adapter)                            │
│    File: src/ui/adapters/ReactToastNotificationService.ts       │
│    Shows success toast to user                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ➕ How to Add a New Feature

### Step-by-Step Guide: Adding "Transfer Money" Feature

#### **Step 1: Define Domain Entity (if needed)**

**Location:** `src/domain/entities/`

```typescript
// Transfer.ts
export interface Transfer {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  date: string;
}
```

---

#### **Step 2: Create Secondary Port (Repository Interface)**

**Location:** `src/domain/ports/out/`

```typescript
// ITransferRepository.ts
import { Transfer } from "../../entities/Transfer";

export interface ITransferRepository {
  save(transfer: Transfer): Promise<void>;
  findByAccountId(accountId: string): Promise<Transfer[]>;
}
```

---

#### **Step 3: Create Primary Port (Use Case Interface)**

**Location:** `src/application/ports/in/`

```typescript
// ITransferMoneyUseCase.ts
export interface ITransferMoneyUseCase {
  execute(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
  ): Promise<void>;
}
```

---

#### **Step 4: Implement Infrastructure Adapter**

**Location:** `src/infrastructure/adapters/repositories/`

```typescript
// InMemoryTransferRepository.ts
import { Transfer } from "../../../domain/entities/Transfer";
import { ITransferRepository } from "../../../domain/ports/ITransferRepository";

export class InMemoryTransferRepository implements ITransferRepository {
  private transfers: Transfer[] = [];

  async save(transfer: Transfer): Promise<void> {
    this.transfers.push(transfer);
  }

  async findByAccountId(accountId: string): Promise<Transfer[]> {
    return this.transfers.filter(
      (t) => t.fromAccountId === accountId || t.toAccountId === accountId,
    );
  }
}
```

---

#### **Step 5: Implement Use Case Class**

**Location:** `src/application/use-cases/bank/`

```typescript
// TransferMoney.ts
import { IAccountRepository } from "../../../domain/ports/out/IAccountRepository";
import { ITransferRepository } from "../../../domain/ports/out/ITransferRepository";
import { INotificationService } from "../../../domain/ports/out/INotificationService";
import { ITransferMoneyUseCase } from "../../ports/in/ITransferMoneyUseCase";
import { Transfer } from "../../../domain/entities/Transfer";

export class TransferMoney implements ITransferMoneyUseCase {
  constructor(
    private accountRepo: IAccountRepository,
    private transferRepo: ITransferRepository,
    private notification: INotificationService,
  ) {}

  async execute(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
  ): Promise<void> {
    // 1. Validate input
    if (amount <= 0) {
      throw new Error("Amount must be greater than zero");
    }

    // 2. Get accounts
    const fromAccount = await this.accountRepo.getAccount(fromAccountId);
    const toAccount = await this.accountRepo.getAccount(toAccountId);

    // 3. Check balance
    if (fromAccount.balance < amount) {
      this.notification.notify("Insufficient funds", "error");
      throw new Error("Insufficient funds");
    }

    // 4. Update balances
    await this.accountRepo.updateBalance(
      fromAccountId,
      fromAccount.balance - amount,
    );
    await this.accountRepo.updateBalance(
      toAccountId,
      toAccount.balance + amount,
    );

    // 5. Record transfer
    const transfer: Transfer = {
      id: Math.random().toString(36).substr(2, 9),
      fromAccountId,
      toAccountId,
      amount,
      date: new Date().toISOString(),
    };
    await this.transferRepo.save(transfer);

    // 6. Notify success
    this.notification.notify(`Transfer of R$ ${amount} completed!`, "success");
  }
}
```

---

#### **Step 6: Register Dependencies & Instantiate Use Case**

**Location:** `src/ui/contexts/DependenciesContext.tsx`

```typescript
import { InMemoryTransferRepository } from "../../infrastructure/adapters/repositories/InMemoryTransferRepository";
import { TransferMoney } from "../../application/use-cases/bank/TransferMoney";
import { ITransferMoneyUseCase } from "../../application/ports/in/ITransferMoneyUseCase";

// Initialize repositories
const transferRepo = new InMemoryTransferRepository();

const dependencies = {
  // Repositories
  accountRepo: new InMemoryAccountRepository(),
  transactionRepo: new InMemoryTransactionRepository(),
  transferRepo,

  // Use Cases (Primary Ports)
  transferMoneyUseCase: new TransferMoney(
    accountRepo,
    transferRepo,
    notificationService,
  ) as ITransferMoneyUseCase,
  // ... other use cases
};
```

---

#### **Step 7: Create UI Hook**

**Location:** `src/ui/hooks/useTransfer.ts`

```typescript
import { useState } from "react";
import { useDependencies } from "../contexts/DependenciesContext";

export function useTransfer() {
  const [loading, setLoading] = useState(false);
  const { transferMoneyUseCase } = useDependencies();

  const handleTransfer = async (
    fromAccountId: string,
    toAccountId: string,
    amount: number,
  ) => {
    setLoading(true);
    try {
      await transferMoneyUseCase.execute(fromAccountId, toAccountId, amount);
    } catch (error) {
      console.error("Transfer failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleTransfer, loading };
}
```

---

#### **Step 8: Create UI Component**

**Location:** `src/ui/components/TransferForm.tsx`

```typescript
import { useState } from 'react';
import { useTransfer } from '../hooks/useTransfer';

export function TransferForm() {
  const [toAccountId, setToAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const { handleTransfer, loading } = useTransfer();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTransfer('123', toAccountId, parseFloat(amount));
    setToAccountId('');
    setAmount('');
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="To Account ID"
        value={toAccountId}
        onChange={(e) => setToAccountId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Transfer'}
      </button>
    </form>
  );
}
```

---

#### **Step 9: Add Component to Page**

**Location:** `src/ui/pages/DashboardPage.tsx`

```typescript
import { TransferForm } from '../components/TransferForm';

export function DashboardPage() {
  return (
    <div>
      {/* ... other components */}
      <TransferForm />
    </div>
  );
}
```

---

## 🎯 Key Principles

### 1. **Dependency Rule**

Dependencies flow inward: UI → Application → Domain

```
UI Layer (React)
    ↓ depends on
Application Layer (Use Cases via Primary Ports)
    ↓ depends on
Domain Layer (Entities & Secondary Ports)
    ↑ implemented by
Infrastructure Layer (Adapters)
```

### 2. **Ports and Adapters (Hexagonal Architecture)**

#### **Primary Ports (Ports IN) - Driving Side**

- **Location:** `application/ports/in/`
- **Purpose:** Define what the application DOES (use cases)
- **Direction:** UI/External → Application
- **Examples:** ILoginUseCase, IDepositMoneyUseCase
- **Implemented by:** Use case classes in `application/use-cases/`

#### **Secondary Ports (Ports OUT) - Driven Side**

- **Location:** `domain/ports/out/`
- **Purpose:** Define what the application NEEDS (dependencies)
- **Direction:** Application → Infrastructure/External
- **Examples:** IAccountRepository, INotificationService
- **Implemented by:** Adapters in `infrastructure/adapters/`

### 3. **Use Case Pattern**

Each use case should:

- Implement a primary port interface (e.g., `IDepositMoneyUseCase`)
- Receive dependencies via constructor injection
- Perform ONE specific business operation
- Orchestrate domain entities and secondary ports
- Handle errors appropriately

**Example:**

```typescript
export class DepositMoney implements IDepositMoneyUseCase {
  constructor(
    private repository: IAccountRepository,
    private notification: INotificationService,
  ) {}

  async execute(accountId: string, amount: number): Promise<void> {
    // Business logic here
  }
}
```

### 4. **Separation of Concerns**

- **Domain**: Business rules and secondary ports (no framework dependencies)
- **Application**: Use case orchestration and primary ports (no UI logic)
- **Infrastructure**: External integrations implementing secondary ports
- **UI**: Presentation and user interaction using primary ports (React-specific)

---

## 📋 Checklist for New Features

- [ ] Create domain entity (if needed) in `domain/entities/`
- [ ] Define secondary port interface in `domain/ports/out/` (repository/service)
- [ ] Define primary port interface in `application/ports/in/` (use case interface)
- [ ] Implement adapter in `infrastructure/adapters/` (secondary port implementation)
- [ ] Create use case class in `application/use-cases/` (primary port implementation)
- [ ] Register dependencies and instantiate use case in `DependenciesContext`
- [ ] Create UI hook that uses the injected use case
- [ ] Build UI component using the hook
- [ ] Add component to appropriate page
- [ ] Test the complete flow
- [ ] Update this documentation if needed

---

## 🧪 Testing Strategy

### Unit Tests

- **Domain Entities**: Test business logic in isolation
- **Use Cases**: Mock secondary ports (repositories/services) and test orchestration
- **Components**: Test UI behavior with mocked hooks

### Integration Tests

- Test complete flows from UI through use cases to infrastructure
- Use real implementations or test doubles

---

## 📚 Additional Resources

- **Current Routes**: See [src/ui/router/routes.tsx](src/ui/router/routes.tsx)
- **Authentication Flow**: See [src/ui/contexts/AuthContext.tsx](src/ui/contexts/AuthContext.tsx)
- **Dependency Setup**: See [src/ui/contexts/DependenciesContext.tsx](src/ui/contexts/DependenciesContext.tsx)
- **Primary Ports**: See [src/application/ports/in/](src/application/ports/in/)
- **Secondary Ports**: See [src/domain/ports/out/](src/domain/ports/out/)

---

## 🔍 Common Patterns

### Pattern 1: Reading Data (Query)

```typescript
// Primary Port (Use Case Interface)
export interface IGetAccountUseCase {
  execute(accountId: string): Promise<Account>;
}

// Use Case Implementation
export class GetAccount implements IGetAccountUseCase {
  constructor(private repository: IAccountRepository) {}

  async execute(accountId: string): Promise<Account> {
    return await this.repository.getAccount(accountId);
  }
}

// Hook
const { accountUseCase } = useDependencies();
const account = await accountUseCase.execute(accountId);
```

### Pattern 2: Writing Data (Command)

```typescript
// Primary Port (Use Case Interface)
export interface IPerformActionUseCase {
  execute(data: Data): Promise<void>;
}

// Use Case Implementation
export class PerformAction implements IPerformActionUseCase {
  constructor(
    private repository: IRepository,
    private notification: INotificationService,
  ) {}

  async execute(data: Data): Promise<void> {
    // Validate, process, persist, notify
  }
}

// Hook
const { performActionUseCase } = useDependencies();
await performActionUseCase.execute(data);
```

### Pattern 3: External API Integration

```typescript
// Secondary Port (Domain Layer)
export interface IExternalService {
  fetchData(): Promise<Data>;
}

// Infrastructure Adapter (Infrastructure Layer)
export class ApiExternalService implements IExternalService {
  async fetchData(): Promise<Data> {
    const response = await fetch("https://api.example.com/data");
    return response.json();
  }
}

// Primary Port (Application Layer)
export interface IFetchDataUseCase {
  execute(): Promise<Data>;
}

// Use Case Implementation (Application Layer)
export class FetchData implements IFetchDataUseCase {
  constructor(private externalService: IExternalService) {}

  async execute(): Promise<Data> {
    return await this.externalService.fetchData();
  }
}
```

---

## 📊 Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                       UI LAYER                          │
│  (React Components, Hooks, Contexts)                    │
│                                                         │
│  Uses: Primary Ports (IUseCase interfaces)              │
└────────────────────┬────────────────────────────────────┘
                     │ Calls through interface
                     ▼
┌─────────────────────────────────────────────────────────┐
│              APPLICATION LAYER                          │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  PRIMARY PORTS (Ports IN)                  │        │
│  │  Define: What the app DOES                 │        │
│  │  Location: application/ports/in/      │        │
│  └────────────────────────────────────────────┘        │
│                     ▲                                   │
│                     │ Implemented by                    │
│  ┌────────────────────────────────────────────┐        │
│  │  USE CASES                                 │        │
│  │  Orchestrate: Domain entities              │        │
│  │  Call: Secondary ports                     │        │
│  │  Location: application/use-cases/     │        │
│  └────────────────────────────────────────────┘        │
└────────────────────┬────────────────────────────────────┘
                     │ Uses interface
                     ▼
┌─────────────────────────────────────────────────────────┐
│                  DOMAIN LAYER                           │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  ENTITIES                                  │        │
│  │  Pure: Business objects                    │        │
│  │  Location: domain/entities/           │        │
│  └────────────────────────────────────────────┘        │
│                                                         │
│  ┌────────────────────────────────────────────┐        │
│  │  SECONDARY PORTS (Ports OUT)               │        │
│  │  Define: What the app NEEDS                │        │
│  │  Location: domain/ports/out/          │        │
│  └────────────────────────────────────────────┘        │
└────────────────────┬────────────────────────────────────┘
                     ▲ Implements interface
                     │
┌────────────────────┴────────────────────────────────────┐
│             INFRASTRUCTURE LAYER                        │
│                                                         │
│  Adapters implementing secondary ports:                 │
│  - InMemoryAccountRepository                            │
│  - InMemoryAuthService                                  │
│  - ApiExchangeRateService                               │
│  Location: infrastructure/adapters/                     │
└─────────────────────────────────────────────────────────┘
```

---

**Last Updated:** January 30, 2026
