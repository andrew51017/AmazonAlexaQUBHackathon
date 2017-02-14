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
const request = require('sync-request');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    "CheckBuildStatusIntent": function () {

        var projInfoEndpoint = process.env.MY_PROJECTS; 

        console.log(projInfoEndpoint);

        var proj = request('GET', projInfoEndpoint, {
          'headers': {
            'JsonStub-User-Key': 'e39da125-9e4f-4586-bd89-954d4dfbcf49',
            'JsonStub-Project-Key': '696c71f1-623f-4c04-975f-5141b84e1604',
            'Content-Type': 'application/json'
          }
        });

        var projB = JSON.parse(proj.getBody());

        console.log("proj: " + projB);

        var data = null; 

        for (var i = 0; i < projB.projects.length; i++) {

            var item = projB.projects[i]; 

            var repoInfoUrl = "https://api.travis-ci.org/repos/" + item.repo;  

            var repoInfo = request('GET', repoInfoUrl);

            var repoInfoP = JSON.parse(repoInfo.getBody());

            var lastBuildId = repoInfoP.last_build_id; 

            var buildUrl = repoInfoUrl + "/builds/" + lastBuildId; 

            var buildStatus = JSON.parse(request('GET', buildUrl).getBody()).status; 

            var buildStatusDes = buildStatus == 1 ? "failed" : "passed";

            var parsedDate = new Date(repoInfoP.last_build_started_at);

            var repoDes = "The last build for " + repoInfoP.slug + " (build " + repoInfoP.last_build_number + ') started at <say-as interpret-as="date">' + parsedDate.toUTCString() + '</say-as>' + ". This build " + buildStatusDes + " after " + repoInfoP.last_build_duration + " seconds"; 
            
            if (!data) {
                data = repoDes; 
            }
            else 
            {
                data = data + ". " + repoDes;
            }

        }

        this.emit(':tell', data);


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

