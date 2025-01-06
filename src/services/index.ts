class Index {

    /**
     * @param dataModel 
     * @param condition
     */
    find(dataModel, condition) {
        return new Promise((resolve, reject) => {
            return dataModel.findOne(condition)
                .then((data) => {
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }

    /**
     * 
     * @param model 
     * @param condition 
     */
    findAll(model, condition) {
        return new Promise((resolve, reject) => {
            return model.findAll(condition)
                .then((data) => {
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }

    /**
     * @param dataModel 
     * @param data
     */
    create(dataModel, data) {
        return new Promise((resolve, reject) => {
            return dataModel.create(data)
                .then((data) => {
                    return resolve(data)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }

    /**
     * Bulk insert data
     * @param  {} dataModel
     * @param  {} data
     */
    bulkInsert(dataModel, data) {
        return new Promise((resolve, reject) => {
            return dataModel.bulkCreate(data, { returning: true })
                .then((result) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }

    /**
     * 
     * @param dataModel 
     * @param conditon 
     */
    count(dataModel, conditon) {
        return new Promise((resolve, reject) => {
            return dataModel.count(conditon)
                .then((result) => {
                    return resolve(result)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }

    /**
    * 
    * @param dataModel 
    * @param data 
    */
    update(dataModel, data, condition) {
        return new Promise((resolve, reject) => {
            return dataModel.update(data, condition)
                .then((result) => {
                    return resolve(result)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }

    /**
    * 
    * @param dataModel 
    * @param data 
    */
    updateTransaction(dataModel, data, condition, transaction) {
        return new Promise((resolve, reject) => {
            return dataModel.update(data, condition, { transaction: transaction })
                .then((result) => {
                    return resolve(result)
                })
                .catch((err) => {
                    return reject(err)
                })
        })
    }

    /**
     * Find one
     * @param  {} dataModel
     * @param  {} condition
     */
    findOne(dataModel, condition) {
        return new Promise((resolve, reject) => {
            return dataModel.findOne(condition)
                .then((result: any) => {
                    return resolve(result);
                })
                .catch((err) => {
                    return reject(err);
                });
        });
    }
}

export default Index