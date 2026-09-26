import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { defineConfig } from '@mikro-orm/postgresql';
import { config } from 'dotenv';
import { dirname, join } from 'node:path';

// apps/api, whether this file runs from source or compiled into dist/. The
// .env file and every relative path below resolve against it, not the cwd.
const baseDir = import.meta.filename.endsWith('.ts')
  ? import.meta.dirname
  : dirname(import.meta.dirname);

config({ path: join(baseDir, '.env'), quiet: true });

export default defineConfig({
  baseDir,
  clientUrl: process.env.DATABASE_URL,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  metadataProvider: ReflectMetadataProvider,
  dynamicImportProvider: (id) => import(id),
  discovery: {
    warnWhenNoEntities: false,
  },
  migrations: {
    path: './dist/migrations',
    pathTs: './migrations',
  },
});
