const fs = require('fs');
const path = require('path');

const envFile = `export const environment = {
  production: true,
  supabase: {
    url: '${process.env.SUPABASE_URL || ''}',
    anonKey: '${process.env.SUPABASE_ANON_KEY || ''}',
  },
};
`;

const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

fs.writeFileSync(targetPath, envFile);

console.log(`✅ Environment file generated at ${targetPath}`);
