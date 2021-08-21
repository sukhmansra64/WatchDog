const express = require('express');

const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    text:{
        type: String,
        required: true
    },
    lat:{
        type: String,
        required: true
    },
    lng:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model('marker', MarkerSchema);