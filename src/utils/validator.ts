import * as Joi from 'joi';
import { response } from './response'
import { log } from 'node:console';

class Validator {

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
    */
    loginUser = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {

                const schema = Joi.object().keys({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                    user_type: Joi.string().valid("manager", "buyer").required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, error.message, 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Invalid Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
    */
    signUpUser = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    password: Joi.string().required(),
                    email: Joi.string().required(),
                    role: Joi.string().valid('Admin', 'Editor', 'Viewer').optional()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    if (req.url === '/users/add-user')
                        return response.send(req, res, null, `Bad Request`, 400, null);

                    return response.send(req, res, null, `Bad Request, Reason: ${error.message}`, 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Invalid Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
    */
    addUser = async (req, res, next) => {
        try {
            const payload = req.payload;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    email: Joi.string().required(),
                    password: Joi.string().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, error.message, 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Invalid Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }

    /**
    * 
    * @param req 
    * @param res 
    * @param next 
    */
    userList = async (req, res, next) => {
        try {
            const payload = req.query;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    offset: Joi.number().min(0).optional(),
                    limit: Joi.number().min(1).optional(),
                    role: Joi.string().valid('Admin', 'Editor', 'Viewer').optional()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }

    /**
    * 
    * @param req 
    * @param res 
    * @param next 
    */
    deleteUser = async (req, res, next) => {
        try {
            const payload = req.params;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    user_id: Joi.string().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }

    /**
    * 
    * @param req 
    * @param res 
    * @param next 
    */
    updatePassword = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    old_password: Joi.string().required(),
                    new_password: Joi.string().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    addArtist = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    name: Joi.string().required(),
                    grammy: Joi.string().required(),
                    hidden: Joi.boolean().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 500, null);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    updateArtist = async (req, res, next) => {
        try {
            const payload = req.params;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    artist_id: Joi.string().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 500, null);
        }
    }

    addAlbum = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    artist_id: Joi.string().required(),
                    name: Joi.string().required(),
                    year: Joi.number().required(),
                    hidden: Joi.boolean().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 500, null);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    updateAlbum = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    name: Joi.string().optional(),
                    year: Joi.number().optional(),
                    hidden: Joi.boolean().optional()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    console.log(error)
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                console.log('payload', payload)
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            console.log('Error', err)
            return response.send(req, res, null, 'Something went wrong', 500, null);
        }
    }


    addTrack = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    artist_id: Joi.string().required(),
                    album_id: Joi.string().required(),
                    name: Joi.string().required(),
                    duration: Joi.number().required(),
                    hidden: Joi.boolean().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    console.log(error);
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                console.log('payload', payload)
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            console.log('Error', err)
            return response.send(req, res, null, 'Something went wrong', 500, null);
        }
    }

    /**
      * 
      * @param req 
      * @param res 
      * @param next 
      * @returns 
      */
    updateTrack = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    name: Joi.string().optional(),
                    duration: Joi.number().optional(),
                    hidden: Joi.boolean().optional()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    console.log(error)
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                console.log('payload', payload)
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            console.log('Error', err)
            return response.send(req, res, null, 'Something went wrong', 500, null);
        }
    }


    addFavourite = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    category: Joi.string().required(),
                    item_id: Joi.string().required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    console.log(error);
                    return response.send(req, res, null, 'Bad Request', 400, null);
                } else {
                    next()
                }
            } else {
                console.log('payload', payload)
                return response.send(req, res, null, 'Bad Request', 400, null);
            }
        } catch (err) {
            console.log('Error', err)
            return response.send(req, res, null, 'Something went wrong', 500, null);
        }
    }


    // /**
    //  * 
    //  * @param req 
    //  * @param res 
    //  * @param next 
    //  * @returns 
    //  */
    // findArtists = async (req, res, next) => {
    //     try {
    //         console.log('++++++++')
    //         const payload = req.params ? req.params : req.query;

    //         if (payload && Object.keys(payload).length) {
    //             const validation = {
    //                 limit: Joi.string().optional(),
    //                 offset: Joi.string().optional(),
    //                 grammy: Joi.string().optional(),
    //                 hidden: Joi.boolean().optional(),
    //                 artist_id: Joi.string().optional()
    //             }
    //             const schema = Joi.object().keys(validation)

    //             const { error } = await schema.validate(payload);

    //             if (error) {
    //                 console.log(error);

    //                 return response.send(req, res, null, 'Bad Request', 400, null);
    //             } else {
    //                 next()
    //             }
    //         } else {
    //             return response.send(req, res, null, 'Bad Request', 400, null);
    //         }
    //     } catch (err) {
    //         console.log(err)
    //         return response.send(req, res, null, 'Something went wrong', 400, null);
    //     }
    // }


    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    saveEquipments = async (req, res, next) => {
        try {
            const payload = req.body;

            if (payload && payload.attributes && Object.keys(payload.attributes).length) {
                const schema = Joi.object().keys({
                    supplier_details: Joi.object().keys({
                        name: Joi.string().min(3).trim().optional(),
                        phone_number: Joi.string().min(3).trim().required(),
                        address: Joi.string().min(3).trim().optional()
                    }),
                    equipments: Joi.array().items(
                        Joi.object().keys({
                            equipment_id: Joi.number().required(),
                            equipment_name: Joi.string().min(3).trim().required(),
                            description: Joi.string().min(3).trim().required(),
                            price_per_day: Joi.number().min(100).required(),
                            quantity: Joi.number().min(1).required(),
                        })
                    )
                })

                const { error } = await schema.validate(payload.attributes);

                if (error) {
                    return response.send(req, res, null, error.message, 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Invalid Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next 
     */
    findCustomer = async (req, res, next) => {
        try {
            const payload = req.query;

            if (payload && Object.keys(payload).length) {
                const schema = Joi.object().keys({
                    mobile_no: Joi.string().regex(/^[0-9]*$/).required()
                })

                const { error } = await schema.validate(payload);

                if (error) {
                    return response.send(req, res, null, error.message, 400, null);
                } else {
                    next()
                }
            } else {
                return response.send(req, res, null, 'Invalid Request', 400, null);
            }
        } catch (err) {
            return response.send(req, res, null, 'Something went wrong', 400, null);
        }
    }
}

export const validator = new Validator()