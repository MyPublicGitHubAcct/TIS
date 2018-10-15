const config = {};

config.dbSa = {
  server: 'localhost',
  database: 'dbtis',
  user: 'sa',
  password: 'Re@11yStr0ngPwd2',
  pool: { max: 100, min: 0, idleTimeoutMillis: 30000 },
  options: { encrypt: true }
};

config.dbTis = {
  server: 'localhost',
  database: 'TISDB',
  user: 'tisApp',
  password: 'pasSw0rd',
  pool: { max: 100, min: 0, idleTimeoutMillis: 30000 },
  options: { encrypt: true }
};

module.exports = config;
