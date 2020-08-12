const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Subscription = new Schema({
    amount: {
        type: Number
    },
    subscription_type: {
        type: String
    },
    subscription_cycle: {
        type: String
    },
    start_date: {
        type: String
    },
    end_date: {
        type: String
    }
});

module.exports = mongoose.model('Subscription', Subscription);