#### TODO items

## sp_AuthenticateUser

- Is this really working???
- Try to refactor, use sp_ReadUserIdByLogon as example

## gitignore

- did not stop node_modules from going in...so i removed those
  before committing the first time.

## database connection

- encrypt it... see https://www.npmjs.com/package/mssql
  under Drivers / Tedious / options.encrypt

## auth and auth

- Add description for each role and show with tooltip where needed.

## users

- For adding users, first check if Logon already exists
- For adding user, combine getUserIdByLogon() and addUsersRole() ?
- In AddUser, when setting state=props for roles, have structure of
  { RoleId: props.ID, UserHas: props.UserHas }
  ... then it might be easier. Also, look @ sp\_ that provides data.
