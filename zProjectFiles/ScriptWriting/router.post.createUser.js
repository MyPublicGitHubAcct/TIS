/**
    Body of the request includes something like what is below.
    This is received and refered to as 'req'.

    [{
    "Details":{
        "FirstName":"Bill",
        "LastName":"Test",
        "Manager":"2",                 // DIFFERENCE ?
        "Logon":"testxbx",
        "Password":"bnGH67#$",
        "Department":"2",              // DIFFERENCE ?
        "isManager":0,
        "isActive":1},
    "Roles":[
        {"RoleId":1,"UserHas":0},
        {"RoleId":2,"UserHas":0},
        {"RoleId":3,"UserHas":1},
        {"RoleId":4,"UserHas":0},
        {"RoleId":5,"UserHas":0},
        {"RoleId":6,"UserHas":0},
        {"RoleId":7,"UserHas":1},
        {"RoleId":8,"UserHas":0},
        {"RoleId":9,"UserHas":0},
        {"RoleId":10,"UserHas":0} ]
    }]

    For roles, script will request the ID of the user with the
    logon that is included as req.body.Logon

    How to deal with oject in a request????

 */




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
