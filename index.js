const express = require('express');
const path=require('path')
const app=express();
const mongoose=require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views',path.join(__dirname,"views"));

// connect to the database

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/education_festival',{
  	useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

// making a schema
	const accountSchema = new mongoose.Schema({
	  name: String,
	  age:Number,
	  email:String,
	  user_name:Number,
	  password:String,
	  address:String,
	});

	// making a model
	const profile = mongoose.model('profile', accountSchema);

	const exam_paper_schema = new mongoose.Schema({
	  user_name: String,
	  q1:String,
	  q2:String,
	  q3:String,
	  q4:String,
	  q5:String,
	  q6:String,
	  q7:String,
	  q8:String,
	  q9:String,
	  q10:String
	});

	// making a model
	const exam_paper = mongoose.model('exam_paper', exam_paper_schema);


app.get("/",(req,res)=>{
	res.render("index.pug");
});

app.get("/Register",(req,res)=>{
	res.render("register.pug");
});

app.get("/Login",(req,res)=>{
	res.render("login.pug");
});

app.get("/Contact_us",(req,res)=>{
	res.render("contact.pug");
});

app.post("/contact",(req,res)=>{

	// making a schema
	const contact_details = new mongoose.Schema({
	  name: String,
	  email:String,
	  user_name:Number,
	  address:String,
	  desc:String
	});

	// making a model
	const contact = mongoose.model('contact', contact_details);

	const newContact = new contact({ name: req.body.name,
		email: req.body.email,
		user_name: req.body.user_name,
		address: req.body.address,
		desc:req.body.desc
	});

	newContact.save();
	res.render("success.pug",{"msg":"Contact informations sent succesfully", "btn_content":"Back to Register","href":"/Register"});
});



app.post("/register",(req,res)=>{
	profile.findOne({"user_name":req.body.user_name},"user_name",function(err,account){
		if(err){
			res.render("error.pug",{"msg":"Connection error. Please try to connect again", "btn_content":"Back to Register","href":"/Register"})
		}
		if(account==null){
			const newAccount = new profile({ 
		  	name: req.body.name,
		  	age:req.body.age,
		  	email:req.body.email,
		  	user_name:req.body.user_name,
		  	password:req.body.password,
		  	address:req.body.address,
		  	});

	newAccount.save();
	res.render("profile.pug",{"name":req.body.name,"user_name":req.body.user_name,"email":req.body.email,"age":req.body.age,"address":req.body.address})
		}else{
			res.render("error.pug",{"msg":"This User name already exist. Please try to choose a unique one", "btn_content":"Back to Register","href":"/Register"})
		}
	})
	
});

// app.get("/err",(req,res)=>{
// 	res.render("error.pug",{"msg":"This is an error page", "btn_content":"Back to Login","href":"/login"})
// })

app.post("/login",(req,res)=>{

	// console.log(req.body.user_name);
	let user_name=parseInt(req.body.user_name);
	let password=req.body.password;
	// console.log(user_name+1);
	let mainProfile={
		name:"",
		age:0,
		email:"",
		user_name:0,
		address:""
	}


	profile.findOne({ 'user_name': user_name},'name', function (err, profile1) {
  		if (err) return console.log(err);
  		if(profile1!=null){
  			mainProfile.name=profile1.name;

  			profile.findOne({ 'user_name': user_name},'password', function (err, profile2) {
  				if (err){
  					res.render("error.pug",{"msg":"Connection error. Please try to connect again", "btn_content":"Back to Login","href":"/Login"})
  				};
  				if(profile2.password==password){
					mainProfile.password=profile2.password;
					profile.findOne({ 'user_name': user_name},'age', function (err, profile3) {
  						if (err){
  							res.render("error.pug",{"msg":"Connection error. Please try to connect again", "btn_content":"Back to Login","href":"/Login"})
  						};
  					mainProfile.age=profile3.age;
  					});
  					profile.findOne({ 'user_name': user_name},'email', function (err, profile4) {
  						if (err){
  							res.render("error.pug",{"msg":"Connection error. Please try to connect again", "btn_content":"Back to Login","href":"/Login"})
  						};
  					mainProfile.email=profile4.email;
  					});
  					profile.findOne({ 'user_name': user_name},'address', function (err, profile5) {
  						if (err){
  							res.render("error.pug",{"msg":"Connection error. Please try to connect again", "btn_content":"Back to Login","href":"/Login"})
  						};
  					mainProfile.address=profile5.address;
  					});
  					profile.findOne({ 'user_name': user_name},'user_name', function (err, profile6) {
  						if (err){
  							res.render("error.pug",{"msg":"Connection error. Please try to connect again", "btn_content":"Back to Login","href":"/Login"})
  						};
  					mainProfile.user_name=profile6.user_name;
					res.render("profile.pug",mainProfile);
  					});
  				}
  				else{
  					res.render("error.pug",{"msg":"Invalid Login details. Please try again", "btn_content":"Back to Login","href":"/Login"})
  				}
  			});
  		}else{
  			res.render("error.pug",{"msg":"Invalid login details. Please try again", "btn_content":"Back to Login","href":"/Login"})
  		}
  	});

	

});

app.post("/answer",(req,res)=>{
	// console.log(req.body);
	// making a schema
	
	exam_paper.findOne({"user_name":req.body.user_name},"user_name",function(err,acc){
		if(err){
			res.render("error.pug",{"msg":"Connection error. Please try to connect again", "btn_content":"Back to Register","href":"/Register"}) 
		}
		if(acc==null){
			let new_ex_paper=new exam_paper({
				user_name: parseInt(req.body.user_name),
			    q1:req.body.q1,
			    q2:req.body.q2,
			    q3:req.body.q3,
			    q4:req.body.q4,
			    q5:req.body.q5,
			    q6:req.body.q6,
			    q7:req.body.q7,
			    q8:req.body.q8,
			    q9:req.body.q9,
			    q10:req.body.q10
			});
			new_ex_paper.save();
			res.render("success.pug",{"msg":"Question paper submited succesfully", "btn_content":"Back to Login","href":"/Login"});
		}else{
			res.render("error.pug",{"msg":"You can't submit your answer paper twice","btn_content":"Back to Login","href":"/Login"})
		}
	})
})
app.listen(process.env.PORT);