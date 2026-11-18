-- Seed inicial para desarrollo y pruebas locales
-- Usuario de prueba: antonio@lopez.com / password (PBKDF2 SHA-256)
INSERT OR IGNORE INTO users (name, email, password, created_at)
VALUES (
  'Antonio López',
  'antonio@lopez.com',
  '0ef70b2b3dc31f7ccd7bdb4f261935f4:cac38e582091f61f2d86c63b1a90f627b6a60e73720df2e752215b61c4678ec5',
  unixepoch()
);
