# prisma migrate status

Checks the status of your database migrations.

## Command

```bash
prisma migrate status [options]
```

## What It Does

- Connects to the database
- Checks the `_prisma_migrations` table
- Compares applied migrations with local migration files
- Reports:
    - **Status**: Database is up-to-date or behind
    - **Unapplied migrations**: Count of pending migrations
    - **Missing migrations**: Migrations present in DB but missing locally
    - **Failed migrations**: Any migrations that failed to apply

## Options

| Option | Description |
|--------|-------------|
| `--schema` | Path to schema file |
| `--config` | Custom path to your Prisma config file |

## Examples

### Check status

```bash
prisma migrate status
```

Output example (Up to date):
```
Database schema is up to date!
```

Output example (Pending):
```
Following migration have not yet been applied:
  20240115120000_add_user

To apply migrations in development, run:
  prisma migrate dev

To apply migrations in production, run:
  prisma migrate deploy
```

## When to Use

- **Debugging**: Why is `migrate dev` complaining about drift?
- **CI/CD**: Verify database state before deploying
- **Production**: Check if migrations are needed (`migrate deploy`) or if a deployment failed

## Exit Codes

- `0`: Success (database is up to date, no pending migrations)
- `1`: Error (database connection errors, unapplied migrations, divergent migration history, a missing `_prisma_migrations` table, or failed migrations)

To check for pending migrations programmatically in earlier versions, you might need to parse the output, but in Prisma CLI 7.10.0, exit code 1 natively indicates database connection errors, pending, divergent, or failed states. The command output distinguishes connection errors from unapplied, divergent, missing-table, or failed migration states.
