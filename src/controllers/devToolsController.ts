import {
  type Request,
  type Response
} from "express";

import cron from "node-cron";
import https from "https";

let durationMinutes = 120;
const cronPattern = "*/5 * * * *";

/**
 * 
 */
const task = cron.schedule(cronPattern, () => {

  /**
   * 
   */
  https.get('https://ments-restapi.onrender.com/api/docs/', () => {
    console.log('Pinged the server');
    durationMinutes--;

    if (durationMinutes <= 0) {
      task.stop();
      console.log('Stopped the cron job due to inactivity');
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
