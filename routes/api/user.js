const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// load input validation
const validateCreateUserInput = require('../../validation/createUser');
const validateLoginInput = require('../../validation/login');
const validateTestInput = require('../../validation/testGetUserId');

// @ route  GET api/user/test
// @ desc   Test 'user' route
// @ access Public
router.get('/test', (req, res) => res.json({ msg: 'user works' }));

// @ route  PUT api/user/createUser
// @ desc   Create a user
// @ access User admins only (need UserCreate=true)
router.post('/createUser', (req, res) => {
  // validation
  const { errors, isValid } = validateCreateUserInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('FirstName', sql.VarChar, req.body.FirstName)
          .input('LastName', sql.VarChar, req.body.LastName)
          .input('Manager', sql.Int, req.body.Manager)
          .input('Logon', sql.VarChar, req.body.Logon)
          .input('Password', sql.VarChar, req.body.Password)
          .input('Department', sql.Int, req.body.Department)
          .input('isManager', sql.Int, req.body.isManager)
          .input('isActive', sql.Int, req.body.isActive)
          .output('responseMessage', sql.VarChar)
          .execute('dbtis.tis.sp_CreateUser', (err, result) => {
            dbConn.close();

            if (err) {
              console.log('createUser err = ' + err);
            }

            if (result.output.responseMessage == 'failed') {
              return res.json({ message: 'User already exists' });
            } else {
              return res.json({
                message: result.output.responseMessage
              });
            }
          });
      })
      .catch(() => {});
  } catch (err) {
    console.log('/createUser try error caught.');
  }
});

// @ route  POST api/user/createUsersRole
// @ desc   Add a role for a user
// @ access User admins only (need UserRead=true)
router.post('/createUsersRole', (req, res) => {
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('UserId', sql.Int, req.body.UserId)
          .input('RoleId', sql.Int, req.body.RoleId)
          .input('UserHas', sql.Int, req.body.UserHas)
          .output('responseMessage', sql.VarChar)
          .execute('dbtis.tis.sp_CreateUserRole', (err, result) => {
            dbConn.close();

            if (err) {
              console.log('createUsersRole err = ' + err);
            }

            if (result.output.responseMessage == 'failed') {
              return res.json({ message: 'UserRole already exists' });
            } else {
              return res.json({
                message: 'successfully added ' + req.body.FirstName
              });
            }
          });
      })
      .catch(() => {});
  } catch (err) {
    console.log('/createUser try error caught.');
  }
});

// @ route  GET api/user/readUserById
// @ desc   Read a user by id
// @ access User admins only (need UserRead=true)
router.get('/readUserById', (req, res) => {
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('userID', sql.Int, req.headers.userid)
          .execute(
            'dbtis.tis.sp_ReadUserById',
            (err, recordsets, returnValue) => {
              dbConn.close();
              if (err) {
                console.log('readUserById err = ' + err);
              }
              if (returnValue) {
                console.log('readUserById returnValue = ' + returnValue);
              }

              if (recordsets.rowsAffected > 0) {
                return res.json(recordsets['recordset']);
              } else {
                return res
                  .status(404)
                  .json({ message: 'readUserById: User not found.' });
              }
            }
          );
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log('/readUser connection failed.');
  }
});

// @ route  GET api/user/readUserIdByLogon
// @ desc   Read a user's id by logon
// @ access User admins only (need UserRead=true)
router.get('/readUserIdByLogon', (req, res) => {
  const { errors, isValid } = validateTestInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('Logon', sql.VarChar, req.headers.logon)
          .execute(
            'dbtis.tis.sp_ReadUserIdByLogon',
            (err, recordsets, returnValue) => {
              dbConn.close();
              if (err) {
                console.log('readUserIdByLogon err = ' + err);
              }
              if (returnValue) {
                console.log('readUserIdByLogon returnValue = ' + returnValue);
              }

              if (recordsets.rowsAffected > 0) {
                return res.json(recordsets['recordset']);
              } else {
                return res.status(404).json({
                  message: 'readUserIdByLogon: User not found...'
                });
              }
            }
          );
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    res.json({ msg: 'readUserIdByLogon does not work' });
  }
});

