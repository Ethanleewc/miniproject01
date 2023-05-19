import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ethan.eatrite',
  appName: 'eatrite',
  webDir: 'dist/client',
  bundledWebRuntime: false,
  server: {
    url: 'https://miniproject01-production.up.railway.app'
  }
};

export default config;
