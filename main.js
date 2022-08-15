const njk = require('nunjucks'),
config = require('./config'),
fs = require('fs');

/*
fs.readdir('./dist/img/brand', function(err,res){
  if(err){return console.log(err)}
  console.log(JSON.stringify(res))
})
*/

njk.configure('views', { autoescape: true });




for (var i = 0; i < config.views.length; i++){

  let data = njk.render(config.views[i], config.data);

  fs.writeFileSync('./'+ config.views[i], data)

}
