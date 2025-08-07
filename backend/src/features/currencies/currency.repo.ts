import { ilike } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import * as schema from "../../core/infra/schema/all.schema";

export class CurrencyRepository {
  private db: NodePgDatabase<typeof schema>;

  constructor(db: NodePgDatabase<typeof schema>) {
    this.db = db;
  }

  public async findByLabel(label: string) {
    return await this.db
      .select()
      .from(schema.currencies)
      .where(label ? ilike(schema.currencies.label, label) : undefined)
      .execute();
  }
}
