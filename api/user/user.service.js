const pool = require("../../config/database");
//const adminservice="http://127.0.0.2:3000/api/admin";
module.exports={
    // search:(data,callback)=>{
    //     pool.query(
    //         `SELECT flightid,airline,StartDateTime,EndDateTime,CostPerBuisnessClassSeat,CostPerNonBuisnessClassSeat FROM flightinventory where FromPlace=?&&ToPlace=?&&StartDateTime=?`,
    //         [data.FromPlace,
    //          data.ToPlace,
    //          data.StartDateTime
    //     ],
    //     (error, results, fields) => {
    //         if (error) {
    //           return callback(error);
    //         }
    //         return callback(null, results);
    //       }
    //     );
        

    // },
    createUser: (data, callback) => {
        pool.query(
          `INSERT INTO user(id,name,seats,detailsofpass,meal,seatnos,email, password)
                values(?,?,?,?,?,?,?,?)`,
          [
            data.id,
            data.name,
            data.seats,
            data.detailsofpass,
            data.meal,
            data.seatnos,
            data.email,
            data.password
          ],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },
      createBooking: (data, callback) => {
        const x=Math.floor(Math.random()*1000)+1;
        pool.query(
          `INSERT INTO pnrbooking(id,flightid,airline,name,detailsofpass,pnr,FromPlace,ToPlace,Start_Date,email,status)
                values(?,?,?,?,?,?,?,?,?,?,?)`,
          [
            data.id,
            data.flightid,
            data.airline,
            data.name,
            data.detailsofpass,
            data.pnr=x,
            data.FromPlace,
            data.ToPlace,
            data.Start_Date,
            data.email,
            data.status
          ],
          (error, results, fields) => {
            if (error) {
              return callback(error);
            }
            return callback(null, results);
          }
        );
      },
      getuserByuserEmail: (email, callBack) => {
        pool.query(
          `SELECT * FROM user WHERE email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
      },
      getdetails: (data,callBack) => {
        pool.query(
          `SELECT id,flightid,airline,name,detailsofpass,FromPlace,ToPlace,Start_Date,status from pnrbooking where pnr=?`,
          [data.pnr],
          (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },
    deleteuser: (data, callBack) => {
      pool.query(
        `update pnrbooking set status=? where email = ? and  (datediff(?,SYSDATE())>0000-00-01 ) `,
        [data.status,
          data.email,
        data.Start_Date],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    },


    }