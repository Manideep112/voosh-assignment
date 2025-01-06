import Index from './index';
import { Artist } from '../models/artist';

class ArtistService extends Index {

    async addArtist(data) {
        try {
            return this.create(Artist, data);
        } catch (err) {
            console.error('Exception in artist service :addArtist', err);
            return false;
        }
    }    

    async findArtists(condition) {
        try {
            return this.findAll(Artist, condition);
        } catch (err) {
            console.error('Exception in artist service :findArtists', err);
            return false;
        }
    }

    async findArtist(condition) {
        try {
            return this.findOne(Artist, condition);
        } catch (err) {
            console.error('Exception in artist service :findArtists', err);
            return false;
        }
    }

    async updateArtist(data, condition) {
        try {
            return this.update(Artist, data, condition);
        } catch (err) {
            console.error('Exception in artist service :findArtists', err);
            return false;
        }
    }

}

export const artistService = new ArtistService();