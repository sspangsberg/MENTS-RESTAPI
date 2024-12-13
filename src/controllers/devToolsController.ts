import {
  type Request,
  type Response
} from "express";

import cron from "node-cron";

const timeOutSeconds = 60 * 60 * 2;

const task = cron.schedule('* * * * *', () => {
  console.log('will execute every minute until stopped');
  
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
