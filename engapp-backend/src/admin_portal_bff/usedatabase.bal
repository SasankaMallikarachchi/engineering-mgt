//import ballerina/config;
import ballerina/jsonutils;
//import ballerina/log;
import ballerinax/java.jdbc;
import ballerina/io;

jdbc:Client employeeDb = new ({
    url: "",
    username: "",
    password: "",
    poolOptions: { maximumPoolSize: 5 },
    dbOptions: { use: false }
});

function getAllTeamNames() returns json[]? {
    string sqlString = "SELECT TEAM_Id,TEAM_NAME FROM ENGAPP_TEAMS";
    var teams = employeeDb->select(sqlString, ());
    if(teams is table<record {}>)  {
        json jsonConversionRes = jsonutils:fromTable(teams);
        return <json[]>jsonConversionRes;
    }else{
        io:println("error while selecting");
    } 
}

function getAllOrgNames() returns json[]? {
    string sqlString = "SELECT ORG_ID, ORG_NAME FROM ENGAPP_GITHUB_ORGANIZATIONS";
    var teams = employeeDb->select(sqlString, ());
    if(teams is table<record {}>)  {
        json jsonConversionRes = jsonutils:fromTable(teams);
        return <json[]>jsonConversionRes;
    }else{
        io:println("error while selecting");
    } 
}

function getEngapp_teams() returns json {
    string sqlString = "SELECT * FROM ENGAPP_TEAMS";
    var data = employeeDb->select(sqlString, ());
    if(data is table<record {}>) {
        json j = jsonutils:fromTable(data);
        return <json>j;
    }else{
        io:println("error while getting data");
    }
}

function getAllRepoNames() returns json{
    string sqlString = "SELECT REPOSITORY_NAME  FROM ENGAPP_GITHUB_REPOSITORIES";
    var orgs = employeeDb->select(sqlString, ());
    if(orgs is table<record {}>) {
        json jsonConversion = jsonutils:fromTable(orgs);
        return <json>jsonConversion;
    }
}

function getEngapp_repositories() returns json {
    string sqlString = "SELECT * FROM ENGAPP_GITHUB_REPOSITORIES";
    var data = employeeDb->select(sqlString, ());
    if(data is table<record {}>) {
        json j = jsonutils:fromTable(data);
        return <json>j;
    }else{
        io:println("error while getting data");
    }
}

function getOrgs() returns json {
    string sqlString = "SELECT * FROM ENGAPP_GITHUB_ORGANIZATIONS";
    var data = employeeDb->select(sqlString, ());
    if(data is table<record {}>){
        json j = jsonutils:fromTable(data);
        return <json>j;
    }else{
        io:println("error while getting data");
    }
}

function getTeamNameById(int team_id) returns json{
    string sqlString = "SELECT TEAM_NAME FROM ENGAPP_TEAMS WHERE TEAM_ID = ?";
    var data = employeeDb->select(sqlString, (), team_id);
    if(data is table<record {}>){
        json j = jsonutils:fromTable(data);
        return <json>j;
    }else{
        io:println("error while finding team name");
    }
}

function getOrgNamebyId(int org_id) returns json{
    string sqlString = "SELECT ORG_NAME FROM ENGAPP_GITHUB_ORGANIZATIONS WHERE ORG_ID = ?";
    var data =  employeeDb->select(sqlString, (), org_id);
    if(data is table<record {}>){
        json j  = jsonutils:fromTable(data);
        return j;
    }else{
        io:println("error while finding organization name");
    }
}

function updateTeamNames(string repos,int team) returns json{
    json updateStatus;
    string slqString = "UPDATE ENGAPP_GITHUB_REPOSITORIES SET TEAM_ID = ? WHERE REPOSITORY_ID IN "+repos;
    var ret = employeeDb->update(slqString, team);
    if(ret is jdbc:UpdateResult && ret.updatedRowCount > 0){
        updateStatus = {"Status": "updated successfully"};
    }
    else{
        updateStatus = {"Status":"error occured"};
    }
    return updateStatus;
}