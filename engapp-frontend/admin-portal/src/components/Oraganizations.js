import React, { Component } from 'react';
import axios from 'axios';

const initState= {
    post: []
};

class OrgTable extends Component{
    state = initState;
    constructor(props){
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount(){
        axios({
            method: "get",
            url: "http://localhost:9090/home/Organizations"
        }).then(res => {
            //console.log(res);
            this.setState({post: res.data})
        })
    }
    render(){
        const TableRow = ({org_id, github_id, org_name}) => {
            return (
                <tr>
                    <td>{org_id}</td>
                    <td>{github_id}</td>
                    <td>{org_name}</td>
                </tr>
            );
        }
        return(
            <div>
                <table  className="employees">
                    <thead>
                        <tr>
                            <th>Organization Id</th>
                            <th>GitHub Id</th>
                            <th>Organization Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.post.map((org) => {
                            return(
                                <TableRow key={org.ORG_ID}
                                org_id={org.ORG_ID}
                                github_id={org.GITHUB_ID}
                                org_name={org.ORG_NAME}
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

export default OrgTable;