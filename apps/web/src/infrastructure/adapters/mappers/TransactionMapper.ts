import { Transaction } from "../../../domain/entities/Transaction";

export class TransactionMapper {
  static toDomain(raw: any): Transaction {
    return {
      id: raw.uuid,
      description: raw.desc.toUpperCase(),
      value: Math.abs(raw.amount),
      type: raw.amount >= 0 ? "INCOME" : "EXPENSE",
      date: new Date(raw.created_at).toLocaleDateString("pt-BR"),
    };
  }
}
