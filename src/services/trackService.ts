import Index from './index';
import { Track } from '../models/track';

class TrackService extends Index {

    async addTrack(data) {
        try {
            return this.create(Track, data);
        } catch (err) {
            console.error('Exception in track service :addTrack', err);
            return false;
        }
    }    

    async findTracks(condition) {
        try {
            return this.findAll(Track, condition);
        } catch (err) {
            console.error('Exception in track service :findTracks', err);
            return false;
        }
    }

    async findTrack(condition) {
        try {
            return this.findOne(Track, condition);
        } catch (err) {
            console.error('Exception in track service :findTracks', err);
            return false;
        }
    }

    async updateTrack(data, condition) {
        try {
            return this.update(Track, data, condition);
        } catch (err) {
            console.error('Exception in track service :findTracks', err);
            return false;
        }
    }

}

export const trackService = new TrackService();