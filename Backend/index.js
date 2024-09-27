const express = require("express");
const cors = require("cors");
const {generateFile} = require("./generateFile.js");
const { executeCpp } = require("./executeCpp.js");
const app = express();

app.use(cors());
app.use(express.json());   //middleware
app.use(express.urlencoded({ extended : true}));  //middleware

app.get("/", (req, res) =>{
    res.send("Hello, World!");
});

app.post("/run", async (req, res) => {
    const { language = "cpp", code } = req.body;
    if(code === undefined){
        return  res.status(400).json({ success: false, error: "Empty Code Body!"});
      }

    try {
        const filePath = generateFile(language, code);
        const output = await executeCpp(filePath)
        res.json({ filePath, output });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }

});

app.listen(8080, () => {
    console.log("Server is listening on port 8080!");
});