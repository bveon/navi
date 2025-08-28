import { createReadStream } from 'node:fs';

import { parse, type Options } from 'csv-parse';

import type { PgTable } from 'drizzle-orm/pg-core';

abstract class Seed<T extends PgTable, V extends T['$inferInsert']> {
  public readonly table: T;

  public constructor(table: T) {
    this.table = table;
  }

  public async *getDataFromCsv(path: string): AsyncGenerator<V[]> {
    const config: Options = {
      columns: Object.keys(this.table).filter((key) => key !== 'enableRLS'),
      from_line: 2,
      trim: true,
    };

    const parser = createReadStream(path).pipe(parse(config));

    let batch: V[] = [];

    for await (const row of parser as AsyncIterable<Record<keyof V, string>>) {
      batch.push(await this.transform(row));

      if (batch.length >= 1000) {
        yield batch;
        batch = [];
      }
    }

    if (batch.length > 0) {
      yield batch;
    }
  }

  protected abstract transform(row: Record<keyof V, string>): Promise<V>;
}

export { Seed };
