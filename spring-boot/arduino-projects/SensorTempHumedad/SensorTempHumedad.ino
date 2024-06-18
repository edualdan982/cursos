#define BLYNK_PRINT Serial

// Base ESP8266
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <DHT.h>

#define LED 16
#define LRED 12
#define LGREEN 13
#define LBLUE 15
#define DHTPIN 14
#define PIR 4
#define PIR_OUT 5


#define BLYNK_TEMPLATE_ID "TMPLd-C71R-L"
#define BLYNK_DEVICE_NAME "proyecto330"
#define BLYNK_AUTH_TOKEN "FidCz_MCNxL42zE31J00kiKR4oBOWAUT"

//Definimos la variable dht
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

BlynkTimer timer;
void sendSensor() {
  // Leemos la humedad relativa
  float h = dht.readHumidity();
  // Leemos la temperatura en grados centígrados (por defecto)
  float t = dht.readTemperature();
  // Leemos la temperatura en grados Fahrenheit
  float f = dht.readTemperature(true);
 
  // Comprobamos si ha habido algún error en la lectura
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println("Error obteniendo los datos del sensor DHT11");
    return;
  }
  
  Serial.print("Temperature C: ");
  Serial.println(t);
  Serial.print("  Temperature F: ");
  Serial.print(f);
  Serial.print("  Humidity : ");
  Serial.println(h);

  Blynk.virtualWrite(V5, f);
  Blynk.virtualWrite(V6, h);

  if(digitalRead(PIR) == HIGH){
    digitalWrite(PIR_OUT, HIGH);
  }
  else{
    digitalWrite(PIR_OUT, LOW);
  }

}

void setup() {
  Serial.begin(115200);
  
  // Configure LED pin as an output
  pinMode(LED, OUTPUT);

  //Para el RGB
  pinMode(LRED, OUTPUT);
  pinMode(LGREEN, OUTPUT);
  pinMode(LBLUE, OUTPUT);

  pinMode(PIR, INPUT);
  pinMode(PIR_OUT, OUTPUT);

  Blynk.begin(BLYNK_AUTH_TOKEN, "Edual Dan", "LaClaveEs1234", "blynk.cloud", 80);

  dht.begin();

  timer.setInterval(1000L, sendSensor);
}

void loop() {

  Blynk.run();
  timer.run();  
 // Blynk.virtualWrite(V5, 12.2);
  //Blynk.virtualWrite(V6, 25.1);
}

BLYNK_WRITE(V0) {
  int pinValue = param.asInt();

  digitalWrite(LED, pinValue);
}
BLYNK_WRITE(V1) {
  int pinValue = param.asInt();

  digitalWrite(LRED, pinValue);
}
BLYNK_WRITE(V2) {
  int pinValue = param.asInt();

  digitalWrite(LGREEN, pinValue);
}
BLYNK_WRITE(V3) {
  int pinValue = param.asInt();

  digitalWrite(LBLUE, pinValue);
}