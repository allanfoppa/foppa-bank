import React, { createContext, useContext } from 'react';
import { InMemoryAccountRepository } from '../../infrastructure/adapters/repositories/InMemoryAccountRepository';
import { InMemoryTransactionRepository } from '../../infrastructure/adapters/repositories/InMemoryTransactionRepository';
import { InMemoryScheduledTransferRepository } from '../../infrastructure/adapters/repositories/InMemoryScheduledTransferRepository';
import { InMemoryAuthService } from '../../infrastructure/adapters/services/InMemoryAuthService';
import { ApiExchangeRateService } from '../../infrastructure/adapters/services/ApiExchangeRateService';
import { ReactToastNotificationService } from '../adapters/ReactToastNotificationService';

// Import use case classes
import { LoginUser } from '../../application/use-cases/auth/LoginUser';
import { LogoutUser } from '../../application/use-cases/auth/LogoutUser';
import { DepositMoney } from '../../application/use-cases/bank/DepositMoney';
import { WithdrawWithLimit } from '../../application/use-cases/bank/WithdrawWithLimit';
import { ConvertBalance } from '../../application/use-cases/exchange/ConvertBalance';
import { ScheduleTransfer } from '../../application/use-cases/schedule/ScheduleTransfer';

// Import use case interfaces
import { ILoginUseCase } from '../../application/ports/in/ILoginUseCase';
import { ILogoutUseCase } from '../../application/ports/in/ILogoutUseCase';
import { IDepositMoneyUseCase } from '../../application/ports/in/IDepositMoneyUseCase';
import { IWithdrawMoneyUseCase } from '../../application/ports/in/IWithdrawMoneyUseCase';
import { IConvertBalanceUseCase } from '../../application/ports/in/IConvertBalanceUseCase';
import { IScheduleTransferUseCase } from '../../application/ports/in/IScheduleTransferUseCase';

// Initialize infrastructure layer
const accountRepo = new InMemoryAccountRepository();
const transactionRepo = new InMemoryTransactionRepository();
const scheduledRepo = new InMemoryScheduledTransferRepository();
const authService = new InMemoryAuthService();
const exchangeService = new ApiExchangeRateService();
const notificationService = new ReactToastNotificationService();

// Initialize use cases with dependencies
const dependencies = {
  // Repositories (Secondary Ports)
  accountRepo,
  transactionRepo,
  scheduledRepo,
  authService,
  exchangeService,
  notificationService,
  
  // Use Cases (Primary Ports)
  loginUseCase: new LoginUser(authService, notificationService) as ILoginUseCase,
  logoutUseCase: new LogoutUser(authService) as ILogoutUseCase,
  depositMoneyUseCase: new DepositMoney(accountRepo, transactionRepo, notificationService) as IDepositMoneyUseCase,
  withdrawMoneyUseCase: new WithdrawWithLimit(accountRepo, transactionRepo, notificationService) as IWithdrawMoneyUseCase,
  convertBalanceUseCase: new ConvertBalance(exchangeService) as IConvertBalanceUseCase,
  scheduleTransferUseCase: new ScheduleTransfer(scheduledRepo, notificationService) as IScheduleTransferUseCase,
};

const DependencyContext = createContext(dependencies);

export const DependencyProvider = ({ children }: { children: React.ReactNode }) => (
  <DependencyContext.Provider value={dependencies}>{children}</DependencyContext.Provider>
);

export const useDependencies = () => useContext(DependencyContext);
