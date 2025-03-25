import {
    type Request,
    type Response
} from "express";

import cron from "node-cron";
import https from "https";

// Settings
let durationMinutes = 120; // Total "keep-remote-server-alive" duration 
const MINUTES_DELTA = 5; // How often should we ping the server
const cronPattern = "*/" + MINUTES_DELTA + " * * * *"; // Docs here: https://crontab.guru/#*/5_*_*_*_*
const URL = "https://ments-restapi.onrender.com/api/docs/";


/**
 * Initialize the task with the specified cronPattern
 */
const task = cron.schedule(cronPattern, () => {

    /**
   * Ping the server URL using a GET request. Stop if duration is 0 or less
   */
    https.get(URL, () => {
        console.log('Pinged the server');
        durationMinutes = durationMinutes - MINUTES_DELTA;
        console.log("Minutes Left: ", durationMinutes);

        if (durationMinutes <= 0) {
            task.stop();
            console.log('Stopped the cron job due to inactivity');
            durationMinutes = 120;
        }
    });
});

/**
 * 
 * @param req 
 * @param res 
 */
export async function startCron(req: Request, res: Response) {

    try {
        task.start();

        res.status(200).send("Started cron-job from active route call");
    } catch (error) {
        res.status(500).send({ message: error });
    }
};


/**
 * 
 * @param req 
 * @param res 
 */
export async function stopCron(req: Request, res: Response) {
    try {

        task.stop();

        res.status(200).send("Stopped the cron-job from active route call");
    } catch (error) {
        res.status(500).send({ message: error });
    }
};
