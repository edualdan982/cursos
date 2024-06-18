#define BLYNK_PRINT Serial

// Base ESP8266
#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <DHT.h>

#define LED 16
#define DHTPIN 4

#define BLYNK_TEMPLATE_ID "TMPLd-C71R-L"
#define BLYNK_DEVICE_NAME "proyecto330"
#define BLYNK_AUTH_TOKEN "FidCz_MCNxL42zE31J00kiKR4oBOWAUT"

//Definimos la variable dht
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);
BlynkTimer timer;

void sendSensor() {
  float h = dht.readHumidity();
  float t = dht.readTemperature();  // or
  dht.readTemperature(true);         //for Fahrenheit

    if (isnan(h) || isnan(t)) {
    Serial.println("Fallo al leer el sensor DHT!");
    return;
  }
  
  Serial.print("Temperature : ");
  Serial.print(t);
  Serial.print("    Humidity : ");
  Serial.println(h);

  Blynk.virtualWrite(V5, t);
  Blynk.virtualWrite(V6, h);



}
void setup() {
  Serial.begin(115200);
  
  // Configure LED pin as an output
  pinMode(LED, OUTPUT);

  Blynk.begin(BLYNK_AUTH_TOKEN, "Galaxy A51BE13", "Edualdan982", "blynk.cloud", 80);

  dht.begin();

  timer.setInterval(1000L, sendSensor);
}

void loop() {

  Blynk.run();
  timer.run();
}

BLYNK_WRITE(V0) {
  int pinValue = param.asInt();

  digitalWrite(LED, pinValue);
}
