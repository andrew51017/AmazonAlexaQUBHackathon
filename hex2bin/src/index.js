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

const convertDigitToBinary = function(hex) {

    switch (hex.toUpperCase()) {
        case "0":
            return "zero ,zero ,zero ,zero ";
        case "1": 
            return "zero ,zero ,zero ,one "; 
        case "2": 
            return "zero ,zero ,one ,zero ";
        case "3": 
            return "zero ,zero ,one ,one ";
        case "4": 
            return "zero ,one ,zero ,zero ";
        case "5": 
            return "zero ,one ,zero ,one ";
        case "6": 
            return "zero ,one ,one ,zero ";
        case "7": 
            return "zero ,one ,one ,one ";
        case "8": 
            return "one ,zero ,zero ,zero ";
        case "9": 
            return "one ,zero ,zero ,one ";
        case "A": 
            return "one ,zero ,one ,zero ";
        case "B": 
            return "one ,zero ,one ,one ";
        case "C": 
            return "one ,one ,zero ,zero ";
        case "D": 
            return "one ,one ,zero ,one ";
        case "E": 
            return "one ,one ,one ,zero ";
        case "F": 
            return "one ,one ,one ,one ";
        default: 
            return ""; 
    }

}

const handlers = {
    "CaptureHexDigitIntent": function () {

        const readDigit = this.event.request.intent.slots.digit.value; 

        if (!readDigit) {
            this.emit(':ask', "Please try again.");
            return;
        }

        const binary = convertDigitToBinary(readDigit);

        if (!this.attributes["curBin"]) {
            this.attributes["curBin"] = " " + binary; 
        }
        else {
            this.attributes["curBin"] = this.attributes["curBin"] + ", " + binary;
        }

        if (!this.attributes["curInput"]) {
            this.attributes["curInput"] = readDigit; 
        }
        else {
            this.attributes["curInput"] = this.attributes["curInput"] + ", " + readDigit;
        }

        this.emit(':ask', readDigit, "I didn't catch that. Please repeat that.");
    },

    "CompleteCaptureIntent": function () {

        var storedInput = this.attributes['curInput'];

        this.attributes["canConfirm"] = true; 

        this.emit(':ask', 'Thank you. I think you said: ' + storedInput + ". Is that correct?");

    },
    "ConfirmInput": function () {

        if (!this.attributes["canConfirm"]) {
            this.emit(':ask', "you can't confirm yet. What's your next digit?");
            return;
        }

        this.attributes["canConfirm"] = false; 

        var bin = this.attributes["curBin"]; 

        var res = this.event.request.intent.slots.confirm.value;

        this.attributes["curBin"] = null; 
        this.attributes["curInput"] = null; 

        if (res == "yes") {
            this.emit(':tell', 'The binary number is: ' + bin);
            this.attributes["capturing"] = false; 
        }
        else {
            this.emit(':ask', 'Please start again!');   
        }

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

