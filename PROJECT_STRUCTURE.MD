src/
    ├── domain/
    │    └── account/
    │         ├── account.domain-entity.ts
    │         ├── transaction.domain-vo.ts
    │         └── account.domain-exception.ts
    │
    ├── application/
    │    └── account/
    │         ├── ports-in/
    │         │    └── account.ports-in-service.ts
    │         └── ports-out/
    │              ├── account.ports-out-repository.ts
    │              └── notification.ports-out-service.ts
    │
    ├── adapters/
    │    ├── in/
    │    │    └── web/
    │    │         ├── account.adapters-in-controller.ts
    │    │         └── account.adapters-in-module.ts
    │    │
    │    └── out/
    │         ├── persistence/
    │         │    └── account.adapters-out-inmemory-repository.ts
    │         └── notification/
    │              └── email-notification.adapters-out-service.ts
    │
    ├── main.ts
