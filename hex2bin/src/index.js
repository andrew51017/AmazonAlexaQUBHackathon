/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    "CaptureHexDigitIntent": function () {

        const readDigit = this.event.request.intent.slots.digit.value; 

        this.emit(':ask', "The parsed digit is " + readDigit);
    },

    "CompleteCaptureIntent": function () {
        this.emit(':tell', 'You are done.');
    },
    "StartCaptureIntent": function () {
        this.emit(':ask', 'Speak your digits one after the other.');
    },
    "Unhandled": function() {
        this.emit(':tell', 'I didn\'t quite catch that');
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

