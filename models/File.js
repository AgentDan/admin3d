const mongoose = require('mongoose')
const { Types } = require('mongoose')

const mainfile = new mongoose.Schema({
    owner: {type: Types.ObjectId, ref: 'User' },
    file: {type: String}
})

module.exports = mongoose.model('File', mainfile)