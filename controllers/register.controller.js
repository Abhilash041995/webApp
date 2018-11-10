var Promise = require("bluebird");
var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var jwtDecode = require('jwt-decode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Register = require('../models/user.register');

exports.addUser= function (req, res) {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, function(err, hash){
       if(err) {
          return res.status(500).json({
             error: err
          });
       }
       else {
          const user = new Register({
            //  _id: new  mongoose.Types.ObjectId(),
             name: req.body.name,
             password: hash    
          });
          user.save().then(function(result) {
             console.log(result);
             res.status(200).json({
                success: 'New user has been created'
             });
          }).catch(error => {
             res.status(500).json({
                error: err
             });
          });
       }
    });
};

///////Login

exports.userLogin = function (req, res) {
    Register.findOne({name: req.body.name})
    .exec()
    .then(function(user) {
        console.log(user.password)
        
       bcrypt.compare(req.body.password, user.password, function(err, result){

          if(err) {
             return res.status(401).json({
                failed: 'Unauthorized Access'
             });
          }
          if(result) {
             const JWTToken = jwt.sign({
                name: user.name,
                _id: user._id
             },
             'secret',
                {
                   expiresIn: '20m'
                });
                const JWTRefreshToken = jwt.sign({
                    name: user.name,
                    _id: user._id
                 },
                 'secret',
                {
                   expiresIn: '30m'
                });
             return res.status(200).json({
                success: 'Login success',
                token: JWTToken,
                refreshToken: JWTRefreshToken
             });
          }
          return res.status(401).json({
             failed: 'Unauthorized Access'
          });
       });
    })
    .catch(error => {
       res.status(500).json({
          error: error
       });
    });;
    }

    /////to generate access token
    exports.Token= function (req, res) {
        var token = req.body.refreshToken;
        var decoded = jwtDecode(token);
         console.log(decoded.name);
        Register.findOne({name: req.body.name})
        .exec()
        .then(function(user) {
            console.log(user.name);
           
             if(user.name == decoded.name){
                const JWTToken = jwt.sign({
                    name: user.name,
                    _id: user._id
                 },
                 'secret',
                    {
                       expiresIn: '20m'
                    });
                    const JWTRefreshToken = jwt.sign({
                        name: user.name,
                        _id: user._id
                     },
                     'secret',
                    {
                       expiresIn: '30m'
                    });
                 return res.status(200).json({
                    success: 'Login success',
                    token: JWTToken,
                    refreshToken: JWTRefreshToken
                 });
             }
            
       
        })
        .catch(error => {
           res.status(500).json({
              error: error
           });
        });;
        }