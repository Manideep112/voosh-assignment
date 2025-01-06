import { Router } from "express";
import { middleware } from "./middleware";
import { response } from "../utils/response";
import { validator } from '../utils/validator';
import { userController } from "../controllers/userController";
import { artistController } from "../controllers/artistController";
import { albumController } from "../controllers/albumContoller";
import { trackController } from "../controllers/trackController";
import { favouriteController } from "../controllers/favouriteController";

class Endpoints {

    public router: Router;

    constructor() {
        this.router = Router()
    }

    configureRoutes(): Router {

        this.router.route('/signup')
            .post(validator.signUpUser, userController.signup)
            .all(middleware.methodNotAllowed);

        this.router.route('/login')
            .post(validator.signUpUser, userController.login)
            .all(middleware.methodNotAllowed);

        // validating token
        this.router.use(async (req: any, res: any, next) => {

            // Validating the authorization token
            const reqs: any = await middleware.validateToken(req, res);

            // sending error if no user_id in the request
            if (reqs && reqs.status && reqs.req.user_id) {
                next()
            } else {
                return response.send(req, res, null, reqs.message, 401, null);
            }
        });

        this.router.route('/users/add-user')
            .post(validator.signUpUser, userController.signup)
            .all(middleware.methodNotAllowed);

        this.router.route('/users')
            .get(validator.userList, userController.userList)
            .all(middleware.methodNotAllowed);

        this.router.route('/users/update-password')
            .put(validator.updatePassword, userController.changePassword)
            .all(middleware.methodNotAllowed);

        this.router.route('/users/:user_id')
            .delete(validator.deleteUser, userController.deleteUser)
            .all(middleware.methodNotAllowed);

        this.router.route('/artists/add-artist')
            .post(validator.addArtist, artistController.addArtist)
            .all(middleware.methodNotAllowed);

        this.router.route('/artists')
            .get(artistController.findArtist)
            .all(middleware.methodNotAllowed);

        this.router.route('/artists/:artist_id')
            .get(artistController.findArtist)
            .put(validator.updateArtist, artistController.updateArtist)
            .delete(validator.updateArtist, artistController.deleteArtist)
            .all(middleware.methodNotAllowed);

        this.router.route('/albums/add-album')
            .post(validator.addAlbum, albumController.addAlbum)
            .all(middleware.methodNotAllowed);

        this.router.route('/albums')
            .get(albumController.findAlbum)
            .all(middleware.methodNotAllowed);

        this.router.route('/albums/:album_id')
            .get(albumController.findAlbum)
            .put(validator.updateAlbum, albumController.updateAlbum)
            .delete(albumController.deleteAlbum)
            .all(middleware.methodNotAllowed);

        this.router.route('/tracks/add-track')
            .post(validator.addTrack, trackController.addTrack)
            .all(middleware.methodNotAllowed);

        this.router.route('/tracks')
            .get(trackController.findTrack)
            .all(middleware.methodNotAllowed);

        this.router.route('/tracks/:track_id')
            .get(trackController.findTrack)
            .put(validator.updateTrack, trackController.updateTrack)
            .delete(trackController.deleteTrack)
            .all(middleware.methodNotAllowed);

        this.router.route('/favorites/add-favorite')
            .post(validator.addFavourite,favouriteController.addFavourite)
            .all(middleware.methodNotAllowed);

        this.router.route('/favorites/:category')
            .get(favouriteController.findFavourite)
            .all(middleware.methodNotAllowed);

        this.router.route('/favorites/remove-favorite/:favorite_id')
            .delete(favouriteController.deleteFavourite)
            .all(middleware.methodNotAllowed);

        this.router.route('/logout')
            .get(userController.logout)
            .all(middleware.methodNotAllowed);

        return this.router;
    }
}

export const endpoints = new Endpoints()