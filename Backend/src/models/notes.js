const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Content is required'],
            trim: true
        },
        authorId: {
            type: String,
            ref: 'User',
            required: [true, 'Author ID is required']
        },
        tags: {
            type: [String],
            default: ["general"]
        },
        isPinned: {
            type: Boolean,
            default: false 
        },
        isArchived: {
            type: Boolean,
            default: false 
        },
        isDeleted: {
            type: Boolean,
            default: false 
        },
        color: {
            type: String,
            default: "#ffffff",
            validate: {
                validator: function (v) {
                    return /^#([0-9A-F]{3}){1,2}$/i.test(v);
                },
                message: props => `${props.value} is not a valid hex color!`
            }
        },
        attachments: {
            type: [String],
            default: []
        },
    },
    { timestamps: true } 
);

// Indexing for performance
noteSchema.index({ authorId: 1, isDeleted: 1 });

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
