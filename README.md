# TimeAndIssues

Simple OSS application for tracking small project time and issues. It is not yet supposed to be nice; it is supposed to be minimally functional. If you would like to help us to make it nice, please fork and make pull requests!

## Note about reporting

This application is not intended to do reporting. Instead, we recommend using a tool such as <a href="https://docs.microsoft.com/en-us/sql/reporting-services/">SSRS</a> and have included example reports.

<hr>

## Frameworks and other dependencies

The application is made up of <b>TODO</b> and (for now) a MS SQL Server database.

<ul>
    <li><a href="https://www.microsoft.com/en-us/sql-server/sql-server-2017">MS Sql Server</a> for data storage.</li>
    <li><a href="https://www.docker.com">Docker</a> for running SQL Server on Mac.</li>
    <li><a href="https://nodejs.org/en/">Node.js</a> for running Javascript server-side.</li>
    <li><a href="https://expressjs.com">Express</a> for back-end state.</li>
    <li><a href="https://reactjs.org">React</a> front-end Javascript library.</li>
    <li><a href="https://reacttraining.com/react-router/">React Router</a> for front-end routing.</li>
    <li><a href="https://getbootstrap.com">Bootstrap</a> library for GUI widgets.</li>
    <li><a href="https://redux.js.org/">Redux</a> for front-end state.</li>
</ul>

<hr>

## Database and application framework

### Node.js install

https://nodejs.org/en/docs/ <br>
This will install both Node.js as well as npm, which will be used for <i>most</i> of the other dependencies.

### MS SQL Server

https://www.codeproject.com/Tips/1189900/Understanding-callbacks-through-Asynchronous-Execu
https://database.guide/how-to-install-sql-server-on-a-mac/
https://www.quackit.com/sql_server/sql_server_2017/tutorial/
https://www.microsoft.com/en-us/sql-server/developer-get-started/node/mac/
https://docs.microsoft.com/en-us/sql/t-sql/
https://social.technet.microsoft.com/wiki/contents/articles/36720.sql-server-crud-actions-using-node-js.aspx
https://www.codeproject.com/Articles/1158115/SQL-Server-CRUD-Actions-Using-Node-JShttps://ravisatyadarshi.wordpress.com/2017/02/18/encrypt-password-in-sql/
https://medium.com/@Ratnaparkhi/testing-saml-flow-in-your-node-js-application-1ab82f95b69d
http://www.passportjs.org/packages/passport-saml-too/

#### First install Docker CE for Mac

https://store.docker.com/editions/community/docker-ce-desktop-mac

#### Then get SQL Server for Linux

    docker pull microsoft/mssql-server-linux

#### Launch docker

    docker run -d --name sql_server_tis -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Re@11yStr0ngPwd2' -p 1433:1433 microsoft/mssql-server-linux

#### Check docker

    docker ps

#### See docker logs

    docker logs -t sql_server_tis

#### Install sql-cli

    sudo npm install -g sql-cli

#### Connect to SQL Server

    mssql -u sa -p Re@11yStr0ngPwd2
    mssql -u tisApp -p pa$Sw0rd

#### Install dbeaver

https://dbeaver.io/download/ (Community edition)

##### Set up the connection to the SQL Server database

https://github.com/dbeaver/dbeaver/wiki/Create-Connection

    Server Name: localhost
    Database/Schema: tis
    Windows Authentication: false
    User name: sa
    Password: Re@11yStr0ngPwd2
    Save password locally:
    Slow All Schemas: true

#### To use:

##### Start the Docker app

##### Start the database

    docker start sql_server_tis

##### Stop the database

    docker stop sql_server_tis

### mssql and Express install

https://www.npmjs.com/package/mssql
https://expressjs.com

    npm install mssql
    npm install express

### Other useful components

    npm install body-parser
    npm install validator
    npm install -D nodemon

### React install

React and several other useful tools, including a dev webserver, are installed with create-react-app. See <b>Practical notes</b> below.<br>
https://reactjs.org/docs/getting-started.html <br>

### React Router install

https://reacttraining.com/react-router/web/guides/philosophy

    npm install react-router-dom

### Redux install

https://redux.js.org/basics/usagewithreact

    npm install react-redux react-router-redux

<hr>

## Practical notes:

#### NOTE 1:

This application was built on an Apple <a href="https://www.apple.com/mac/"><b>Mac</b></a>. No development was attempted on a Windows machine.

#### NOTE 2: to make a front end app named "tis": <br>

