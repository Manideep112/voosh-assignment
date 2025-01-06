import { v4 as uuidv4 } from 'uuid';
import { response } from '../utils/response';
import { albumService } from '../services/albumService';
import { artistService } from '../services/artistService';
import { Artist } from '../models/artist';
import {col } from 'sequelize'

class AlbumController {

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async addAlbum(req, res) {
        try {
            console.log('addAlbum has started');
            const payload = req.body;

            if (req.role !== 'Admin')
                return response.send(req, res, null, 'Forbidden Access', 403, null);

            const artistCondition = {
                where: {
                    artist_id: payload.artist_id,
                    status: 1
                },
                raw: true
            };

            const findArtist = await artistService.findArtist(artistCondition);

            if(!(findArtist && Object.keys(findArtist)))
                return response.send(req, res, null, "Resource Doesn't Exist", 404  , null);

            const data = {
                album_id: uuidv4(),
                artist_id: payload.artist_id,
                name: payload.name,
                year: payload.year,
                hidden: payload.hidden,
                created_by: req.user_id
            };

            const createdAlbum = await albumService.addAlbum(data);
            console.log(createdAlbum, 'createdAlbum: response');

            if (!(createdAlbum && Object.keys(createdAlbum).length))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, null, "Album created successfully.", 201, null);
        } catch (err) {
            console.error('Exception in album controller :addAlbum', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async findAlbum(req, res) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const offset = req.query.offset ? Number(req.query.offset) : 0;
            const where: any = {
                status: 1,
            };

            if (req.query.hidden)
                where.hidden = req.query.hidden === 'true' ? 1 : 0;

            if (req.query.artist_id)
                where.artist_id = req.query.artist_id;

            if (req.params.album_id)
                where.album_id = req.params.album_id;

            const condtion = {
                attributes: ["album_id", [col('Artist.name'), 'artist_name'], "name", "year", "hidden"],
                include: [{
                    attributes:[],
                    model: Artist,
                    required: true,
                    where:{
                        status: 1
                    },
                    
                }],
                where,
                limit,
                offset,
                raw: true
            };

            const findAlbums: any = await albumService.findAlbums(condtion);
            console.log(findAlbums, 'findAlbums: Response')

            if (!(findAlbums && findAlbums.length))
                return response.send(req, res, [], "Albums retrieved successfully.", 200, null);

            if (req.params.album_id)
                return response.send(req, res, findAlbums[0], "Album retrieved successfully.", 200, null);

            response.send(req, res, findAlbums, "Albums retrieved successfully.", 200, null);
        } catch (err) {
            console.error('Exception in album controller :findAlbum', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async updateAlbum(req, res) {
        try {
            console.log('updateAlbum: has started')
            const payload = req.body;

            if (!req.params.album_id)
                return response.send(req, res, null, "Bad Request", 400, null);

            if (req.role === 'Viewer')
                return response.send(req, res, null, "Forbidden Access", 403, null);

            const condition = {
                where: {
                    album_id: req.params.album_id,
                    status: 1
                }
            };

            payload.modified_by = req.user_id;
            const updateAlbum = await albumService.updateAlbum(payload, condition);
            console.log(updateAlbum, 'updateAlbum:response');

            if (!(updateAlbum && updateAlbum[0] > 0))
                return response.send(req, res, null, "Resource Doesn't Exist", 404, null);

            response.send(req, res, null, 'Album Updated Successfully', 204, null);
        } catch (err) {
            console.error('Exception in album controller :updateAlbum', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async deleteAlbum(req, res) {
        try {
            if (req.role === 'Viewer')
                return response.send(req, res, null, "Forbidden Access", 403, null);

            if (!req.params.album_id)
                return response.send(req, res, null, "Bad Request", 400, null);

            const condition = {
                where: {
                    album_id: req.params.album_id,
                    status: 1
                },
                raw: true
            };

            const albumInfo: any = await albumService.findAlbum(condition);

            if (!(albumInfo && Object.keys(albumInfo)))
                return response.send(req, res, null, "Resource Doesn't Exist", 404, null);

            const data = {
                modified_by: req.user_id,
                status: 0
            };

            const updateAlbum = await albumService.updateAlbum(data, condition);
            console.log(updateAlbum, 'updateAlbum:response');

            if (!(updateAlbum && updateAlbum[0] > 0))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, null, `Album: ${albumInfo.name} deleted successfully`, 200, null);
        } catch (err) {
            console.error('Exception in album controller :updateAlbum', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }



}

export const albumController = new AlbumController();