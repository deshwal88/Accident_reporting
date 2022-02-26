const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//-----------------------------creating mongo client---------------------------------
const uri = "mongodb+srv://admin:kanishk@cluster0.y9yu9.mongodb.net/monitor?retryWrites=true&w=majority";
const Mclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



//-----------------------------creating twilio client--------------------------------
const acc_sid = 'AC77a0dda12888e9eff1b864c7471bb654';
const auth_key = 'd1bd1963d95674fc6e54b97449fc959b';
const myNum = '+19106598015';
const Tclient = require('twilio')(acc_sid, auth_key)


//-------------------------------main function--------------------------------------
async function run(){

  //------------------connection to mongoDB database--------------------------------
  await Mclient.connect();
  const db = Mclient.db('monitor');
  const auth = db.collection('auth_db');
  const entries = db.collection('entries');
  const status = db.collection('status');
  var count = await entries.find().sort({'id':-1}).limit(1).toArray();
  count = count[0].id + 1;
  console.log('All clients connected to server!');


  //----------------------Api call starts from here---------------------------------
  app.get('/auth_db',(req,res)=>{
    auth.find().toArray((err,data)=>res.send(data))
  });

  app.get('/entries',(req,res)=>{
    entries.find().sort({'id':-1}).toArray((err,data)=>res.send(data))
  });

  app.get('/status',(req,res)=>{
    status.find().sort({'id':-1}).toArray((err,data)=>res.send(data))
  });



  //------------------------sending Confirmation message manually-------------------
  app.post('/change',async (req,res)=>{
    let reg = await entries.findOne({'id' : parseInt(req.body.id)});
    let ph = await auth.findOne({'regNo': reg.regNo});

    await Tclient.messages.create({body: 'Help has been sent. Click on the click in case you dont want help.',
                                   from: myNum,
                                   to: '+91'+ph.phNo});

    await status.findOneAndUpdate({'id': parseInt(req.body.id)},{$set:{'sent':req.body.sent}});
    res.send(JSON.stringify({'status':200}))
  });

  //------------------------receiving message response-------------------------------

  app.post('/response', async (req,res)=>{
    let id = await status.findOneAndUpdate({'id': parseInt(req.body.id)},{$set:{'received': req.body.received}});
    res.send(JSON.stringify({'status':200}))
  });


  //----------------------detecting changes in entry collection--------------------------
  app.get('/incoming',(req,res)=>{
    const headers = {"Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    "Access-Control-Allow-Origin": "*",
                  };

    res.writeHead(200, headers);


    // watching for updates in status collection
    status.watch().on('change', (data)=>{
      if (data['operationType']=='update'){
        res.write(`data: Update detected!\n\n`);
      }
    });

    // watching for insertions in entries collection 
    entries.watch().on('change',async (data)=>{
      if (data['operationType']=='insert'){
        let doc = data['fullDocument'];
        let check = await auth.findOne({'regNo':doc['regNo'], 'authKey':doc['authKey']});

        if(check!=undefined){
          await entries.findOneAndUpdate(doc,{$set:{'id':count}});
          await Tclient.messages.create({body: 'Help has been sent. Click on the click in case you dont want help.',
                                        from: myNum,
                                        to: '+91'+check['phNo'].toString()
                                      }).then(message => status.insertOne({'id':count++,'sent':1,'received': 'Yes','status':1}));

          res.write(`data:Update detected! \n\n`);
        }
        else entries.deleteOne(doc);
      };
    });
  });



}


run();
port = 3001;
app.listen(port,()=>console.log(`listening on port: ${port}`));
