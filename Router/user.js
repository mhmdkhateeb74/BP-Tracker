const express = require('express');
const router = express.Router();


const user_Mid=require("../middleware/user_Mid");

router.get('/users',[user_Mid.ReadUsers], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",data:req.users_data});
    } else {
        return res.status(500).json({message:req.err});
    }

});

router.post('/users',[user_Mid.AddUser], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",data:req.insertId});
    } else {
        return res.status(500).json({message:req.err});
    }

});


router.put('/users',[user_Mid.UpdateUser], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message:req.err});
    }

});


router.delete('/users',[user_Mid.DeleteUser], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message:req.err});
    }

});


module.exports = router;
