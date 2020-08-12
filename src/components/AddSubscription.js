import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

class AddSubscription extends Component {

    state = {
        amount: '',
        subscription_type: '',
        subcription_cycle: '',
        start_date: '',
        end_date: '',
        max_end_date: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });

        
    };

    setEndDate = (e) => {
        let startDate = new Date(e.target.value);
        let endDateMoment = moment(startDate);
        endDateMoment.add(3, 'months');
        this.setState({ max_end_date: endDateMoment.format('YYYY-MM-DD') });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const subscription = {
            amount: this.state.amount,
            subscription_type: this.state.subscription_type,
            subscription_cycle: this.state.subscription_cycle,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        };

        axios.post('/subscription/add', subscription)
            .then(res => {
                if (res.data) {
                    this.props.getSubscription();
                    this.setState({
                        amount: 0,
                        subscription_type: '',
                        subcription_cycle: '',
                        start_date: '',
                        end_date: ''
                    });
                }
            })
            .catch(err => console.log(err));
    };

    subscriptionCycle = () => {
        let days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'SATURDAY', 'SUNDAY'];
        let date = [...Array(31).keys()];

        switch (this.state.subscription_type) {
            case 'WEEKLY':
                return (
                    <select id="subscription_cycle" onChange={this.handleChange} className="form-control">
                        {days.map(day => { return <option key={day} value={day}>{day}</option> })}
                    </select>);

            case 'MONTHLY':
                return (
                    <select id="subscription_cycle" onChange={this.handleChange} className="form-control">
                        {date.map(d => { return <option key={d + 1} value={d + 1}>{d + 1}</option> })}
                    </select>);

            default:
                return null;
        }
    };

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Subscription</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="amount">Amount: </label>
                        <input type="text"
                            id="amount"
                            className="form-control"
                            value={this.state.amount}
                            onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subscription_type">Subscription type: </label>
                        <select id="subscription_type" onChange={this.handleChange} className="form-control">
                            <option value="DAILY">DAILY</option>
                            <option value="WEEKLY">WEEEKLY</option>
                            <option value="MONTHLY">MONTHLY</option>
                        </select>
                    </div>
                    {this.state.subscription_type && this.state.subscription_type !== 'DAILY' && (<div className="form-group">
                        <label htmlFor="subscription_cycle">Subscription cycle: </label>
                        {this.subscriptionCycle()}
                    </div>)}
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="start_date">Start date: </label>
                                <input type="date"
                                    id="start_date"
                                    className="form-control"
                                    value={this.state.start_date}
                                    onChange={this.handleChange} 
                                    onInput={this.setEndDate}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="end_date">End date: </label>
                                <input type="date"
                                    id="end_date"
                                    max={this.state.max_end_date}
                                    className="form-control"
                                    value={this.state.end_date}
                                    onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        )
    };

}

export default AddSubscription;