var express = require('express');
var router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "admin@123"
}

// Login user

router.post('/login', (req,res)=> {
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email; 
        res.redirect('/route/dashboard'); 
    } else {
        res.end('Invalid username or password');
    }
})

// router for dashboard

router.get('/dashboard', (req,res)=> {
    if(req.session.user){
        res.render('dashboard', {user:req.session.user});
    } else{
        res.end('Unauthorised user'); 
    }
})

//Route for logout 

router.get('/logout',(req, res) => {
    req.session.destroy(function (err) {
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.render('base', {logout: "Logged out Successfully!"})
        }
    })

})

module.exports = router;
