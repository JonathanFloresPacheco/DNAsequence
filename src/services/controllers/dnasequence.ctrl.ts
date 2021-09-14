import { envelope } from '../../helpers/envelope'
import { Handlers } from '../../helpers/handlers'
import DnaServices from '../services/dnasequence.service'
import { Request, Response } from 'express'

class Orders {

    //Dna sequence

    public async dnasequence(req: Request, res: Response) {
        const id_dnasequence = req.params.id_dnasequence;
        try {
            const response:any = await DnaServices.dnasequence();
            const resData = Handlers.dataHandler(response, 'GET')
            res.status(resData.code).json(envelope(resData.data));
        } catch (error) {
            const resError = Handlers.errorHandler({ error: error.message }, "BAD_REQUEST");
            res.status(resError.code).json(envelope(resError.data));
        }
    }  
    public async sendsequence (req: Request, res: Response) {
        try {
            const result: any = await DnaServices.senddnasequence(req.body)
            const resData = Handlers.dataHandler(result, result.resultMutation)
            res.status(resData.code).json(envelope(resData.data))
        } catch (e) {
            const resError = Handlers.errorHandler(e, 'BAD_REQUEST')
            res.status(resError.code).json(envelope(resError.data))
        }
    }

    public async token (req: Request, res: Response) {
        try {
            const result: any = await DnaServices.token(req.body)
            const resData = Handlers.dataHandler(result, 'GET')
            res.status(resData.code).json(envelope(resData.data))
        } catch (e) {
            const resError = Handlers.errorHandler(e, 'BAD_REQUEST')
            res.status(resError.code).json(envelope(resError.data))
        }
    }
}
export default new Orders()
