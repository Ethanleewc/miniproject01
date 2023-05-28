import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.EatenRite.app',
  appName: 'EatenRite',
  webDir: 'dist/client',
  bundledWebRuntime: false,
  server: {
    url: 'https://miniproject01-production-3322.up.railway.app'
  }
};

export default config;
