import {
  type Request,
  type Response
} from "express";

import cron from "node-cron";
import https from "https";

const timeOutSeconds = 60 * 60 * 2;

const task = cron.schedule('*/5 * * * *', () => {

  https.get('https://ments-restapi.onrender.com/api/docs/', () => {
    console.log('Pinged the server');
  });


});

export async function startCron(req: Request, res: Response) {

  try {

    task.start();

    res.status(200).send("Started cron-job");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};


export async function stopCron(req: Request, res: Response) {
  try {

    task.stop();

    res.status(200).send("Stopped cron-job");
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
