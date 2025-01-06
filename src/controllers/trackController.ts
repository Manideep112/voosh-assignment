import { v4 as uuidv4 } from 'uuid';
import { response } from '../utils/response';
import { trackService } from '../services/trackService';
import { Track } from '../models/track';
import { col, literal, cast } from 'sequelize'
import { albumService } from '../services/albumService';
import { artistService } from '../services/artistService';
import { duration } from 'moment';
import { Album } from '../models/album';
import { Artist } from '../models/artist';

class TrackController {

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async addTrack(req, res) {
        try {
            console.log('addTrack has started');
            const payload = req.body;

            if (req.role !== 'Admin')
                return response.send(req, res, null, 'Forbidden Access', 403, null);

            const where: any = {
                album_id: payload.album_id,
                status: 1
            };

            const condition = {
                where,
                raw: true
            };

            const findAlbum = await albumService.findAlbum(condition);

            if(!(findAlbum && Object.keys(findAlbum)))
                return response.send(req, res, null, "Resource Doesn't Exist", 404  , null);

            delete where['album_id']
            where.artist_id = payload.artist_id;

            const findArtist = await artistService.findArtist(condition);

            if(!(findArtist && Object.keys(findArtist)))
                return response.send(req, res, null, "Resource Doesn't Exist", 404  , null);

            const data = {
                track_id: uuidv4(),
                album_id: payload.album_id,
                artist_id: payload.artist_id,
                name: payload.name,
                duration: payload.duration,
                hidden: payload.hidden,
                created_by: req.user_id
            };

            const createdTrack = await trackService.addTrack(data);
            console.log(createdTrack, 'createdTrack: response');

            if (!(createdTrack && Object.keys(createdTrack).length))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, null, "Track created successfully.", 201, null);
        } catch (err) {
            console.error('Exception in track controller :addTrack', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async findTrack(req, res) {
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

            if (req.params.track_id)
                where.track_id = req.params.track_id;

            if (req.params.album_id)
                where.album_id = req.params.album_id;

            const condtion = {
                attributes: [
                    "track_id", 
                    [col('Album.name'), 'album_name'], 
                    [col('Artist.name'), 'artist_name'], 
                    "name", 
                    "duration",
                    "hidden"
                    ],
                include: [{
                    attributes:[],
                    model: Album,
                    required: true,
                    where:{
                        status: 1
                    }  
                },{
                    attributes:[],
                    model: Artist,
                    required: true,
                    where:{
                        status: 1
                    }  
                }],
                where,
                limit,
                offset,
                raw: true
            };

            const findTracks: any = await trackService.findTracks(condtion);
            console.log(findTracks, 'findTracks: Response')

            if (!(findTracks && findTracks.length))
                return response.send(req, res, [], "Tracks retrieved successfully.", 200, null);

            if (req.params.track_id)
                return response.send(req, res, findTracks[0], "Track retrieved successfully.", 200, null);

            response.send(req, res, findTracks, "Tracks retrieved successfully.", 200, null);
        } catch (err) {
            console.error('Exception in track controller :findTrack', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async updateTrack(req, res) {
        try {
            console.log('updateTrack: has started')
            const payload = req.body;

            if (!req.params.track_id)
                return response.send(req, res, null, "Bad Request", 400, null);

            if (req.role === 'Viewer')
                return response.send(req, res, null, "Forbidden Access", 403, null);

            const condition = {
                where: {
                    track_id: req.params.track_id,
                    status: 1
                }
            };

            payload.modified_by = req.user_id;
            const updateTrack = await trackService.updateTrack(payload, condition);
            console.log(updateTrack, 'updateTrack:response');

            if (!(updateTrack && updateTrack[0] > 0))
                return response.send(req, res, null, "Resource Doesn't Exist", 404, null);

            response.send(req, res, null, 'Track Updated Successfully', 204, null);
        } catch (err) {
            console.error('Exception in track controller :updateTrack', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async deleteTrack(req, res) {
        try {
            if (req.role === 'Viewer')
                return response.send(req, res, null, "Forbidden Access", 403, null);

            if (!req.params.track_id)
                return response.send(req, res, null, "Bad Request", 400, null);

            const condition = {
                where: {
                    track_id: req.params.track_id,
                    status: 1
                },
                raw: true
            };

            const trackInfo: any = await trackService.findTrack(condition);

            if (!(trackInfo && Object.keys(trackInfo)))
                return response.send(req, res, null, "Resource Doesn't Exist", 404, null);

            const data = {
                modified_by: req.user_id,
                status: 0
            };

            const updateTrack = await trackService.updateTrack(data, condition);
            console.log(updateTrack, 'updateTrack:response');

            if (!(updateTrack && updateTrack[0] > 0))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, null, `Track: ${trackInfo.name} deleted successfully`, 200, null);
        } catch (err) {
            console.error('Exception in track controller :updateTrack', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }



}

export const trackController = new TrackController();
