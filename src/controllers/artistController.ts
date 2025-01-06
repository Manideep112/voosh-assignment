import { v4 as uuidv4 } from 'uuid';
import { response } from '../utils/response';
import { artistService } from '../services/artistService';

class ArtistController {

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async addArtist(req, res) {
        try {
            console.log('addArtist has started');
            const payload = req.body;

            if (req.role !== 'Admin')
                return response.send(req, res, null, 'Forbidden Access', 403, null);

            const data = {
                artist_id: uuidv4(),
                name: payload.name,
                grammy: payload.grammy,
                hidden: payload.hidden,
                created_by: req.user_id
            };

            const createdArtist = await artistService.addArtist(data);
            console.log(createdArtist, 'createdArtist: response');

            if (!(createdArtist && Object.keys(createdArtist).length))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, null, "Artist created successfully.", 201, null);
        } catch (err) {
            console.error('Exception in artist controller :addArtist', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async findArtist(req, res) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const offset = req.query.offset ? Number(req.query.offset) : 0;
            const where: any = {
                status: 1
            };

            if (req.query.grammy)
                where.grammy = req.query.grammy;

            if (req.query.hidden)
                where.hidden = req.query.hidden === 'true' ? 1 : 0;

            if (req.params.artist_id)
                where.artist_id = req.params.artist_id;

            const condtion = {
                attributes: ["artist_id", "name", "grammy", "hidden"],
                where,
                limit,
                offset,
                raw: true
            };

            const findArtists: any = await artistService.findArtists(condtion);
            console.log(findArtists, 'findArtists: Response')

            if (!(findArtists && findArtists.length))
                return response.send(req, res, [], "Artists retrieved successfully.", 200, null);

            if (req.params.artist_id)
                return response.send(req, res, findArtists[0], "Artist retrieved successfully.", 200, null);

            response.send(req, res, findArtists, "Artists retrieved successfully.", 200, null);
        } catch (err) {
            console.error('Exception in artist controller :findArtist', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async updateArtist(req, res) {
        try {
            const payload = req.body;

            if(!(payload && Object.keys(payload).length))
                return response.send(req, res, null, "Bad Request", 400, null);

            if (req.role === 'Viewer')
                return response.send(req, res, null, "Forbidden Access", 403, null);

            const condition = {
                where:{
                    artist_id: req.params.artist_id,
                    status: 1
                }
            };

            payload.modified_by = req.user_id;
            const updateArtist = await artistService.updateArtist(payload, condition);
            console.log(updateArtist,'updateArtist:response');

            if (!(updateArtist && updateArtist[0] > 0))
                return response.send(req, res, null, 'Artist Not Found', 404, null);

            response.send(req, res, null, 'Artist updated successfully', 204, null);
        } catch (err) {
            console.error('Exception in artist controller :updateArtist', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async deleteArtist(req, res) {
        try {
            if (req.role === 'Viewer')
                return response.send(req, res, null, "Forbidden Access", 403, null);

            const condition = {
                where:{
                    artist_id: req.params.artist_id,
                    status: 1
                },
                raw:true
            };

            const artistInfo: any = await artistService.findArtist(condition);

            if(!(artistInfo && Object.keys(artistInfo)))
                return response.send(req, res, null, 'Artist Not Found', 404, null);

            const data = {
                modified_by : req.user_id,
                status: 0
            };

            const updateArtist = await artistService.updateArtist(data, condition);
            console.log(updateArtist,'updateArtist:response');

            if (!(updateArtist && updateArtist[0] > 0))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, { artist_id: artistInfo.artist_id }, `Artist: ${artistInfo.name} deleted successfully`, 200, null);
        } catch (err) {
            console.error('Exception in artist controller :updateArtist', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }



}

export const artistController = new ArtistController();