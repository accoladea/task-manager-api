const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

// taskSchema.pre('save', async function(next) {

//     const task = this

//     if(task.isModified('completed')) {
//         if(task.completed) {
//             console.log('Great job!')
//             const date = require('date-and-time')
//             const now = new Date()
//             task.description = task.description + ' completed on ' + date.format(now, 'YYYY/MM/DD HH:mm:ss')
//         }
//     }

//     next()
// })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task