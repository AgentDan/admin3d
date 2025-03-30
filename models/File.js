const mongoose = require('mongoose')
const { Types } = require('mongoose')

const mainfile = new mongoose.Schema({
    owner: {type: Types.ObjectId, ref: 'User' },
    file: {type: String, required: true},
    filePlan: {type: String, default: null}
})

module.exports = mongoose.model('File', mainfile)