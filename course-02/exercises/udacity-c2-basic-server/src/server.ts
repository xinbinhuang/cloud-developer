import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

import { Car, cars as cars_list } from './cars';
import { filter } from 'bluebird';

(async () => {
  let cars: Array<Car> = cars_list;

  //Create an express applicaiton
  const app = express();
  //default port to listen
  const port = 8082;

  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json());

  // Root URI call
  app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the Cloud!");
  });

  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  app.get("/persons/:name",
    (req: Request, res: Response) => {
      let { name } = req.params;

      if (!name) {
        return res.status(400)
          .send(`name is required`);
      }

      return res.status(200)
        .send(`Welcome to the Cloud, ${name}!`);
    });

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  app.get("/persons/", (req: Request, res: Response) => {
    let { name } = req.query;

    if (!name) {
      return res.status(400)
        .send(`name is required`);
    }

    return res.status(200)
      .send(`Welcome to the Cloud, ${name}!`);
  });

  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  app.post("/persons",
    async (req: Request, res: Response) => {

      const { name } = req.body;

      if (!name) {
        return res.status(400)
          .send(`name is required`);
      }

      return res.status(200)
        .send(`Welcome to the Cloud, ${name}!`);
    });

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater
  app.get("/cars/", (req: Request, res: Response) => {
    const { make }: { make: string } = req.query

    let filtered_cars: Car[] = cars.filter(car => car.make === make)
    if (!make) {
      return res.status(400).send(`make is required`)
    } else {
      return res.status(200).send(filtered_cars)
    }
  })

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found
  app.get("/cars/:car_id", (req: Request, res: Response) => {
    const car_id: number = Number(req.params.car_id)

    if (!car_id) {
      return res.status(400).send(`id is required`);
    }

    let car: Car[] = cars.filter(car => car.id === car_id)
    if (car && car.length === 0) {
      return res.status(404).send(
        {
          status: "failed",
          msg: `id: ${car_id} does not match any cars`
        }
      )
    } else {
      return res.status(200).send(car)
    }
  })

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost
  app.post("/cars", async (req: Request, res: Response) => {

    const { id, type, make, model, cost } = req.body

    if (!id || !type || !make || !model || !cost) {
      return res.status(400).send(`make, type, model, cost, id are required`)
    }

    const new_car: Car = { id, type, make, model, cost }
    cars.push(new_car)
    return res.status(201).send({
      status: "succeeded",
      car: new_car
    })


  })

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();