import { AccountReadRepository } from "../../common/interfaces";
import { getDb } from "../client";
import { AccountDocument } from "../collections/account.collection";

export class MongoAccountReadRepository implements AccountReadRepository {
  private collection() {
    return getDb().collection<AccountDocument>("accounts");
  }

  async findById(id: string): Promise<AccountDocument | null> {
    return this.collection().findOne({ _id: id });
  }

  async findByEmail(email: string): Promise<AccountDocument | null> {
    return this.collection().findOne({ email });
  }
}
