import { getSiteURL } from '@/lib/get-site-url';
import { LogLevel } from '@/lib/logger';

export interface Config {
  site: { name: string; description: string; themeColor: string; url: string };
  logLevel: keyof typeof LogLevel;
}

export const config: Config = {
  site: {
    name: 'Johan Mejia Admin Dashboard',
    description: 'Full Stack Professional Dashboard',
    themeColor: '#0d1117', // (elige el color que quieras, este es oscuro tipo GitHub)
    url: getSiteURL()
  },
  logLevel: (process.env.NEXT_PUBLIC_LOG_LEVEL as keyof typeof LogLevel) ?? LogLevel.ALL,
};
