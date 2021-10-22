const express = require('express');
const axios = require("axios");
const convert = require('xml-js');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.get('/index', (req, res) => {
    res.render('index',{
        title: '',
    });
})


app.get('/view', (req, res) => {

    const cargMtNo = req.query.cargMtNo;
    const blYy = req.query.blYy;
    const mblNo = req.query.mblNo;
    const hblNo = req.query.hblNo;


    let url = '';
    url = 'https://unipass.customs.go.kr:38010/';
    url = url + '/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo';
    url = url + '?crkyCn=m230z280b075e200q080q090l0';

    if (cargMtNo) {
        
        url = url + '&cargMtNo=' + cargMtNo //21ABSLE003I0005';
    } else if (blYy && (mblNo||hblNo)) {

        url = url +'&blYy='+blYy+'&mblNo='+mblNo+'&hblNo='+hblNo;
    } else {
 
    }

    axios.get(url)
    .then(data => {
        // console.log(data.data);

        let json = convert.xml2json(data.data, {compact:true,spaces:4});
        let jsonParse = JSON.parse( json );

        console.log(jsonParse);

        
        // res.json(jsonParse);

        res.render('view',{
            title: 'hello',
            data: jsonParse
        });
    })
    .catch(err => res.send(err));


})

app.get('/customs', (req, res) => {

    const cargMtNo = req.query.cargMtNo;
    const blYy = req.query.blYy;
    const mblNo = req.query.mblNo;
    const hblNo = req.query.hblNo;

    //http://localhost:3000/customs?cargMtNo=21ABSLE003I0005/
    //http://localhost:3000/customs?blYy=2021&mblNo=SCYESANPTK427946
    //http://localhost:3000/customs?blYy=2021&mblNo=SCYESANPTK427946&hblNo=OXH105883


    let url = '';
    url = 'https://unipass.customs.go.kr:38010/';
    url = url + '/ext/rest/cargCsclPrgsInfoQry/retrieveCargCsclPrgsInfo';
    url = url + '?crkyCn=m230z280b075e200q080q090l0';

    if (cargMtNo) {
        
        url = url + '&cargMtNo=' + cargMtNo //21ABSLE003I0005';
    }else if (blYy && mblNo) {

        // url = url +'&blYy='+blYy+'&mblNo='+mblNo;
        url = url +'&blYy='+blYy+'&mblNo='+mblNo+'&hblNo='+hblNo;
    } else {
        reson.send('error');
    }




    axios.get(url)
       .then(data => {
            // console.log(data.data);

            let json = convert.xml2json(data.data, {compact:true,spaces:4});
            let jsonParse = JSON.parse( json );

            console.log(jsonParse);

            
            res.json(jsonParse);
       })
       .catch(err => res.send(err));
});








app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});