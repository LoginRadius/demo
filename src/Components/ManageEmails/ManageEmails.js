import React, {Component} from 'react';
import AddEmail from './AddEmail.js'
import RemoveEmail from './RemoveEmail.js'





class ManageEmails extends Component {
    constructor(props) {
        super(props);
        this.handleEventClick = this.handleEventClick.bind(this);
        this.toRenderHandler = this.toRenderHandler.bind(this);
        this.state = {
            current: ""
        };
        this.handleEventClick = this.handleEventClick.bind(this);
        this.toRenderHandler = this.toRenderHandler.bind(this);
    }


    handleEventClick(event) {
        this.state.current === event ? this.setState({current: ""}) : this.setState({current: event});
    }


    toRenderHandler() {
        switch (this.state.current) {
            case "AddEmail":
                return (
                    <AddEmail action={this.handleEventClick}/>
                );
            case "RemoveEmail":
                return (
                    <RemoveEmail action = {this.handleEventClick}/>
                );
            default:
                return (
                    <div>
                        <button onClick={() => this.handleEventClick("AddEmail")}> Add an Email</button>
                        <br />
                        <button onClick={() => this.handleEventClick("RemoveEmail")}> Remove an Email </button>
                        <br />
                        <button onClick= {this.props.action}> Back </button>
                    </div>
                )

        }
    }




    render() {
        return (
            <div>
                {this.toRenderHandler()}
            </div>
        )
    }


}

export default ManageEmails