// Base ESP8266
#include <ESP8266WiFi.h>
#define LED_STATUS 12
#define SENSOR 13


void setup() {
  Serial.begin(115200);

  pinMode(LED_STATUS, OUTPUT);
  pinMode(SENSOR, INPUT);
}

void loop() {
  long estado = digitalRead(SENSOR);
    if(estado == HIGH){
      digitalWrite(LED_STATUS, HIGH);
      Serial.println("Movimiento detectado");
      delay(1000);
    } else{
      digitalWrite(LED_STATUS, LOW);
      Serial.println("No hay movimiento");
    }
  Serial.println("Finalizando bucle");
}
