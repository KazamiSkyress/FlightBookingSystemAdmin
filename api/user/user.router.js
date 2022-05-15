const{/*search*/createUser,createBooking,login,getdetails,deleteuser}=require("./user.controller");
const router = require("express").Router();
const{checkToken}=require("../../auth/token_validation");
const req1=require('request')
var http=require('http')
// router.post("/search" , search);
router.post("/createUser" , createUser);
router.post("/createBooking",createBooking);
router.post("/login",login);
router.get("/",getdetails);
router.patch("/",deleteuser)

router.post("/searchflight", (req,res)=> {
    req1.post({
        url: `http://127.0.0.2:3000/api/admin/search`,
        headers: {'content-type': 'application/json'},
        body: `{
            "busy": true
        }`
       
       
    },(err,searchResponse)=>{
    
        if(!err){
     res.status(200).json({
        success:1,
       data:searchResponse
    }
    )
}});
    
}
    
    
   );
//    router.post("/searchflight", (req,res)=> {
//        var url='http://127.0.0.2:3000/api/admin/search';
//        http.post(url,function(res){
//            var body='';

//            res.on('data',function(chunk){
//                body +=chunk;
//            })
//            res.on('end',function(){
//                var searchResponse=JSON.parse(body);
//                console.log("flight detail",searchResponse)
//            })
//        }).on('error',function(e){
//            console.log(e)
//        })
//    })


module.exports = router;