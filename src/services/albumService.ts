import Index from './index';
import { Album } from '../models/album';

class AlbumService extends Index {

    async addAlbum(data) {
        try {
            return this.create(Album, data);
        } catch (err) {
            console.error('Exception in album service :addAlbum', err);
            return false;
        }
    }    

    async findAlbums(condition) {
        try {
            return this.findAll(Album, condition);
        } catch (err) {
            console.error('Exception in album service :findAlbums', err);
            return false;
        }
    }

    async findAlbum(condition) {
        try {
            return this.findOne(Album, condition);
        } catch (err) {
            console.error('Exception in album service :findAlbums', err);
            return false;
        }
    }

    async updateAlbum(data, condition) {
        try {
            return this.update(Album, data, condition);
        } catch (err) {
            console.error('Exception in album service :findAlbums', err);
            return false;
        }
    }

}

export const albumService = new AlbumService();