// @ route  GET api/user/readUserIdByLogon
// @ desc   Read a user's id by logon
// @ access User admins only (need UserRead=true)
router.get('/readUserIdByLogon', (req, res) => {
  const { errors, isValid } = validateTestInput(req.query.logon);
  if (!isValid) {
    return res.status(400).json(errors);
  }

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

            if (err) {
              console.log('readUserIdByLogon err = ' + err);
            }

            if (result.output.responseMessage != 'success') {
              if (result.output.responseMessage == 'Invalid logon') {
                return res.status(404).json({ Logon: 'Invalid logon' });
              } else {
                return res.status(400).json({ message: 'Unknown error' });
              }
            } else {
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

// @ route  GET api/user/readMgrList
// @ desc   Return list of Managers' names
// @ access Private
router.get('/readMgrList', (req, res) => {
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request.execute(
          'dbtis.tis.sp_FillMgrOpts',
          (err, recordsets, returnValue) => {
            dbConn.close();
            if (err) {
              console.log('readMgrList err = ' + err);
            }
            if (returnValue) {
              console.log('readMgrList returnValue = ' + returnValue);
            }

            if (recordsets.rowsAffected > 0) {
              return res.json(recordsets['recordset']);
            } else {
              return res
                .status(404)
                .json({ message: 'readMgrList: List not found.' });
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log('/readMgrList connection failed.');
  }
});

// @ route  GET api/user/readDptList
// @ desc   Return list of Department names
// @ access Private
router.get('/readDptList', (req, res) => {
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request.execute(
          'dbtis.tis.sp_FillDptOpts',
          (err, recordsets, returnValue) => {
            dbConn.close();
            if (err) {
              console.log('readDptList err = ' + err);
            }
            if (returnValue) {
              console.log('readDptList returnValue = ' + returnValue);
            }

            if (recordsets.rowsAffected > 0) {
              return res.json(recordsets['recordset']);
            } else {
              return res
                .status(404)
                .json({ message: 'readDptList: List not found.' });
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log('/readDptList connection failed.');
  }
});

// @ route  GET api/user/readUserRoleList
// @ desc   Return list of user role names
// @ access Private
router.get('/readUserRoleList', (req, res) => {
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request.execute(
          'dbtis.tis.sp_ReadUserRoleList',
          (err, recordsets, returnValue) => {
            dbConn.close();
            if (err) {
              console.log('readUserRoleList err = ' + err);
            }
            if (returnValue) {
              console.log('readUserRoleList returnValue = ' + returnValue);
            }

            if (recordsets.rowsAffected > 0) {
              return res.json(recordsets['recordset']);
            } else {
              return res
                .status(404)
                .json({ message: 'readUserRoleList: List not found.' });
            }
          }
        );
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log('/readDptList connection failed.');
  }
});

// @ route  GET api/user/readRoleListForUserId
// @ desc   Return list of Role names
// @ access Private
router.get('/readRoleListForUserId', (req, res) => {
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('userID', sql.Int, req.headers.userid)
          .execute(
            'dbtis.tis.sp_ReadRoleListForUserId',
            (err, recordsets, returnValue) => {
              dbConn.close();
              if (err) {
                console.log('readRoleListForUserId err = ' + err);
              }
              if (returnValue) {
                console.log(
                  'readRoleListForUserId returnValue = ' + returnValue
                );
              }

              if (recordsets.rowsAffected > 0) {
                return res.json(recordsets['recordset']);
              } else {
                return res.status(404).json({
                  message: 'readRoleListForUserId: Role List not found.'
                });
              }
            }
          );
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log('/readRoleListForUser connection failed.');
  }
});

// @ route  PUT api/user/listUsers
// @ desc   Lists users who report up to the current user
// @ access User admins only (need UserRead=true)
router.get('/listUsers', (req, res) => {
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn
      .connect()
      .then(() => {
        const request = new sql.Request(dbConn);
        request
          .input('managerID', sql.Int, req.headers.managerid)
          .execute(
            'dbtis.tis.sp_ListUsersByManagerId',
            (err, recordsets, returnValue) => {
              dbConn.close();
              if (err) {
                console.log('listUsers err = ' + err);
              }
              if (returnValue) {
                console.log('listUsers returnValue = ' + returnValue);
              }

              if (recordsets.rowsAffected > 0) {
                return res.json(recordsets['recordset']);
              } else {
                return res
                  .status(404)
                  .json({ message: 'listUsers: User list not found.' });
              }
            }
          );
      })
      .catch(err => {
        console.log(err);
      });
  } catch (error) {
    console.log('/listUsers connection failed.');
  }
});

// @ route  PUT api/user/updateUser
// @ desc   Update a user
// @ access User admins only (need UserUpdate=true)
router.post('/updateUser', (req, res) => {
  res.json({ msg: 'updateUser works' });
});

// @ route  PUT api/user/deleteUser
// @ desc   Delete a user
// @ access User admins only (need UserDelete=true)
router.post('/deleteUser', (req, res) => {
  res.json({ msg: 'deleteUser works' });
});

// @ route  PUT api/time/approveUserById
// @ desc   Approve a user
// @ access Restricted (need IssueApprove=true)
router.post('/approveUserById', (req, res) => {
  res.json({ msg: 'approveUserById works' });
});

// @ route  GET api/user/current
// @ desc   Return token owner
// @ access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;