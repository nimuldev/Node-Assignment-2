const http=require("http");
const fs=require("fs");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
    
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  
  const upload = multer({ storage: storage });



http.createServer(function(req,res){
    const path=req.url;

    if(path==="/"){
        res.end("This is Home Page")
    }

    else if(path==="/about"){
        res.end("This is About Page")
    }

    else if(path==="/contact"){
        res.end("This is Contact Page")
    }
    else if(path==="/file-write"){
        fs.writeFile('demo.text','hello world',function(err){
            if(err){
                res.end("File Writing Fail")
            }else{
              
                res.end("File Write Success")
            }
        });
    }

    else if(path==="/file-upload" && req.method === 'POST'){

        upload.single('file')(req, res, (err) => {
            if (err) {
              return res.end('Error uploading file.');
            }
          
            return res.end('File uploaded successfully.');
          });
        
        
    }
 
  


}).listen(5500,function(){
    console.log('it starts listening on port 5500.');
});