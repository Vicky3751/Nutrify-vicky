require("dotenv").config();
const express = require("express")
const path  = require("path")
const app = express()
const hbs = require("hbs")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const auth = require("./middleware/auth")

require("./db/conn")
const Register = require("./models/registers")

const port = process.env.PORT || 3000


const static_path = path.join(__dirname, "../public")
const template_path = path.join(__dirname, "../templates/views")
const partial_path = path.join(__dirname, "../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use(express.static(static_path))

app.set("view engine", "hbs");
app.set("views", template_path)
hbs.registerPartials(partial_path)
 
app.get ("/", (req, res)=>{
    res.render("index")
})

app.get(("/register"), (req,res) =>{
    res.render("register")
})

app.get(("/login"), (req,res) =>{
    res.render("login")
})
app.get(("/secret"),auth, (req,res) =>{
    
    res.render("secret")
})
app.get(("/logout"),auth, async(req,res) =>{
    try {
        res.clearCookie("jwt")
        console.log("logged out");
        await req.user.save()
        res.render("login")
    } catch (error) {
        res.status(500).send(error)
    }
})



app.post("/register", async(req, res)=>{
    try {
       const password =req.body.password
       const confirmpassword= req.body.confirmpassword
        if (password === confirmpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstname,
                lastname: req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword
            })

            const token = await registerEmployee.generateAuthToken();
            console.log(token);

            res.cookie("jwt", token,{
                expires:new Date(Date.now()+30000),
                httpOnly:true
            })

            const registered = await registerEmployee.save()
            res.status(201).render("index");
        }else{
            res.send("Password are not matching")
        }

    } catch (error) {
        res.status(400).send(error)
    }
})


app.post("/login", async(req,res)=>{
    try {
        const email = req.body.loginemail
        const password = req.body.loginpassword

        const useremail = await Register.findOne({email:email});
        
        const isMatch = await bcrypt.compare(password, useremail.password)

        const token = await useremail.generateAuthToken();
        console.log(token);

        res.cookie("jwt", token,{
            expires:new Date(Date.now()+600000),
                httpOnly:true
        })

        



        if (isMatch){
            res.status(201).render("index")
        }else{
            res.send("password not matching")
        }

    } catch (error) {
        res.status(400).send("invalid email")
    }
})







app.listen(port , ()=>{
    console.log("Server started");
})