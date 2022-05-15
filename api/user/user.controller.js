const{
   // search,
    createUser,
    createBooking,
    getuserByuserEmail,
    getdetails,
    deleteuser
}=require("./user.service");
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const {sign}=require('jsonwebtoken');
module.exports={
    // search: (req, res) => {
    //     const body = req.body;
    //     search(body, (err, results) => {
    //       if (err) {
    //         console.log(err);
    //         return res.status(500).json({
    //           success: 0,
    //           message: "No flights",
    //         });
    //       }
    //       return res.status(200).json({
    //         success: 1,
    //         data: results,
    //       });
    //     });
    //   },
       createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        createUser(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Db connection error",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },
      createBooking: (req, res) => {
        const body = req.body;
        createBooking(body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Error Booking The Flight",
            });
          }
          return res.status(200).json({
            success: 1,
            data: results,
          });
        });
      },
      login: (req, res) => {
        const body = req.body;
        getuserByuserEmail(body.email, (err, results) => {
          if (err) {
            console.log(err);
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Invalid email or password",
            });
          }
          const result = compareSync(body.password, results.password);
          if (result) {
            results.password = undefined;
            const jsontoken = sign({ result: results }, "kazami123", {
              expiresIn: "1h",
            });
            return res.json({
              success: 1,
              message: "Login sucessful",
              token: jsontoken,
            });
          } else {
            return res.json({
              success: 0,
              message: "Invalid email or password",
            });
          }
        });
      },
      getdetails: (req, res) => {
        const body = req.body;
        getdetails(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "Record not found",
            });
          }
          return res.json({
            success: 1,
            data: results,
          });
        });
      },
      deleteuser: (req, res) => {
        const body = req.body;
        deleteuser(body, (err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          if (!results) {
            return res.json({
              success: 0,
              message: "record not found",
            });
          }
          return res.json({
            success: 1,
            message: "Ticket cancelled successfully",
          });
        });
      },

   
}