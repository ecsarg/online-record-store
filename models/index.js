const Interest = require('./Interest');
const PostRecord = require('./PostRecord');
const User = require('./User');

//Associations
User.hasMany(PostRecord, {
    foreignKey: 'user_id'       // User can have many records
});

PostRecord.belongsTo(User, {
    foreignKey: 'user_id',      // A record belongs to a user
    onDelete: 'SET NULL'
});

Interest.belongsTo(User, {
    foreignKey: 'user_id',      // Comment of interest belongs to a user
    onDelete: 'SET NULL'
});

Interest.belongsTo(PostRecord, {
    foreignKey: 'post_id',      // Comment of interest belongs to a post record
    onDelete: 'SET NULL'
});

User.hasMany(Interest, {
    foreignKey: 'user_id',      // A user has many comments
    onDelete: 'SET NULL'
});

PostRecord.hasMany(Interest, {
    foreignKey: 'post_id'       // A post has many comments
});

module.exports = { User, PostRecord, Interest };