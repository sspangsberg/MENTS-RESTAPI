import {
    type Request,
    type Response
} from "express";

import cron, { ScheduledTask } from "node-cron";
import https from "https";

// Settings
const TOTAL_DURATION_MINUTES = 120; // Total "keep-remote-server-alive" duration 
const MINUTES_DELTA = 5; // How often should we ping the server
const cronPattern = "*/" + MINUTES_DELTA + " * * * *"; // Docs here: https://crontab.guru/#*/5_*_*_*_*
const URL = "https://ments-restapi.onrender.com/api/";
let counter = 0;
let task: ScheduledTask;

/**
 * Small helper function to ping the server and output to console.
 */
function pingServer() {

    https.get(URL, () => {
        counter -= MINUTES_DELTA;
        console.log('Pinged the server');
        console.log("Minutes Left: ", counter);
    });
}

/**
 * Small helper function to stop the task
 */
function stopPingingServer() {
    task.stop();
    console.log('Stopped the cron job due to inactivity');
}

/**
 * 
 * @param req 
 * @param res 
 */
export async function startCron(req: Request, res: Response) {

    try {

        //Initialize the task with the specified cronPattern
        counter = TOTAL_DURATION_MINUTES;
        task = cron.schedule(cronPattern, pingServer, { scheduled: false });
        task.start();

        setTimeout(stopPingingServer, TOTAL_DURATION_MINUTES * 60 * 1000);

        res.status(200).send("Started cron-job from active route call");
    } catch (error) {
        res.status(500).send({ message: error });
    }
};
