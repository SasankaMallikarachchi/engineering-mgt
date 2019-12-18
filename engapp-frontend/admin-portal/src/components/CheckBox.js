import React, { Component } from 'react';

const initState = {
    checklist: [],
    teams: [],
    sAll: null
};

class CheckBox extends Component{
    state = initState;
    constructor(props){
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
        this.displayChecked = this.displayChecked.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }    
    componentDidMount(){
        if(this.props.chkAll === true){
            this.setState({sAll: true})
        }
        else{
            this.setState({sAll: false})
        }
        // console.log("method invoked")
    }
    handleCheck(e){
        if (this.state.teams.length === 0){
            for(let i=0; i<this.props.getNames.length; i++){
                // console.log();
                this.state.teams.push(this.props.getNames[i].TEAM_NAME.toString());
            }
            console.log(this.state.teams);
        }
        if(e.target.checked){
            this.state.checklist.push(this.props.rid);
            console.log(this.state.checklist);
        }else{
            let flag, n;
            for(let i=0; i<this.state.checklist.length; i++){
                if(this.state.checklist[i] === this.props.rid){
                    flag = true;
                    n = i;
                }
            }
            if(flag === true){
                if(n>-1)
                    this.state.checklist.splice(n,1);
            }
            console.log(this.state.checklist);
        }
       
        if(this.state.checklist.length > 0){
            this.props.flagvalue(true);
        }else{
            this.props.flagvalue(false);
        }
    }
    displayChecked(rid){
        
            for(let i= 0; i<this.state.checklist.length; i++){
                if(rid === this.state.checklist[i]){
                    return true;
                }
            }
        
    }
    render(){
        return(
            <div className="funkyradio funkyradio-primary">
                <input type='checkbox' onChange={this.handleCheck} checked={this.displayChecked(this.props.rid)}/>
            </div>
        );
    }
}

export default CheckBox;