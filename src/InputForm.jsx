import React from 'react'
import './css/InputForm.css'
import {checkList} from './chromeAPI/retrieveSchoolList'

export default class InputForm extends React.Component {
    state = {
        inputschool: "",
        inputdate: "",
        invalidschool: false,
        invaliddate: false,
        badschool: "",
        baddate: ""
    }

    validateForm = async () => {
        // check to make sure its not in the list
        let valschool = await checkList(this.state.inputschool);
        if (!valschool)
            this.setState({
                invalidschool: true,
                badschool: this.state.inputschool
            });
        else 
            this.setState({
                invalidschool: false,
                badschool: ""
            });

        // check to make sure the date hasnt been reached yet
        let now = Date.now();
        let checkDate = new Date(this.state.inputdate);

        if (checkDate.getTime() < now)
            this.setState({
                invaliddate: true,
                baddate: this.state.inputdate
            });
        else
            this.setState({
                invaliddate: false,
                baddate: ""
            });

        return !this.state.invalidschool && !this.state.invaliddate; // want both to be valid
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        
        // validate the form
        if (await this.validateForm()){
            console.log('this is good');
        } else console.log('this is bad');
    }

    handleChange = (event, fieldname) => {
        this.setState({[fieldname]: event.target.value});
    }

    render() {
        return (
            <form className='InputForm' onSubmit={this.handleSubmit}>
                <h3>Enter New School</h3>

                <div id='inputname' className='Inputer'>
                    <p>School Name</p>
                    <input 
                        type='text'
                        onChange={e => {this.handleChange(e, 'inputschool')}}
                        value={this.state.inputschool}
                        required 
                    />
                    {this.state.invalidschool ? <p>{this.state.badschool} is already registered</p> : null}
                </div>

                <div id='inputdate' className='Inputer'>
                    <p>Deadline Date</p>
                    <input
                        type='date'
                        onChange={e => {this.handleChange(e, 'inputdate')}}
                        value={this.state.inputdate}
                        required
                    />
                    {this.state.invaliddate ? <p>{this.state.baddate} is invalid</p> : null}
                </div>

                <div id='inputsubmit' className='Inputer'>
                    <p>Submit</p>
                    <input type='submit' required></input>
                </div>
                
            </form>
        )
    }
}