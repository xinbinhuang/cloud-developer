import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  const app = express();
  const port = process.env.PORT || 8082;

  app.use(bodyParser.json());

  app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "try GET /filteredimage?image_url={{}}" })
  });
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file 
  app.get("/filteredimage", async (req: Request, res: Response, next: NextFunction) => {
    const image_url = req.query.image_url

    if (!image_url) {
      return res.status(400).json({
        error: "query param `image_url` is required."
      })
    }

    try {
      const filteredPath = await filterImageFromURL(image_url)
      res.sendFile(filteredPath, (err) => {
        if (err) { console.error(err) }
        deleteLocalFiles([filteredPath])
      })
    } catch (e) {
      next(e)
    }
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();