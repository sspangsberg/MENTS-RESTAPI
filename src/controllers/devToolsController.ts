import {
    type Request,
    type Response
} from "express";

import cron, { ScheduledTask } from "node-cron";
import https from "https";

// Settings
const MINUTES_DELTA = 1;
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
 * Stop and clear any scheduled tasks
 */
function cleanUpTasks() {
    // Clean up any existing tasks
    for (const task of cron.getTasks().values()) {
        task.stop();
    }
    cron.getTasks().clear();
}

/**
   * 
   * @param req 
   * @param res 
   */
export async function startCron(req: Request, res: Response) {

    try {
        cleanUpTasks();

        const cronPattern = "*/" + MINUTES_DELTA + " * * * *";
        // Docs here: https://crontab.guru/#*/5_*_*_*_*
        const totalDuration = parseInt(req.params.duration as string) || 60;

        //Initialize the task with the specified cronPattern
        counter = totalDuration; // set counter, so we can output how much time is left
        task = cron.schedule(cronPattern, pingServer, { scheduled: false });
        task.start();

        setTimeout(stopPingingServer, totalDuration * 60 * 1000);

        res.status(200).send("Started background task (duration:" + totalDuration + " mins)");

    } catch (error) {
        console.log("Error:" + error); // Debug info
        res.status(500).send(error);
    }
};
