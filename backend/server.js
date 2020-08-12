const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const subscriptonRoutes = express.Router();
const PORT = process.env.PORT || 4000;

let Subscription = require('./subscription.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/subscription', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

subscriptonRoutes.route('/').get(function(req, res) {
    Subscription.find(function(err, subscriptions) {
        if (err) {
            console.log(err);
        } else {
            res.json(subscriptions);
        }
    });
});

subscriptonRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, subscription) {
        res.json(subscription);
    });
});

subscriptonRoutes.route('/add').post(function(req, res) {
    let subscription = new Subscription(req.body);
    subscription.save()
        .then(() => {
            res.status(200).json({'subscription': 'subscription added successfully'});
        })
        .catch(err => {
            res.status(400).send(`adding new subscription failed ${err}`);
        });
});

app.use('/subscription', subscriptonRoutes);

app.listen(PORT, function() {
    console.log(`Server is running on Port: ${PORT}`);
});