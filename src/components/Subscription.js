import React, { Component } from 'react';
import axios from 'axios';

import AddSubscription from './AddSubscription';

class Subscription extends Component {

    state = {
        subscription: []
    }; 

    componentDidMount() {
        this.getSubscription();
    }

    getSubscription = () => {
        axios.get('/subscription')
            .then(res => {
                if (res.data) {
                    this.setState({
                        subscription: res.data
                    });
                }
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="container">
                <AddSubscription getSubscription={this.getSubscription}/>
                {this.state.subscription.map((sub, index) => (
                    <ul className="list-group mt-5" key={index}>
                        <li className="list-group-item">Amount: {sub.amount}</li>
                        <li className="list-group-item">Subscription type: {sub.subscription_type}</li>
                        <li className="list-group-item">Subscription cycle: {sub.subscription_cycle}</li>
                        <li className="list-group-item">Start date: {sub.start_date}</li>
                        <li className="list-group-item">End date: {sub.end_date}</li>
                    </ul>
                ))}
            </div>
        )
    };
}

export default Subscription;