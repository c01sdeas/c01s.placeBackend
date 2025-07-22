import 'express-session';

declare module 'express-session' {
  interface SessionData {
    username: string; // username artık session içinde tanımlı!
    userRoles: string[];
  }
}