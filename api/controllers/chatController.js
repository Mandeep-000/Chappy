const User = require("../models/User")
const Message = require("../models/Message")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET;

async function getUserDataFromRequest(req) {
    return new Promise((resolve, reject) => {
      const token = req.cookies?.token;
      if (token) {
          jwt.verify(token, jwtSecret, {}, (err, userData) => {
              if (err) throw err;
          resolve(userData);
        });
      } else {
        reject('no token');
    }
});

}

const profile = (req,res) => {
    const token = req.cookies?.token;
    if (token) {
      jwt.verify(token, jwtSecret, {}, (err, userData) => {
        if (err) throw err;
        res.json(userData);
      });
    } else {
      res.status(401).json('no token');
    }
  };
  
const getMessages = async (req,res) => {
    const {userId} = req.params;
    const userData = await getUserDataFromRequest(req);
    const ourUserId = userData.userId;

    const messages = await Message.find({
      sender:{$in:[userId,ourUserId]},
      recipient:{$in:[userId,ourUserId]},
    }).sort({createdAt: 1});
    
    res.json(messages);
  };

const people = async (req,res) => {
    const users = await User.find({}, {'_id':1,username:1});
    res.json(users);
  };
  

module.exports = { people, profile, getMessages }