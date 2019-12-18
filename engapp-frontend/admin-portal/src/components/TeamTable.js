import React, { Component } from 'react';
import axios from 'axios';

const initState= {
    post: []
};

class TeamTable extends Component{
    state = initState;
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        axios({
            method: "get",
            url: "http://localhost:9090/home/Teams"
        }).then(res => {
            //console.log(res);
            this.setState({post: res.data})
        })
    }
    render(){
        const TableRow = ({TEAM_ID, TEAM_NAME, TEAM_ABBR, TEAM_TYPE}) => {
            return (
                <tr>
                    <td>{TEAM_ID}</td>
                    <td>{TEAM_NAME}</td>
                    <td>{TEAM_ABBR}</td>
                    <td>{TEAM_TYPE}</td>
                </tr>
            );
        }
        return(
            <div>
                <table  className="employees">
                    <thead>
                        <tr>
                            <th>Team id</th>
                            <th>Team name</th>
                            <th>Team abbr</th>
                            <th>Team type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.post.map((team) => {
                            return(
                                <TableRow key={team.TEAM_ID}
                                TEAM_ID={team.TEAM_ID}
                                TEAM_NAME={team.TEAM_NAME}
                                TEAM_ABBR={team.TEAM_ABBR}
                                TEAM_TYPE={team.TEAM_TYPE}
                                />
                            );
                        })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TeamTable;