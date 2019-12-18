import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckBox from './CheckBox';

const initState= {
    post: [],
    team_names: [],
    org_names: [],
    teams: [],
    checklist: [],
    isAll: null,
    flag: false,
    selectAll: []
};
class RepoTable extends Component{
    state = initState;
    constructor(props){
        super(props);
        this.formRef = React.createRef();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getTeamName = this.getTeamName.bind(this);
        this.getOrgName = this.getOrgName.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setflag = this.setflag.bind(this);
        this.delete = this.delete.bind(this);
        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.setSelectAll = this.setSelectAll.bind(this);
    }
    componentDidMount(){
        axios({
            method: "get",
            url: "http://localhost:9090/home/Repositories"
        }).then(res => {
            //console.log(res);
            this.setState({post: res.data});
        })

        axios({
            method: "get",
            url: `http://localhost:9090/home/viewTeamNames`
        }).then(res => {
            //console.log(res.data);
            this.setState({team_names: res.data});
            console.log(this.state.team_names);
        })

        axios({
            method: "get",
            url: `http://localhost:9090/home/viewOrgNames`
        }).then(res => {
            this.setState({org_names: res.data});
            console.log(this.state.org_names);
        })
    }
    getTeamName(t_id){
        for(let i=0; i < this.state.team_names.length;i++){
            if(this.state.team_names[i].TEAM_Id === t_id){
                return this.state.team_names[i].TEAM_NAME;
            }
        }
    }  
    getTeamId(t_name){
        for(let i=0; i < this.state.team_names.length;i++){
            if(this.state.team_names[i].TEAM_NAME === t_name){
                return this.state.team_names[i].TEAM_Id;
            }
        }
    } 
    getOrgName(o_id){
        for(let i=0; i < this.state.org_names.length;i++){
            if(this.state.org_names[i].ORG_ID === o_id){
                return this.state.org_names[i].ORG_NAME;
            }
        }
    }
    getOrgId(o_name){
        for(let i=0; i < this.state.org_names.length;i++){
            if(this.state.org_names[i].ORG_NAME === o_name){
                return this.state.org_names[i].ORG_ID;
            }
        }
    } 
    handleChange(){
        var t_id = this.getTeamId(event.target.value); 
        

        var form = this.formRef.current.state.checklist;
        if(this.state.selectAll.length > 0){
            for(let i =0; i<= this.state.post.length; i++){
                form.push(i);
            }
            console.log(form)
        }else{

        }
        axios({
            method: "put",
            url: `http://localhost:9090/home/update/${t_id}`,
            data: {
                repo_id: form
            }
        }).then(res => {
            console.log(res);
        })
        window.location.reload(false);
    }
    delete(){
        var form = this.formRef.current.state.checklist;

        axios({
            method: "delete",
            url: `http://localhost:9090/home/remove`,
            data: {
                repo_id: form
            }
        }).then(res => {
            console.log(res);
        })
       // window.location.reload(false);
    }
    setflag(input){
        if( (input === true) || (this.state.selectAll.length) > 0)
            this.setState({flag: true})
        else{
            this.setState({flag: false})
        }
    }
    handleSelectAll(e){
       
        if(e.target.checked=== true){
            this.state.selectAll.push(1);
            this.setflag(true);
        }
        else{
            this.state.selectAll.pop();
            this.setflag(false);
        }
    }
    handleInputChange(e){
        var input = e.target.value;
        if(input === ""){
            this.componentDidMount();
        }
        else{
            var i = this.getOrgId(input);
            console.log(i)
            if( i === undefined){
                i = this.getTeamId(input);
            }
            axios({
                method: "get",
                url: `http://localhost:9090/home/find/${i}`
            }).then (res => {
                console.log(res);
                this.setState({post: res.data});
            })
        }
    }
    setSelectAll(){
        if(this.state.selectAll.length > 0){
            return true;
        }else{
            this.setState({flag: false})
            return false;
        }
    }
    render(){    
        const TableRow = ({repo_id, repo_name, org_id, url, team_id, repo_type }) => {
            return (
                <tr>
                    <td><CheckBox rid={repo_id} ref={this.formRef} getNames={this.state.team_names} flagvalue={this.setflag} chkAll={this.setSelectAll}/></td>
                    <td>{repo_name}</td>
                    <td>{this.getOrgName(org_id)}</td>
                    <td>{url}</td>
                    <td>{this.getTeamName(team_id)}</td>
                    <td>{repo_type}</td>
                </tr>
            );
        }
        return(
            <div>
                <div className="input-group">
                    <div className="dropdownlabel">                        
                        <label>Change Repository Name  : </label>
                    </div>
                    <div className="form-group">
                        <select className="form-control"
                        disabled={!this.state.flag} value={this.state.value} onChange={this.handleChange}>
                        {
                            (this.state.team_names && this.state.team_names.length > 0) && this.state.team_names.map((schema) => {
                                return (                                      
                                    <option key={schema.TEAM_NAME} value={schema.TEAM_NAME}>{schema.TEAM_NAME}</option>
                                );
                            })
                        }
                        </select>  
                    </div>
                    <div className="md-form mt-0">
                        <input className="form-control" type="text" name="id" placeholder="Search here.." onChange={this.handleInputChange}></input>
                    </div>               
                </div>
                <br></br>
                <table  className="employees">
                    <thead>
                        <tr>
                            <th><input type="checkbox" onChange={this.handleSelectAll}></input></th>
                            {/* <th><CheckBox rid={this.setSelectAll}/></th> */}
                            {/* <th></th> */}
                            <th>Repository Name</th>
                            <th>Organization Name</th>
                            <th>URL</th>
                            <th>Team Name</th>
                            <th>Repository type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.post.map((repo, index) => {
                            return(
                                <TableRow key={index}
                                    repo_id={repo.REPOSITORY_ID}
                                    github_id={repo.GITHUB_ID}
                                    repo_name={repo.REPOSITORY_NAME}
                                    org_id={repo.ORG_ID}
                                    url={repo.URL}
                                    team_id={repo.TEAM_ID}
                                    repo_type={repo.REPOSITORY_TYPE}
                                />
                            );
                        })
                        }
                    </tbody>
                </table>
                    <p>{this.state.flag}</p>
            </div>
        );
    }
}
export default RepoTable;