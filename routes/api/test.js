const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../../config');

// load input validation
const validateTestInput = require('../../validation/testGetUserId');

// @ route  GET api/test/test
// @ desc   Test 'test' route
// @ access Public
router.get('/test', (req, res) => res.json({ msg: 'test route works' }));

// @ route  GET api/user/readUserIdByLogon
// @ desc   Read a user's id by logon
// @ access User admins only (need UserRead=true)
router.get('/readUserIdByLogon', (req, res) => {
  // const { errors, isValid } = validateTestInput(req.header);
  // if (!isValid) {
  //   return res.status(400).json(errors);
  // }
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('Logon', sql.VarChar, req.headers.Logon)
          .output('responseMessage', sql.VarChar)
          .execute('dbtis.tis.sp_ReadUserIdByLogon', (err, result) => {
            dbConn.close();

            console.log('count      = ' + result.recordsets.length);
            console.log('first      = ' + result.recordset);
            console.log('value      = ' + result.returnValue);
            console.log('key/value  = ' + result.output);
            console.log('output msg = ' + result.output.responseMessage);
            console.log('affected   = ' + result.rowsAffected);

            if (err) {
              console.log('sp_ReadUserIdByLogon err = ' + err);
            }

            if (result.output.responseMessage != 'success') {
              if (result.output.responseMessage == 'Invalid login') {
                return res.status(404).json({ Logon: 'User does not exist' });
              } else {
                return res.status(400).json({ message: 'Unknown error' });
              }
            } else {
              if (result.rowsAffected > 0) {
                return res.json(result['recordset']);
              } else {
                return res
                  .status(404)
                  .json({ message: 'readUserById: User not found.' });
              }
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
