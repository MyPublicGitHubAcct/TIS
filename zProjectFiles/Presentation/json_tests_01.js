/** -------------------------------------------------- */
/** Example 1 A: adding a new user (front end)
    Notes:
        - rolePresets is stored in state when page is loaded.
          Below is an example of what that might look like.
        - likewise, newUserDetails is fake data, but would be
          made up of infomration in state.
 */

let rolePresets = {
  '0': { ID: 1, RoleName: 'AppAdmin', UserHas: 'false' },
  '1': { ID: 2, RoleName: 'UserMgr', UserHas: 'false' },
  '2': { ID: 3, RoleName: 'ProjectMgr', UserHas: true },
  '3': { ID: 4, RoleName: 'TeamMember', UserHas: 'false' },
  '4': { ID: 5, RoleName: 'IssueInputter', UserHas: false },
  '5': { ID: 6, RoleName: 'IssueApprover', UserHas: 'false' },
  '6': { ID: 7, RoleName: 'IssueReader', UserHas: 'true' },
  '7': { ID: 8, RoleName: 'CommentInputter', UserHas: 'false' },
  '8': { ID: 9, RoleName: 'CommentApprover', UserHas: 'false' },
  '9': { ID: 10, RoleName: 'CommentReader', UserHas: 'false' }
};

let newUser = [];

let newUserDetails = {
  FirstName: 'Bill',
  LastName: 'Test',
  Manager: 2,
  Logon: 'testxbx',
  Password: 'bnGH67#$',
  Department: 2,
  isManager: 0,
  isActive: 1
};

let newUserRoles = [];
let ri;
let uh;

for (let r in rolePresets) {
  ri = rolePresets[r].ID;

  if (rolePresets[r].UserHas === 'false' || rolePresets[r].UserHas === false) {
    uh = 0;
  } else if (
    rolePresets[r].UserHas === 'true' ||
    rolePresets[r].UserHas === true
  ) {
    uh = 1;
  }

  newUserRoles.push({ RoleId: ri, UserHas: uh });
}

newUser.push({ Details: newUserDetails, Roles: newUserRoles });

/** BEGIN TESTING

    OUTPUT from test via JSON.stringify(newUser) ===
    [{
    "Details":{
        "FirstName":"Bill",
        "LastName":"Test",
        "Manager":2,
        "Logon":"testxbx",
        "Password":"bnGH67#$",
        "Department":2,
        "isManager":0,
        "isActive":1 },
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

    OUTPUT from gui via console.log(JSON.stringify(newUser));
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

    END OF TESTING */

/** -------------------------------------------------- */
/** Example 1 B: adding a new user (front to back end)
    Notes:
        - front end calls service via api for back end
        - back end validates the data
        - back end stores the data via a connnection to the db
        - the code below will not run outside of the application
 */

/** The following function is called (in AddUser.js) after A is complete.
 * newUser was built in part A, history is part of React and is used
 * here to allow the application to redirect the user */
this.props.addUser(newUser, this.props.history);

/** addUser() is an action which calls the api (/routes/api/user/createUser)
 * with the data built in A.  The api is an interface to the server which
 * provides additional functionality/access to data.  In this case, the
 * server has the ability to make requests to the database.  The front end
 * cannot do this.
 *
 * addUser() in userActions.js - this is part of using redux
 * addUser() resolves (returns to the main thread) if it is successful.
 * If it is not successful, it forwards the error to the reducer so
 * that the error can be included in state and the user can get feedback
 * about what is happening. */
export const addUser = userData => dispatch => {
  return new Promise((resolve, reject) => {
    axios
      .post('/routes/api/user/createUser', userData)
      .then(resolve('success'))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  });
};

/** the api route createUser is what does most of the actual work.
 * '...a bunch of code...' is where that happens. */
router.post('/createUser', (req, res) => {
  '...a bunch of code...';
});

/** after some validation, a connection to the database is established
 * and the request is sent to create the user.  This does NOT make
 * entries for the roles that have been assigned to the user.
 * Note:
 * input is sent to the db
 * output is returned from the db
 * execute calls the procedure on the database */
const dbConn = new sql.ConnectionPool(config.dbSa);
dbConn
  .connect()
  .then(() => {
    const request = new sql.Request(dbConn);
    request
      .input('FirstName', sql.VarChar, req.body.FirstName)
      .input('.......the rest is included here too......')
      .output('responseMessage', sql.VarChar)
      .execute('dbtis.tis.sp_CreateUser', result => {
        dbConn.close();

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

/** in the database, a stored procedure called 'sp_CreateUser'
 * is used to
 */

/** in the database, a stored procedure called 'sp_ReadUserIdByLogon'
 * is used to
 */

/** in the database, a stored procedure called 'sp_CreateUserRole'
 * is used to
 */

/** to determine how to do this, Postman can be used
 * ...show this now. */
