'use strict';

const redis = require("redis");
const Influx = require("influx");

// Constants
const INTERVAL = 1000; //in ms
const BANDWIDTH = 2 * 10485760; //in bps
// const REDIS_HOST = "docker.for.mac.localhost";
// const INFLUXDB_HOST = "docker.for.mac.localhost";
const INFLUXDB_HOST = "influxdb";

// Initialization
//redis
// let client  = redis.createClient("redis://" + REDIS_HOST + ":6379");
// client.on('connect', function() {
    // console.log('connected');
// });
//influx
const influx = new Influx.InfluxDB({
 host: INFLUXDB_HOST,
 database: 'mydash',
 schema: [
   {
     measurement: 'system_quality',
     fields: {
       inefficiency: Influx.FieldType.FLOAT,
       unfairness: Influx.FieldType.FLOAT,
       instability: Influx.FieldType.FLOAT,
       last_client: Influx.FieldType.STRING
     },
     tags: [
       'type'
     ]
   }
 ]
})

influx.createDatabase('mydash')

function execute(){

    let momento = Date.now() * 1000000;
    let range = momento - (12000 * 1000000); //define um período a considerar o players que estão rodando.
    let query = `select client, client_short, bitrate from client_quality where time >= ${range} order by time desc`

    let sessions = [];
    let lastclient = ""
    influx.query(query).then(result => {

      //create sessions array

      // let anterior = "";
      // for ( var i = 0; i < result.length; i++ ) {
      //   let idclient = result[i].client;
      //   if (idclient){
      //     if ( i == 0 ) lastclient = idclient;
      //     if ( idclient != anterior ) {
      //         sessions.push(result[i]);
      //         anterior = idclient;
      //     }
      //   }
      // }

      sessions = result.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.client === thing.client
        ))
      )

      if (sessions.length > 0){
        let ineff = inefficiency(sessions);
        console.log ("sessions: " + JSON.stringify(sessions));
        console.log ("ineff: " + ineff);
        // grava a metrica no momento atual.
        influx.writePoints([
          {
            measurement: 'system_quality',
            tags: { type: 'video'},
            fields: {inefficiency: ineff, unfairness: '0.5', instability: '0.4', last_client: lastclient.substring(0,4)},
            timestamp: momento
          }
        ]).catch(err => {
          console.error(`Error saving data to InfluxDB! ${err.stack}`)
        })
      }
    }).catch(err => {
      console.error(err.stack)
    })

   return 0;
}

function inefficiency(sessions){
  let soma = sessions.reduce( function( valorPrevio, elem ) {
                                  return valorPrevio + elem.bitrate;
                              }, 0 );
  console.log ("soma: " + soma);
  return (Math.abs(soma - BANDWIDTH)/BANDWIDTH);
}

setInterval(execute, INTERVAL);
