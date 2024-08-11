import express, { Request, Response } from "express";

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    let data = sumdata(12, 24);
    res.json({
        message: 'This is the about page',
        data: data
    })
})

const sumdata = (x: number,y: number) => {
    return x + y;
}


export default router;