import { v4 as uuidv4 } from 'uuid';
import { response } from '../utils/response';
import { favouriteService } from '../services/favouriteService';
import { UserFavourities } from '../models/userFavourities';
import { col, literal, cast } from 'sequelize'
import { albumService } from '../services/albumService';
import { artistService } from '../services/artistService';
import { duration } from 'moment';
import { Album } from '../models/album';
import { Artist } from '../models/artist';
import { trackService } from '../services/trackService';
import { Track } from '../models/track';

class FavouriteController {

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async addFavourite(req, res) {
        try {
            console.log('addFavourite has started');
            const payload = req.body;

            const where: any = {
                status: 1
            };

            const condition = {
                where,
                raw: true
            };

            let item_data: any = {}
            if (payload.category === 'artist') {
                where.artist_id = payload.item_id;
                item_data = await artistService.findArtist(condition);
            }

            if (payload.category === 'album') {
                where.album_id = payload.item_id;
                item_data = await albumService.findAlbum(condition);
            }

            if (payload.category === 'track') {
                where.track_id = payload.item_id;
                item_data = await trackService.findTrack(condition);
            }


            if(!(item_data && Object.keys(item_data)))
                return response.send(req, res, null, "Resource Doesn't Exist", 404  , null);

            const data = {
                favourite_id: uuidv4(),
                category: payload.category,
                name: item_data.name,
                item_id: payload.item_id,
                user_id: req.user_id,
                created_by: req.user_id
            };

            const createdFavourite = await favouriteService.addFavourite(data);
            console.log(createdFavourite, 'createdFavourite: response');

            if (!(createdFavourite && Object.keys(createdFavourite).length))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, null, "Favourite created successfully.", 201, null);
        } catch (err) {
            console.error('Exception in favourite controller :addFavourite', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    async findFavourite(req, res) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const offset = req.query.offset ? Number(req.query.offset) : 0;
            const where: any = {
                status: 1,
                user_id: req.user_id
            };

            if (req.params.category)
                where.category = req.params.category;

            const attributes: any = [
                "favourite_id", 
                "name", 
                "category",
                "item_id",
                'created_at'
            ];

            const condtion = {
                attributes,
                where,
                limit,
                offset,
                raw: true
            };

            const findFavourites: any = await favouriteService.findFavourites(condtion);
            console.log(findFavourites, 'findFavourites: Response')

            if (!(findFavourites && findFavourites.length))
                return response.send(req, res, [], "Favourites retrieved successfully.", 200, null);

            if (req.params.favourite_id)
                return response.send(req, res, findFavourites[0], "Favourite retrieved successfully.", 200, null);

            response.send(req, res, findFavourites, "Favourites retrieved successfully.", 200, null);
        } catch (err) {
            console.error('Exception in favourite controller :findFavourite', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     */
    async deleteFavourite(req, res) {
        try {
            if (!req.params.favorite_id)
                return response.send(req, res, null, "Bad Request", 400, null);

            const condition = {
                where: {
                    favourite_id: req.params.favorite_id,
                    status: 1
                },
                raw: true
            };

            const favouriteInfo: any = await favouriteService.findFavourite(condition);

            if (!(favouriteInfo && Object.keys(favouriteInfo)))
                return response.send(req, res, null, "Resource Doesn't Exist", 404, null);

            const data = {
                modified_by: req.user_id,
                status: 0
            };

            const updateFavourite = await favouriteService.updateFavourite(data, condition);
            console.log(updateFavourite, 'updateFavourite:response');

            if (!(updateFavourite && updateFavourite[0] > 0))
                return response.send(req, res, null, 'Operation-failed', 500, null);

            response.send(req, res, null, `Favorite removed successfully`, 200, null);
        } catch (err) {
            console.error('Exception in favourite controller :updateFavourite', err);
            response.send(req, res, null, 'SOMETHING-WENT-WRONG', 500, err);
        }
    }
}

export const favouriteController = new FavouriteController();