First, install Create React App (https://github.com/facebook/create-react-app). <br>

    npm install -g create-react-app

Next, make the boilerplate application. <br>

    cd Documents/SourceControl/
    create-react-app tis
    npm install react-router-dom
    mkdir client

    sudo npm i -g npm
    npm update -g *

#### NOTE 3: to run an app:<br>

    cd Documents/SourceControl/TIS
    docker start sql_server_tis
    npm run dev

#### NOTE 4: to create a minified bundle (for prod):<br>

    npm run build

#### Note 5: to update dependencies

    npm update [-g] [<pkg>...]

or

    npm i -g npm-check-updates
    ncu -u
    npm install

#### Note 6: http status codes and methods

https://www.restapitutorial.com/httpstatuscodes.html
https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

#### Note 7: Async/Await

https://www.valentinog.com/blog/how-async-await-in-react/

<hr>

## Design notes:

Project paths

<table>
    <tr>
        <th>client path</th>
        <th>client component </th>
        <th>server route</th>
        <th>database script</th>
        <th>postman test</th>
    </tr>
    <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
        <td>d</td>
        <td>e</td>
    </tr>
</table>

Time paths

<table>
    <tr>
        <th>client path</th>
        <th>client component </th>
        <th>server route</th>
        <th>database script</th>
        <th>postman test</th>
    </tr>
    <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
        <td>d</td>
        <td>e</td>
    </tr>
</table>

User admin paths

<table>
    <tr>
        <th>client path</th>
        <th>client component </th>
        <th>server route</th>
        <th>database script</th>
        <th>postman test</th>
    </tr>
    <tr>
        <td>/test</td>
        <td>N/A</td>
        <td>/routes/api/user/test</td>
        <td>N/A</td>
        <td>test</td>
    </tr>
    <tr>
        <td>/userAdmin/addUser</td>
        <td>CrudUser/CreateUser</td>
        <td>/routes/api/user/createUser</td>
        <td>sp_CreateUser</td>
        <td>createUser</td>
    </tr>
    <tr>
        <td>/userAdmin/listUsers</td>
        <td>CrudUser/CrudUser</td>
        <td>/routes/api/user/listUsers</td>
        <td>sp_ListUsersByManagerId</td>
        <td>listUsers</td>
    </tr>
    <tr>
        <td>/userAdmin/changeUser</td>
        <td>CrudUser/UpdateUser</td>
        <td>/routes/api/user/updateUser</td>
        <td>?</td>
        <td>updateUser</td>
    </tr>
</table>

Application admin paths

<table>
    <tr>
        <th>client path</th>
        <th>client component </th>
        <th>server route</th>
        <th>database script</th>
        <th>postman test</th>
    </tr>
    <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
        <td>d</td>
        <td>e</td>
    </tr>
</table>

Other paths

<table>
    <tr>
        <th>client path</th>
        <th>client component </th>
        <th>server route</th>
        <th>database script</th>
        <th>postman test</th>
    </tr>
    <tr>
        <td>a</td>
        <td>b</td>
        <td>c</td>
        <td>d</td>
        <td>e</td>
    </tr>
</table>

<hr>

## Test data

Install in this order:

<h5>scripts to create tables in database</h5>
<ul>
    <li>CreateTableAppRole.sql</li>
    <li>CreateTableAppUser.sql</li>
    <li>CreateTableDepartment.sql</li>
    <li>CreateTableUserRole.sql</li>
</ul>

<h5>stored procedures needed before test data</h5>
<ul>
    <li>dbtis.tis.sp_CreateDepartment</li>
    <li>dbtis.tis.sp_CreateRole</li>
    <li>dbtis.tis.sp_CreateUser</li>
    <li>dbtis.tis.sp_CreateUserRole</li>
</ul>

<h5>script to create data in database tables</h5>
<ul>
    <li>InsertTestData.sql</li>
</ul>

<h5>(additional) stored procedures called in user.js</h5>
<ul>
    <li>dbtis.tis.sp_AuthenticateUser</li>
    <li>dbtis.tis.sp_ReadUserAndRolesByLogon</li>
    <li>dbtis.tis.sp_ReadUserById</li>
    <li>dbtis.tis.sp_ReadUserByLogon</li>
    <li>dbtis.tis.sp_FillMgrOpts</li>
    <li>dbtis.tis.sp_FillDptOpts</li>
    <li>dbtis.tis.sp_ReadUserRoleList</li>
    <li>dbtis.tis.sp_ReadRoleListForUserId</li>
    <li>dbtis.tis.sp_ListUsersByManagerId</li>
</ul>

<h5>(additional) called in ?.js</h5>
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

<h5>script to remove tables and stored procedures</h5>
<ul>
    <li>DropAll.sql</li>
</ul>

## Unimportant notes:

The following other tools have been used during development:

<ul>
    <li><a href="https://code.visualstudio.com">vs code</a></li>
    <li><a href="https://docs.microsoft.com/en-us/sql/sql-operations-studio/download?view=sql-server-2017">sqlops</a></li>
    <li><a href="https://www.apple.com/safari/"> Safari</a></li>
    <li><a href="https://www.google.com/chrome/">Chrome</a></li>
    <li><a href="https://www.getpostman.com">Postman</a></li>
    <li><a href="https://codesandbox.io/">Code Sandbox</a></li>
</ul>

To make vs code a little nicer to use, try the following extensions:

<ul>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel">Babel Javascript</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme"></a>Material Icon Theme</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode"></a>Prettier - Code formatter</li>
    <li><a href="https://quokkajs.com/docs/">quokkajs</a></li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense"></a>npm intellisense</li>
    <li><a href="https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets">Reactjs ES7 code snippets</a></li>
</ul>
