const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../../config');

// load input validation
const validateTestInput = require('../../validation/testGetUserId');

// @ route  GET api/test/test
// @ desc   Test 'test' route
// @ access Public
router.get('/test', (req, res) => res.json({ msg: 'test works' }));

// @ route  GET api/user/readUserIdByLogon
// @ desc   Read a user's id by logon
// @ access User admins only (need UserRead=true)
router.get('/readUserIdByLogon', (req, res) => {
  const { errors, isValid } = validateTestInput(req.query.logon);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // console.log('req.headers = ' + JSON.stringify(req.headers));
  // console.log('req.query.logon = ' + req.query.logon);

  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('Logon', sql.VarChar, req.query.logon)
          .output('responseMessage', sql.VarChar)
          .execute('dbtis.tis.sp_ReadUserIdByLogon', (err, result) => {
            dbConn.close();

            // console.log('recordset.length = ' + result.recordsets.length);
            // console.log('recordset        = ' + result.recordset);
            // console.log('value            = ' + result.returnValue);
            // console.log('key/value        = ' + result.output);
            // console.log('output msg       = ' + result.output.responseMessage);
            // console.log('affected         = ' + result.rowsAffected);

            if (err) {
              console.log('readUserIdByLogon err = ' + err);
            }

            if (result.output.responseMessage != 'success') {
              console.log('---t-not-success');
              if (result.output.responseMessage == 'Invalid logon') {
                console.log('---t-not-success-invalid-logon');
                return res.status(404).json({ Logon: 'Invalid logon' });
              } else {
                console.log('---t-not-success-unknown-error');
                return res.status(400).json({ message: 'Unknown error' });
              }
            } else {
              console.log('---t-success');
              return res.json(result.recordset[0]);
            }
          });
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    res.json({ message: 'readUserIdByLogon does not work' });
  }
});

module.exports = router;
