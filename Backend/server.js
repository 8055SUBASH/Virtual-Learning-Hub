import express from "express";
import cors from "cors";
import mysql from "mysql";
import http from "http";


const app = express();
const server = http.createServer(app);


app.use(cors({
    credentials: true,
    origin: "*"
}));

app.use(express.json({ limit: "100mb" }));


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vcentrydrive"
});




connection.connect((error) => {
    if (error) {
        throw error;
    }
    else {
        console.log("MYSQL Server has been connected");
    }
})

// ------------------------------admin-update-post------------------------------------------------------

app.post("/api/create/login", (request, response) => {
    const sql_query = `INSERT INTO vcentrydrive_admin_update (coursefield , name , password) VALUES ('${request.body.coursefield}', '${request.body.name}', '${request.body.password}')`;

    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("detail has been uploaded");
        }
    })
});


// ---------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/create/video - this method is used in video update frontend page
// Method : POST
app.post("/api/create/video", (request, response) => {


    const sql_query = `INSERT INTO vcentrydrive_video_update (coursename, coursefield, coursevideo, coursedetails)
  VALUES('${request.body.coursename}', '${request.body.coursefield}', '${request.body.coursevideo}', '${request.body.coursedetails}')`;
    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("Contact Form Sent");
        }
    })
})

// --------------------------------admin-update-GET-------------------------------



app.get("/api/list/login", (request, response) => {
    const sql_query = `SELECT * FROM vcentrydrive_admin_update `;
    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send(result);
        }
    })
});

// ---------------------------------------------------------------------------------------------------------
// http://localhost:5000/api/read/video - this method is used in video update frontend page
// Method : GET
app.get("/api/read/video", (request, response) => {
    const sql_query = `SELECT * FROM vcentrydrive_video_update`;
    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send(result);
        }
    })
})

// --------------------------------courses-API-Delete-------------------------------

app.delete("/api/delete/login/:id", (request, response) => {
    const sql_query = `DELETE FROM vcentrydrive_admin_update WHERE id=${request.params.id}`;
    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("Deleted Successfully");
        }
    })
});

//-----------------------------------------------------------------------------------------------------------
//URL - http://localhost:5000/api/delete/video
//Method : DELETE

app.delete("/api/delete/video/:id", (request, response) => {
    const sql_query = `DELETE FROM vcentrydrive_video_update WHERE id=${request.params.id}`;
    connection.query(sql_query, (error, result) => {
        if (error) {
            response.status(500).send(error);
        }
        else {
            response.status(200).send("Deleted successfully");
        }
    })
})



const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log("Server is Running");
})
