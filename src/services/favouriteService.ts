import Index from './index';
import { UserFavourities } from '../models/userFavourities';

class FavouriteService extends Index {

    async addFavourite(data) {
        try {
            return this.create(UserFavourities, data);
        } catch (err) {
            console.error('Exception in userFavourities service :addFavourite', err);
            return false;
        }
    }    

    async findFavourites(condition) {
        try {
            return this.findAll(UserFavourities, condition);
        } catch (err) {
            console.error('Exception in userFavourities service :findFavourites', err);
            return false;
        }
    }

    async findFavourite(condition) {
        try {
            return this.findOne(UserFavourities, condition);
        } catch (err) {
            console.error('Exception in userFavourities service :findFavourites', err);
            return false;
        }
    }

    async updateFavourite(data, condition) {
        try {
            return this.update(UserFavourities, data, condition);
        } catch (err) {
            console.error('Exception in userFavourities service :findFavourites', err);
            return false;
        }
    }

}

export const favouriteService = new FavouriteService();