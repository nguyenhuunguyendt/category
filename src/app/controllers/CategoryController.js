const { find, updateOne } = require('../models/Category')
const Category = require('../models/Category')
class CategoryController {
    async getAllProduct(req, res) {
        try {
            let listProduct = await Category.find({})
            return res.status(200).json({
                errCode: 0,
                errMessage: "Success",
                data: listProduct
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }
    async createNewProduct(req, res) {
        try {
            let fixReqBody = {
                ...req.bodyCategories
            }
            let listProduct = await Category.find({})
            if (Array.isArray(listProduct) && !listProduct.length > 0) {
                if (fixReqBody.idProduct) {
                    return res.status(400).json({
                        errCode: 2,
                        message: "userId not exists"
                    })
                }
                const product = new Category({ ...req.bodyCategories, position: 0 })
                await product.save()
                return res.status(200).json({
                    errCode: 0,
                    message: "Success!"
                })
            } else {
                if (fixReqBody.idProduct) {
                    let productItem = listProduct.find((item, index) => item.id === fixReqBody.idProduct)
                    if (productItem) {
                        let positionItemFound = productItem.position
                        let productFiltered = listProduct.filter((item) => item.position > positionItemFound)
                        if (Array.isArray(listProduct) && productFiltered.length > 0) {
                            productFiltered.map(async (item, index) => {
                                await Category.updateOne({
                                    _id: item.id
                                }, {
                                    position: item.position + 1
                                })
                            })
                            let product = new Category({
                                ...req.bodyCategories,
                                position: positionItemFound + 1
                            })
                            await product.save()

                            res.status(200).json({
                                errCode: 0,
                                errMessage: "ok"
                            })

                        } else {
                            const arrPosition = listProduct.map(item => {
                                return item.position;
                            });
                            let maxPosition = (Math.max(...arrPosition))
                            if (positionItemFound === maxPosition) {
                                let product = new Category({
                                    ...req.bodyCategories,
                                    position: maxPosition + 1
                                })
                                await product.save()
                                res.status(200).json({
                                    errCode: 0,
                                    errMessage: "ok"
                                })
                            } else {
                                res.status(200).json({
                                    errCode: 2,
                                    errMessage: "error"
                                })
                            }
                        }
                    } else {
                        res.status(400).json({
                            errCode: 2,
                            message: "userId not exists"
                        })
                    }
                } else {
                    const arrPosition = listProduct.map(item => {
                        return item.position;
                    });
                    let maxPosition = (Math.max(...arrPosition))
                    let product = new Category({
                        ...req.bodyCategories,
                        position: maxPosition + 1
                    })
                    await product.save()
                    res.status(400).json({
                        errCode: 0,
                        message: "Success!"
                    })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    async updateProduct(req, res) {
        try {
            let fixReqBody = {
                ...req.bodyCategories
            }
            if (fixReqBody.idProduct) {
                let resDataFind = await Category.findOne({ _id: fixReqBody.idProduct })
                if (resDataFind) {
                    let resData = await Category.findOneAndUpdate({ _id: fixReqBody.id }, {
                        position: resDataFind.position,
                        name: fixReqBody.name,
                        image: fixReqBody.image
                    })
                    if (resData) {
                        await Category.updateOne({ _id: fixReqBody.idProduct }, {
                            position: resData.position
                        })
                        return res.status(200).json({
                            errCode: 0,
                            message: "success"
                        })
                    }
                } else {
                    return res.status(400).json({
                        errCode: 2,
                        message: "id product not exist!"
                    })
                }

            } else {
                let data = await Category.findOneAndUpdate({ _id: fixReqBody.id }, {
                    name: fixReqBody.name,
                    image: fixReqBody.image
                })
                if (data) {
                    console.log(data)
                    res.status(200).json({
                        errCode: 0,
                        message: "Success!"
                    })
                } else {
                    console.log(data)
                    res.status(400).json({
                        errCode: 2,
                        message: "Fail!"
                    })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    async deleteProduct(req, res) {
        let listProduct = await Category.find({})

        try {
            let fixReqBody = {
                ...req.bodyCategories
            }
            let resData = await Category.findOneAndDelete({ _id: fixReqBody.id })
            if (resData) {
                let dataFilter = listProduct.filter((item => item.position > resData.position))
                if (Array.isArray(dataFilter) && dataFilter.length > 0) {
                    dataFilter.map(async (item, index) => {
                        await Category.updateOne({
                            _id: item.id
                        }, {
                            position: item.position - 1
                        })
                    })
                }
                res.status(200).json({
                    errCode: 0,
                    errMessage: "Success!"
                })
            } else {
                res.status(200).json({
                    errCode: 0,
                    errMessage: "id not exist"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                errCode: 1,
                errMessage: "Error from server!"
            })
        }
    }

    async sortProduc(req, res) {
        let data = await Category.find({}).sort({ "position": 1 })
        res.json({
            errCode: 0,
            errMessage: 'ok',
            data
        })
    }
}
module.exports = new CategoryController;
