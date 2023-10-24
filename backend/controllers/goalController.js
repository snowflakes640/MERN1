//const express = require("express")
const asyncHandler = require("express-async-handler")
const Goal = require("../model/goalModel")
const { model } = require("mongoose")

// @desc Get goal
// @route GET api/goals
// @access Private
const getGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.find()
    // if(!req.body.text){
    //     res.status(400)
    //     throw new Error("Please add text")
    // }
    res.status(200).json(goals)
})

const setGoals = asyncHandler(async(req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add text")
    }
    const goals = await Goal.create({text: req.body.text})
    res.status(200).json(goals)
})

// @desc Update goal
// @route PUT api/goals/:id
// @access Private
const updGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.findById(req.params.id)
    if(!goals){
        res.status(400)
        throw new Error("Goal not found")
    }
    const updGoals = await Goal.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updGoals)
})

const delGoals = asyncHandler(async(req,res) => {
    const goals = await Goal.findById(req.params.id)
    if(!goals){
        res.status(400)
        throw new Error("Goal not found")
    }
    const delGoals = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({"message": `Deleted goal ${req.params.id}`})
})

module.exports = {getGoals, setGoals, updGoals, delGoals}
