/*************************************************************
  Download latest Blynk library here:
    https://github.com/blynkkk/blynk-library/releases/latest

  Blynk is a platform with iOS and Android apps to control
  Arduino, Raspberry Pi and the likes over the Internet.
  You can easily build graphic interfaces for all your
  projects by simply dragging and dropping widgets.

    Downloads, docs, tutorials: http://www.blynk.cc
    Sketch generator:           http://examples.blynk.cc
    Blynk community:            http://community.blynk.cc
    Follow us:                  http://www.fb.com/blynkapp
                                http://twitter.com/blynk_app

  Blynk library is licensed under MIT license
  This example code is in public domain.

 *************************************************************

  This example shows how you can process commands from player widget

  App dashboard setup:
    Music Player widget attached to V5
 *************************************************************/

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial

/* Fill-in information from Blynk Device Info here */
//#define BLYNK_TEMPLATE_ID           "TMPxxxxxx"
//#define BLYNK_TEMPLATE_NAME         "Device"
//#define BLYNK_AUTH_TOKEN            "YourAuthToken"


#include <SPI.h>
#include <Ethernet.h>
#include <BlynkSimpleEthernet.h>

BLYNK_WRITE(V5)
{
  String action = param.asStr();

  if (action == "play") {
    // Do something
  }
  if (action == "stop") {
    // Do something
  }
  if (action == "next") {
    // Do something
  }
  if (action == "prev") {
    // Do something
  }

  Blynk.setProperty(V5, "label", action);
  Serial.print(action);
  Serial.println();
}

void setup()
{
  // Debug console
  Serial.begin(9600);

  Blynk.begin(BLYNK_AUTH_TOKEN);
}

void loop()
{
  Blynk.run();
}

