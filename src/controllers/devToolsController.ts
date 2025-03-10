import {
    type Request,
    type Response
} from "express";

import cron from "node-cron";
import https from "https";

let durationMinutes = 120;
const MINUTES_DELTA = 5;
const cronPattern = "*/" + MINUTES_DELTA + " * * * *";
const URL = "https://ments-restapi.onrender.com/api/docs/";


/**
 * 
 */
const task = cron.schedule(cronPattern, () => {

    /**
   * 
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
