import { UserFavourities } from './userFavourities';
import { User } from './user';
import * as lodash from 'lodash';
import { Track } from './track';
import { UserLogin } from './userLogin';
import { Artist } from './artist'
import { Album } from './album'

const models = {
    User,
    Artist,
    Album,
    Track,
    UserFavourities,
    UserLogin
}

export const allModels: any = []

lodash.each(models, (model) => {
    allModels.push(model)
})
