class Responser {

    /**s
     * @param req 
     * @param res 
     * @param message 
     * @param status 
     */
    send(req, res, data, message, status = 200, error) {

        const resObject = {
            status: status,
            data: data,
            message: message,
            error: error
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.status(status).end(JSON.stringify(resObject));
    }

}

export const response = new Responser()