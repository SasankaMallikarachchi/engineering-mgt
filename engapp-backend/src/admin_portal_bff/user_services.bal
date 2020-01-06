import ballerina/http;
import ballerina/io;
import ballerina/lang.'int as ints;
//import ballerina/log;

listener http:Listener httpListener = new (9090);

type RepoId record {
    int[] repo_id;
};

@http:ServiceConfig {
    basePath: "/home",
    cors: {
        allowOrigins: [],
        allowHeaders: [],
        allowMethods: [],
        allowOrigins: [],
        exposeHeaders: [],
        allowCredentials: false,
        maxAge: 0
    }
}
service IssueCount on httpListener {

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/viewTeamNames"
    }
    resource function getTeamNames(http:Caller caller, http:Request request) {
        http:Response response = new;
        json j = getAllTeamNames();
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/viewOrgNames"
    }
    resource function getOrgNames(http:Caller caller, http:Request request) {
        http:Response response = new;
        json j = getAllOrgNames();
        response.setPayload(j);
        checkpanic caller->respond(response);
    }


    @http:ResourceConfig {
        methods: ["GET"],
        path: "/viewRepositoryNames"
    }
    resource function getTotalOraganizations(http:Caller caller, http:Request request) {
        http:Response response = new;
        json j = getAllOrgNames();
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/Teams"
    }
    resource function getTeams(http:Caller caller, http:Request request) {
        http:Response response = new;
        json j = getEngapp_teams();
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/Repositories"
    }
    resource function getRepos(http:Caller caller, http:Request request) {
        http:Response response = new;
        json j = getEngapp_repositories();
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/Organizations"
    }
    resource function getOrganizations(http:Caller caller, http:Request request) {
        http:Response response = new;
        json j = getOrgs();
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/teamId/{team_id}"
    }
    resource function getTName(http:Caller caller, http:Request request, string team_id) {
        http:Response response = new;
        var t_id = ints:fromString(team_id);
        if(t_id is int){
            json j = getTeamNameById(t_id);
            response.setPayload(j);
            checkpanic caller->respond(response);
        }else{
            io:println("id is not in a convertable way");
        }
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/orgId/{org_id}"
    }
    resource function getOName(http:Caller caller, http:Request request, string org_id) {
        http:Response response = new;
        var o_id = ints:fromString(org_id);
        if(o_id is int){
            json j = getOrgNamebyId(o_id);
            response.setPayload(j);
            checkpanic caller->respond(response);
        }else{
            io:println("id is not in a convertable way");
        }
    }

    @http:ResourceConfig {
        methods: ["PUT"],
        path: "/update/{name_id}"
    }
    resource function updateTN(http:Caller caller, http:Request request, string name_id) {
        int[] repo= [];
        http:Response response = new;
        string s;
        int flag =0;
        var nm_id = ints:fromString(name_id);
        
        var jsonpayload = request.getJsonPayload();
        if(jsonpayload is json){
            RepoId|error repo_list = RepoId.constructFrom(jsonpayload);
            if(repo_list is RepoId){
                repo = repo_list.repo_id;
            }
            else 
            {
                io:println("not a ajson");
                flag = 1;
            }
        }
        else{
            io:println("not a json");
        }

        s = convertToString(repo);        
        json j;
        if(nm_id is int){
            io:println(s,nm_id);
            j = updateTeamNames(<@untained>  s,nm_id, flag);
            response.setPayload(j);
            checkpanic caller->respond(response);
        }
    }  

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/find/{input}"
    }
    resource function findByAll(http:Caller caller, http:Request request, string input) {
        var find_paraN = ints:fromString(input);
        http:Response response = new;
        json j;
        if(find_paraN is int){
            j = find(<@untained> input, find_paraN);
        }else{
            j = find(<@untained> input);
        }
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/find/page/{page_no}/{per_page}"
    }
    resource function viewByPage(http:Caller caller, http:Request request, int page_no, int per_page) {
        http:Response response= new;
        json j = getByPage(<@untained>  page_no, per_page);
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    @http:ResourceConfig {
        methods: ["GET"],
        path: "/getCount"
    }
    resource function viewCount(http:Caller caller, http:Request request) {
        http:Response response = new;
        json j = getCount();
        response.setPayload(j);
        checkpanic caller->respond(response);
    }

    // @http:ResourceConfig {
    //     methods: ["DELETE"],
    //     path: "/remove"
    // }
    // resource function delete(http:Caller caller, http:Request request){
    //     int[] repo= [];
    //     http:Response response = new;
    //     var jsonpayload = request.getJsonPayload();
    //     if(jsonpayload is json){
    //         RepoId|error repo_list = RepoId.constructFrom(jsonpayload);
    //         if(repo_list is RepoId){
    //             repo = repo_list.repo_id;
    //         }
    //     }else{
    //         io:println("not a json");
    //     }
    //     string list = convertToString(repo);
    //     json j = deleteMultiple(<@untained>  list);
    //     response.setPayload(j);
    //     checkpanic caller->respond(response); 
    // }
      
}


function convertToString(int[] array)returns string{
    string s = "(";
        foreach int n in array{
            s = s.concat(n.toString());
            s = s.concat(",");
        }
        int m = s.length()-1;
        s = s.substring(0,m);
        s=s.concat(")");
        return s;
}
