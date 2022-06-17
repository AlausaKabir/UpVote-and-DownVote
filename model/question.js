const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
    {
        grade: {
            type: String,
            required: [true, 'question must have a class']
        },
        category: {
            type: String,
            required: [true, 'question must have a category']
        },
        question: {
            type: String,
            require: [true, 'question must have a description']
        },
        vote: {
            type: Number,
            default: 0
        },
        voters: {
            type: [mongoose.Schema.Types.ObjectId],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'question must have a User id']
        },
        answers: [
            {
                answer: {
                    type: String
                },
                userId: {
                    type: mongoose.Schema.Types.ObjectId
                },
                vote: { 
                    type: Number,
                    default: 0
                },
            }
        ],
        time: {
            type: Date,
            default: Date.now
        },
    },
);

module.exports = mongoose.model('question', questionSchema);