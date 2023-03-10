const request = require('request');
const cheerio = require('cheerio');

const sendData = (data, ws) =>{
    ws.send(JSON.stringify(data));
}

const getStores = (city, ws) => {
  var options = {
    url: 'https://www.ibon.com.tw/retail_inquiry_ajax.aspx',
    method: 'POST',
    form: {
      strTargetField: 'COUNTY',
      strKeyWords: city,
    }
  }
  request(options, (err, res, body) => {
    var $ = cheerio.load(body)
    var stores = $('tr').map((index, obj) => {
      return {
        id: $(obj).find('td').eq(0).text().trim(),
        store: $(obj).find('td').eq(1).text().trim(),
        address: $(obj).find('td').eq(2).text().trim(),
      }
    }).get()

    let a =[]
    stores.map((item, index)=>{
        if(index!=0){
            a[index-1] = {
                name: item.id+"\t"+item.store+"門市\t"+item.address,
                id: item.id}
        }
    })

    sendData(["GotStores", a], ws);
  })
}


export { getStores };


