const User = require('../models/User');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate('friends').populate('thoughts');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }    
        );  
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }   
        res.status(200).json(user); 
    }
    catch (err) {
      res.status(500).json(err);
    } 
  } , 
  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },  
  // add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      const friend = await User.findOneAndUpdate( 
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true }
      );
  
      if (!user || !friend) {
        return res.status(404).json(!user? { message: 'No user with this id!' }: { message: 'No friend with this id!'} );
      }
  
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a friend from a user's friend list
  async deleteFriend(req, res) {
    try {
      const user  = await User.findOneAndUpdate(  
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );  
      const friend = await User.findOneAndUpdate( 
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );  
      if (!user || !friend) {
        return res.status(404).json(!user? { message: 'No user with this id!' }: { message: 'No friend with this id!'} );
      } 
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

