let text = "";

document.getElementById('indicator').style.backgroundColor = "yellow";
console.log("Start");

const options = {
   username: 'Daniel_Braun',  
   password: '31415926535Pi',
   clientId: 'mqtt_client_' + Math.random().toString(16).substr(2, 8), 
   clean: true               
};

const client = mqtt.connect('wss://xfa25392.ala.eu-central-1.emqxsl.com:8084/mqtt', options);

client.on('connect', () => {
   console.log('Mit dem MQTT-Broker verbunden');
   document.getElementById('indicator').style.backgroundColor = "green";
});

   client.subscribe('msg1', (err) => {
      if (err) {
         console.error('Abonnement-Fehler:', err);
      } else {
         console.log('Erfolgreich abonniert auf Topic: msg1');
      }
   });
});

client.on('error', (error) => {
   console.error('Verbindungsfehler:', error);
   document.getElementById('indicator').style.backgroundColor = "red";
});

client.on('disconnect', () => {
   console.log('Vom Broker getrennt');
   document.getElementById('indicator').style.backgroundColor = "red";
});

client.on('message', (topic, message) => {
   if (topic === 'msg1') {  // Prüfen, ob das Topic mit "msg1" übereinstimmt
      console.log('Nachricht empfangen:', message.toString());
      document.getElementById('msg1').innerText = message.toString();
   }
});

function sendMessage() {
   text = document.getElementById('intext').value;
   document.getElementById('intext').value = "";
   client.publish('msg1', text); 
   console.log('Nachricht gesendet:', text);
}
