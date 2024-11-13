let text = "";

document.getElementById('Indicator').style.backgroundColor = "yellow";

const options = {
   username: 'Daniel_Braun',  
   password: '31415926535Pi',
   clientId: 'mqtt_client_' + Math.random().toString(16).substr(2, 8), 
   clean: true               
};

const client = mqtt.connect('wss://xfa25392.ala.eu-central-1.emqxsl.com:8084/mqtt', options);

client.on('connect', () => {
   console.log('Mit dem MQTT-Broker verbunden');
   document.getElementById('Indicator').style.backgroundColor = "green";
});

function sendMessage() {
   text = document.getElementById('intext').value; 
   document.getElementById('intext').value = "";
}