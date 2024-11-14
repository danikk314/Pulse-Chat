let text = "";
let NewMsg = "";
let payload = "";
let ClientName = "";

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
   document.getElementById('connection').src = "wifi.png";
});

   client.subscribe('msg1', (err) => {
      if (err) {
         console.error('Abonnement-Fehler:', err);
      } else {
         console.log('Erfolgreich abonniert auf Topic: msg1');
      }
   });

client.on('error', (error) => {
   console.error('Verbindungsfehler:', error);
   document.getElementById('connection').src = "no-wifi.png";
});

client.on('disconnect', () => {
   console.log('Vom Broker getrennt');
   document.getElementById('connection').src = "no-wifi.png";
});

client.on('message', (topic, message) => {
   if (topic === 'msg1') { 
      console.log('Nachricht empfangen:', message.toString());
      NewMsg = message.toString();
      document.getElementById('msg10').innerText = document.getElementById('msg9').innerText;
      document.getElementById('msg9').innerText = document.getElementById('msg8').innerText;
      document.getElementById('msg8').innerText = document.getElementById('msg7').innerText;
      document.getElementById('msg7').innerText = document.getElementById('msg6').innerText;
      document.getElementById('msg6').innerText = document.getElementById('msg5').innerText;
      document.getElementById('msg5').innerText = document.getElementById('msg4').innerText;
      document.getElementById('msg4').innerText = document.getElementById('msg3').innerText;
      document.getElementById('msg3').innerText = document.getElementById('msg2').innerText;
      document.getElementById('msg2').innerText = document.getElementById('msg1').innerText;
      document.getElementById('msg1').innerText = NewMsg;

   }
});

function sendMessage() {
   text = document.getElementById('intext').value;
   ClientName = document.getElementById('name').value;
   if (ClientName === "") {ClientName = "Anonym";}

   document.getElementById('intext').value = "";

   payload = `${ClientName}: ${text}`;
   client.publish('msg1', payload); 
   console.log('Nachricht gesendet:', text);
}
