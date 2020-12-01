import { fileURLToPath } from 'url';
import { dirname as dirnameFromPath } from 'path';

export const dirname = (importMetaUrl) =>
  fileURLToPath(dirnameFromPath(importMetaUrl));
