// place /login here before v1
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

// load input validation
const validateLoginInput = require('../../validation/login');

// @ route  GET api/auth/test
// @ desc   Test 'auth' route
// @ access Public
router.get('/test', (req, res) => res.json({ msg: 'auth route works' }));

// @ route  PUT api/user/login
// @ desc   Return json web token
// @ access Public
router.post('/login', (req, res) => {
  // validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const dbConn = new sql.ConnectionPool(config.dbSa);
    dbConn.connect().then(() => {
      const request = new sql.Request(dbConn);
      request
        .input('Logon', sql.VarChar, req.body.Logon)
        .input('Password', sql.VarChar, req.body.Password)
        .output('responseMessage', sql.VarChar)
        .execute('dbtis.tis.sp_AuthenticateUser', (err, result) => {
          dbConn.close();

          if (err) {
            console.log('getUser err = ' + err);
          }

          if (result.output.responseMessage != 'success') {
            if (result.output.responseMessage == 'Incorrect password') {
              return res.status(404).json({ Password: 'Password is wrong' });
            } else if (result.output.responseMessage == 'Invalid login') {
              return res.status(404).json({ Logon: 'User does not exist' });
            } else {
              return res.status(400).json({ message: 'Unknown error' });
            }
          } else {
            // match -> get user info for token
            const dbConn = new sql.ConnectionPool(config.dbSa);
            dbConn.connect().then(() => {
              const request = new sql.Request(dbConn);
              request
                .input('Logon', sql.VarChar, req.body.Logon)
                .execute(
                  'dbtis.tis.sp_ReadUserAndRolesByLogon',
                  (err, result) => {
                    dbConn.close();
                    if (err) {
                      console.log('sp_ReadUserAndRolesByLogon error = ' + err);
                    }
                    if (result) {
                      // sign token
                      const returnSet = { result };

                      const payload = {};
                      payload.ID = returnSet.result.recordsets[0][0].ID;
                      payload.Logon = returnSet.result.recordsets[0][0].Logon;
                      payload.FirstName =
                        returnSet.result.recordsets[0][0].FirstName;
                      payload.isManager =
                        returnSet.result.recordsets[0][0].isManager;
                      payload.isActive =
                        returnSet.result.recordsets[0][0].isActive;

                      // set all perms false
                      payload.ProjectCreate = 'false';
                      payload.ProjectRead = 'false';
                      payload.ProjectUpdate = 'false';
                      payload.ProjectDelete = 'false';
                      payload.ProjectApprove = 'false';
                      payload.UserCreate = 'false';
                      payload.UserRead = 'false';
                      payload.UserUpdate = 'false';
                      payload.UserDelete = 'false';
                      payload.UserApprove = 'false';
                      payload.TimeCreate = 'false';
                      payload.TimeRead = 'false';
                      payload.TimeUpdate = 'false';
                      payload.TimeDelete = 'false';
                      payload.TimeApprove = 'false';
                      payload.IssueCreate = 'false';
                      payload.IssueRead = 'false';
                      payload.IssueUpdate = 'false';
                      payload.IssueDelete = 'false';
                      payload.IssueApprove = 'false';
                      payload.CommentCreate = 'false';
                      payload.CommentRead = 'false';
                      payload.CommentUpdate = 'false';
                      payload.CommentDelete = 'false';
                      payload.CommentApprove = 'false';
                      payload.AdminAll = 'false';

                      returnSet.result.recordsets[0].forEach(element => {
                        if (element.UserHas) {
                          if (element.ProjectCreate == true) {
                            payload.ProjectCreate = 'true';
                          }
                          if (element.ProjectRead == true) {
                            payload.ProjectRead = 'true';
                          }
                          if (element.ProjectUpdate == true) {
                            payload.ProjectUpdate = 'true';
                          }
                          if (element.ProjectDelete == true) {
                            payload.ProjectDelete = 'true';
                          }
                          if (element.ProjectApprove == true) {
                            payload.ProjectApprove = 'true';
                          }
                          if (element.UserCreate == true) {
                            payload.UserCreate = 'true';
                          }
                          if (element.UserRead == true) {
                            payload.UserRead = 'true';
                          }
                          if (element.UserUpdate == true) {
                            payload.UserUpdate = 'true';
                          }
                          if (element.UserDelete == true) {
                            payload.UserDelete = 'true';
                          }
                          if (element.UserApprove == true) {
                            payload.UserApprove = 'true';
                          }
                          if (element.TimeCreate == true) {
                            payload.TimeCreate = 'true';
                          }
                          if (element.TimeRead == true) {
                            payload.TimeRead = 'true';
                          }
                          if (element.TimeUpdate == true) {
                            payload.TimeUpdate = 'true';
                          }
                          if (element.TimeDelete == true) {
                            payload.TimeDelete = 'true';
                          }
                          if (element.TimeApprove == true) {
                            payload.TimeApprove = 'true';
                          }
                          if (element.IssueCreate == true) {
                            payload.IssueCreate = 'true';
                          }
                          if (element.IssueRead == true) {
                            payload.IssueRead = 'true';
                          }
                          if (element.IssueUpdate == true) {
                            payload.IssueUpdate = 'true';
                          }
                          if (element.IssueDelete == true) {
                            payload.IssueDelete = 'true';
                          }
                          if (element.IssueApprove == true) {
                            payload.IssueApprove = 'true';
                          }
                          if (element.CommentCreate == true) {
                            payload.CommentCreate = 'true';
                          }
                          if (element.CommentRead == true) {
                            payload.CommentRead = 'true';
                          }
                          if (element.CommentUpdate == true) {
                            payload.CommentUpdate = 'true';
                          }
                          if (element.CommentDelete == true) {
                            payload.CommentDelete = 'true';
                          }
                          if (element.CommentApprove == true) {
                            payload.CommentApprove = 'true';
                          }
                          if (element.AdminAll == true) {
                            payload.AdminAll = 'true';
                          }
                        }
                      });

                      // sign token
                      jwt.sign(
                        payload,
                        keys.secretOrKey,
                        { expiresIn: 14400 },
                        (err, token) => {
                          if (err) {
                            res.json({ message: 'token broken' });
                          }
                          res.json({ success: true, token: 'Bearer ' + token });
                        }
                      );
                    }
                  }
                );
            });
          }
        });
    });
  } catch (error) {
    console.log('/login: connection failed.');
  }
});

module.exports = router;
