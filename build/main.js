/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/authentication/authentication.middleware.ts":
/*!*************************************************************!*\
  !*** ./src/app/authentication/authentication.middleware.ts ***!
  \*************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AuthenticationMiddleWare = void 0;\nconst user_model_1 = __webpack_require__(/*! ../user/user.model */ \"./src/app/user/user.model.ts\");\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst ENVConfig = __webpack_require__(/*! ../../config/development.json */ \"./src/config/development.json\");\nclass AuthenticationMiddleWare {\n    constructor() {\n        this.userModel = user_model_1.UserModel.getInstance();\n    }\n    authorizeAdmin(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                if (req.user.role !== 'admin') {\n                    const error = new Error('Access denied. Only admins are allowed.');\n                    error['statusCode'] = 403; // Forbidden\n                    throw error;\n                }\n                next();\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    authorizeUser(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                if (req.user.role !== 'user') {\n                    const error = new Error('Access denied. Only users are allowed.');\n                    error['statusCode'] = 403; // Forbidden\n                    throw error;\n                }\n                next();\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    authorization(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                let token;\n                if (!req.headers.authorization) {\n                    throw new Error(\"You are not logged in!\");\n                }\n                if (req.headers.authorization &&\n                    req.headers.authorization.startsWith(\"Bearer\")) {\n                    token = req.headers.authorization.split(\" \")[1];\n                }\n                if (!token) {\n                    throw new Error(\"You are not logged in!\");\n                }\n                const decoded = jsonwebtoken_1.default.verify(token, ENVConfig.JWT_SECRET_KEY);\n                const user = yield this.userModel.user.findOne({\n                    where: { id: decoded.id },\n                    attributes: { exclude: [\"password\"] },\n                });\n                if (!user) {\n                    throw new Error(\"The user belonging to this token does not exist\");\n                }\n                if (!user.token) {\n                    throw new Error(\"user is logged out!\");\n                }\n                req.user = user;\n                next();\n            }\n            catch (error) {\n                console.log(error);\n                return next(error);\n            }\n        });\n    }\n}\nexports.AuthenticationMiddleWare = AuthenticationMiddleWare;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/authentication/authentication.middleware.ts?");

/***/ }),

/***/ "./src/app/grocery_items/grocery_items.controller.ts":
/*!***********************************************************!*\
  !*** ./src/app/grocery_items/grocery_items.controller.ts ***!
  \***********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GroceryItemController = void 0;\nconst app_util_1 = __webpack_require__(/*! ../../utilities/app.util */ \"./src/utilities/app.util.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants/constants */ \"./src/constants/constants.ts\");\nconst grocery_items_service_1 = __webpack_require__(/*! ./grocery_items.service */ \"./src/app/grocery_items/grocery_items.service.ts\");\nclass GroceryItemController {\n    constructor() {\n        this.groceryItemService = new grocery_items_service_1.GroceryItemService();\n    }\n    createGroceryItems(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield this.groceryItemService.createGroceryItems(req.body);\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    getAllGroceryItems(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield this.groceryItemService.getAllGroceryItems();\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    updateGroceryItem(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const payload = req.body;\n                const data = yield this.groceryItemService.updateGroceryItem(+req.params.id, payload);\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, data);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    deleteGroceryItem(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const data = yield this.groceryItemService.deleteGroceryItem(+req.params.id);\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, data);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    getAvailableGroceryItem(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const data = yield this.groceryItemService.getAvailableGroceryItem();\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, data);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n}\nexports.GroceryItemController = GroceryItemController;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/grocery_items/grocery_items.controller.ts?");

/***/ }),

/***/ "./src/app/grocery_items/grocery_items.model.ts":
/*!******************************************************!*\
  !*** ./src/app/grocery_items/grocery_items.model.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GroceryItemModel = void 0;\nconst grocery_items_schema_1 = __webpack_require__(/*! ./grocery_items.schema */ \"./src/app/grocery_items/grocery_items.schema.ts\");\nclass GroceryItemModel {\n    static getInstance() {\n        if (!GroceryItemModel.instance) {\n            GroceryItemModel.instance = new GroceryItemModel();\n        }\n        return GroceryItemModel.instance;\n    }\n    initializeModel(sequelize) {\n        this.groceryItem = sequelize.define(\"tbl_grocery_items\", (0, grocery_items_schema_1.groceryItemsSchema)());\n    }\n    associatedModel() {\n    }\n}\nexports.GroceryItemModel = GroceryItemModel;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/grocery_items/grocery_items.model.ts?");

/***/ }),

/***/ "./src/app/grocery_items/grocery_items.routes.ts":
/*!*******************************************************!*\
  !*** ./src/app/grocery_items/grocery_items.routes.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GroceryItemRoutes = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst grocery_items_controller_1 = __webpack_require__(/*! ./grocery_items.controller */ \"./src/app/grocery_items/grocery_items.controller.ts\");\nconst authentication_middleware_1 = __webpack_require__(/*! ../authentication/authentication.middleware */ \"./src/app/authentication/authentication.middleware.ts\");\nclass GroceryItemRoutes {\n    constructor() {\n        this.router = (0, express_1.Router)();\n        this.groceryItemController = new grocery_items_controller_1.GroceryItemController();\n        this.authenticationMiddleware = new authentication_middleware_1.AuthenticationMiddleWare();\n        this.routes();\n    }\n    routes() {\n        this.router.post(\"/admin/grocery-items\", this.authenticationMiddleware.authorization.bind(this.authenticationMiddleware), this.authenticationMiddleware.authorizeAdmin.bind(this.authenticationMiddleware), this.groceryItemController.createGroceryItems.bind(this.groceryItemController));\n        this.router.get(\"/admin/grocery-items\", this.groceryItemController.getAllGroceryItems.bind(this.groceryItemController));\n        this.router.patch(\"/admin/grocery-items/:id\", this.groceryItemController.updateGroceryItem.bind(this.groceryItemController));\n        this.router.delete(\"/admin/grocery-items/:id\", this.groceryItemController.deleteGroceryItem.bind(this.groceryItemController));\n        this.router.get(\"/user/grocery-items/available\", this.groceryItemController.getAvailableGroceryItem.bind(this.groceryItemController));\n    }\n}\nexports.GroceryItemRoutes = GroceryItemRoutes;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/grocery_items/grocery_items.routes.ts?");

/***/ }),

/***/ "./src/app/grocery_items/grocery_items.schema.ts":
/*!*******************************************************!*\
  !*** ./src/app/grocery_items/grocery_items.schema.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.groceryItemsSchema = void 0;\nconst sequelize_1 = __webpack_require__(/*! sequelize */ \"sequelize\");\nconst groceryItemsSchema = () => {\n    return {\n        id: {\n            type: sequelize_1.DataTypes.INTEGER,\n            autoIncrement: true,\n            primaryKey: true,\n            field: \"id\"\n        },\n        name: {\n            type: sequelize_1.DataTypes.STRING,\n            allowNull: false,\n            field: \"name\"\n        },\n        inventory: {\n            type: sequelize_1.DataTypes.INTEGER,\n            allowNull: false,\n            defaultValue: 0,\n            field: \"inventory\"\n        },\n        price: {\n            type: sequelize_1.DataTypes.INTEGER,\n            field: \"price\"\n        }\n    };\n};\nexports.groceryItemsSchema = groceryItemsSchema;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/grocery_items/grocery_items.schema.ts?");

/***/ }),

/***/ "./src/app/grocery_items/grocery_items.service.ts":
/*!********************************************************!*\
  !*** ./src/app/grocery_items/grocery_items.service.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.GroceryItemService = void 0;\nconst databaseConnection_1 = __webpack_require__(/*! ../../connection/databaseConnection */ \"./src/connection/databaseConnection.ts\");\nconst grocery_items_model_1 = __webpack_require__(/*! ./grocery_items.model */ \"./src/app/grocery_items/grocery_items.model.ts\");\nconst sequelize_1 = __webpack_require__(/*! sequelize */ \"sequelize\");\nconst ENVConfig = __webpack_require__(/*! ../../config/development.json */ \"./src/config/development.json\");\nclass GroceryItemService {\n    constructor() {\n        this.groceryItemModel = grocery_items_model_1.GroceryItemModel.getInstance();\n        this.dbConnectionManager = databaseConnection_1.DatabaseConnectionManager.getInstance();\n    }\n    createGroceryItems(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const groceryItem = yield this.groceryItemModel.groceryItem.create(payload);\n            return groceryItem;\n        });\n    }\n    getAllGroceryItems() {\n        return __awaiter(this, void 0, void 0, function* () {\n            const groceryItem = yield this.groceryItemModel.groceryItem.findAll();\n            return groceryItem;\n        });\n    }\n    deleteGroceryItem(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const groceryItem = yield this.groceryItemModel.groceryItem.findByPk(id);\n            if (!groceryItem) {\n                throw new Error(\"Grocery item not found\");\n            }\n            yield groceryItem.destroy();\n            return { message: \"Grocery item deleted successfully\" };\n        });\n    }\n    updateGroceryItem(id, payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const groceryItem = yield this.groceryItemModel.groceryItem.findByPk(id);\n            if (!groceryItem) {\n                throw new Error(\"Grocery item not found\");\n            }\n            const updatedGroceryItem = yield groceryItem.update(payload);\n            return updatedGroceryItem;\n        });\n    }\n    getAvailableGroceryItem() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const availableItems = yield this.groceryItemModel.groceryItem.findAll({\n                    where: {\n                        inventory: {\n                            [sequelize_1.Op.gt]: 0,\n                        },\n                    },\n                });\n                return availableItems;\n            }\n            catch (error) {\n                console.error(error);\n                throw error;\n            }\n        });\n    }\n}\nexports.GroceryItemService = GroceryItemService;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/grocery_items/grocery_items.service.ts?");

/***/ }),

/***/ "./src/app/order_items/order_item.controller.ts":
/*!******************************************************!*\
  !*** ./src/app/order_items/order_item.controller.ts ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderItemController = void 0;\nconst app_util_1 = __webpack_require__(/*! ../../utilities/app.util */ \"./src/utilities/app.util.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants/constants */ \"./src/constants/constants.ts\");\nconst order_item_service_1 = __webpack_require__(/*! ./order_item.service */ \"./src/app/order_items/order_item.service.ts\");\nclass OrderItemController {\n    constructor() {\n        this.orderItemService = new order_item_service_1.OrderItemService();\n    }\n    orderGroceryItems(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const userId = 2;\n                const items = req.body.items;\n                if (!items || items.length === 0) {\n                    return res.status(400).json({ message: \"Items cannot be empty\" });\n                }\n                const result = yield this.orderItemService.orderGroceryItems(userId, items);\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, result);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n}\nexports.OrderItemController = OrderItemController;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/order_items/order_item.controller.ts?");

/***/ }),

/***/ "./src/app/order_items/order_item.model.ts":
/*!*************************************************!*\
  !*** ./src/app/order_items/order_item.model.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderItemsModel = void 0;\nconst order_itme_schema_1 = __webpack_require__(/*! ./order_itme.schema */ \"./src/app/order_items/order_itme.schema.ts\");\nclass OrderItemsModel {\n    static getInstance() {\n        if (!OrderItemsModel.instance) {\n            OrderItemsModel.instance = new OrderItemsModel();\n        }\n        return OrderItemsModel.instance;\n    }\n    initializeModel(sequelize) {\n        this.orderItems = sequelize.define(\"tbl_order_items\", (0, order_itme_schema_1.OrderItemsSchema)());\n    }\n    associatedModel() {\n    }\n}\nexports.OrderItemsModel = OrderItemsModel;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/order_items/order_item.model.ts?");

/***/ }),

/***/ "./src/app/order_items/order_item.routes.ts":
/*!**************************************************!*\
  !*** ./src/app/order_items/order_item.routes.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderItemRoutes = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst order_item_controller_1 = __webpack_require__(/*! ./order_item.controller */ \"./src/app/order_items/order_item.controller.ts\");\nclass OrderItemRoutes {\n    constructor() {\n        this.router = (0, express_1.Router)();\n        this.orderItemController = new order_item_controller_1.OrderItemController();\n        this.routes();\n    }\n    routes() {\n        this.router.post(\"/user/grocery-items/order\", this.orderItemController.orderGroceryItems.bind(this.orderItemController));\n    }\n}\nexports.OrderItemRoutes = OrderItemRoutes;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/order_items/order_item.routes.ts?");

/***/ }),

/***/ "./src/app/order_items/order_item.service.ts":
/*!***************************************************!*\
  !*** ./src/app/order_items/order_item.service.ts ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderItemService = void 0;\nconst databaseConnection_1 = __webpack_require__(/*! ../../connection/databaseConnection */ \"./src/connection/databaseConnection.ts\");\nconst grocery_items_model_1 = __webpack_require__(/*! ../grocery_items/grocery_items.model */ \"./src/app/grocery_items/grocery_items.model.ts\");\nconst order_model_1 = __webpack_require__(/*! ../orders/order.model */ \"./src/app/orders/order.model.ts\");\nconst order_item_model_1 = __webpack_require__(/*! ./order_item.model */ \"./src/app/order_items/order_item.model.ts\");\nconst ENVConfig = __webpack_require__(/*! ../../config/development.json */ \"./src/config/development.json\");\nclass OrderItemService {\n    constructor() {\n        this.groceryItemModel = grocery_items_model_1.GroceryItemModel.getInstance();\n        this.orderModel = order_model_1.OrderModel.getInstance();\n        this.orderItemModel = order_item_model_1.OrderItemsModel.getInstance();\n        this.dbConnectionManager = databaseConnection_1.DatabaseConnectionManager.getInstance();\n    }\n    orderGroceryItems(userId, items) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const transaction = yield this.dbConnectionManager.dbClient.transaction();\n            try {\n                // Calculate total price and validate inventory\n                let totalPrice = 0;\n                for (const item of items) {\n                    const groceryItem = yield this.groceryItemModel.groceryItem.findByPk(item.groceryItemId);\n                    if (!groceryItem) {\n                        throw new Error(`Grocery item with ID ${item.groceryItemId} not found`);\n                    }\n                    if (groceryItem.inventory < item.quantity) {\n                        throw new Error(`Insufficient inventory for item ${groceryItem.name}`);\n                    }\n                    totalPrice += groceryItem.price * item.quantity;\n                }\n                // Create an order\n                const order = yield this.orderModel.order.create({\n                    userId,\n                    status: \"Pending\",\n                    totalPrice\n                }, { transaction });\n                // Create order items and update inventory\n                for (const item of items) {\n                    yield this.orderItemModel.orderItems.create({\n                        orderId: order.id,\n                        groceryItemId: item.groceryItemId,\n                        quantity: item.quantity\n                    }, { transaction });\n                    // Update inventory\n                    const groceryItem = yield this.groceryItemModel.groceryItem.findByPk(item.groceryItemId);\n                    yield groceryItem.update({\n                        inventory: groceryItem.inventory - item.quantity\n                    }, { transaction });\n                }\n                yield transaction.commit();\n                return { orderId: order.id, status: \"Order placed successfully\" };\n            }\n            catch (error) {\n                yield transaction.rollback();\n                throw error;\n            }\n        });\n    }\n}\nexports.OrderItemService = OrderItemService;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/order_items/order_item.service.ts?");

/***/ }),

/***/ "./src/app/order_items/order_itme.schema.ts":
/*!**************************************************!*\
  !*** ./src/app/order_items/order_itme.schema.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderItemsSchema = void 0;\nconst sequelize_1 = __webpack_require__(/*! sequelize */ \"sequelize\");\nconst OrderItemsSchema = () => {\n    return {\n        id: {\n            type: sequelize_1.DataTypes.INTEGER,\n            autoIncrement: true,\n            primaryKey: true,\n            field: \"id\"\n        },\n        orderId: {\n            type: sequelize_1.DataTypes.INTEGER,\n            allowNull: false,\n            field: \"order_id\"\n        },\n        groceryItemId: {\n            type: sequelize_1.DataTypes.INTEGER,\n            allowNull: false,\n            field: \"grocery_item_id\"\n        },\n        quantity: {\n            type: sequelize_1.DataTypes.INTEGER,\n            field: \"quantity\"\n        }\n    };\n};\nexports.OrderItemsSchema = OrderItemsSchema;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/order_items/order_itme.schema.ts?");

/***/ }),

/***/ "./src/app/orders/order.model.ts":
/*!***************************************!*\
  !*** ./src/app/orders/order.model.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderModel = void 0;\nconst order_schema_1 = __webpack_require__(/*! ./order.schema */ \"./src/app/orders/order.schema.ts\");\nclass OrderModel {\n    static getInstance() {\n        if (!OrderModel.instance) {\n            OrderModel.instance = new OrderModel();\n        }\n        return OrderModel.instance;\n    }\n    initializeModel(sequelize) {\n        this.order = sequelize.define(\"tbl_orders\", (0, order_schema_1.OrderSchema)());\n    }\n    associatedModel() {\n    }\n}\nexports.OrderModel = OrderModel;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/orders/order.model.ts?");

/***/ }),

/***/ "./src/app/orders/order.schema.ts":
/*!****************************************!*\
  !*** ./src/app/orders/order.schema.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OrderSchema = void 0;\nconst sequelize_1 = __webpack_require__(/*! sequelize */ \"sequelize\");\nconst OrderSchema = () => {\n    return {\n        id: {\n            type: sequelize_1.DataTypes.INTEGER,\n            autoIncrement: true,\n            primaryKey: true,\n            field: \"id\"\n        },\n        userId: {\n            type: sequelize_1.DataTypes.INTEGER,\n            allowNull: false,\n            field: \"user_id\"\n        },\n        status: {\n            type: sequelize_1.DataTypes.STRING,\n            allowNull: false,\n            field: \"status\"\n        },\n        totalPrice: {\n            type: sequelize_1.DataTypes.INTEGER,\n            allowNull: true,\n            field: 'total_price'\n        }\n    };\n};\nexports.OrderSchema = OrderSchema;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/orders/order.schema.ts?");

/***/ }),

/***/ "./src/app/user/user.controller.ts":
/*!*****************************************!*\
  !*** ./src/app/user/user.controller.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserController = void 0;\nconst user_service_1 = __webpack_require__(/*! ./user.service */ \"./src/app/user/user.service.ts\");\nconst app_util_1 = __webpack_require__(/*! ../../utilities/app.util */ \"./src/utilities/app.util.ts\");\nconst constants_1 = __webpack_require__(/*! ../../constants/constants */ \"./src/constants/constants.ts\");\nclass UserController {\n    constructor() {\n        this.userService = new user_service_1.UserService();\n    }\n    createUser(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield this.userService.createUser(req.body);\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    login(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                console.log(req.body);\n                const user = yield this.userService.login(req.body.email, req.body.password);\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n    createAdmin(req, res, next) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield this.userService.createAdmin(req.body);\n                (0, app_util_1.handleResult)(res, constants_1.AppServerConstant.RESPONSE_CODE.OK, constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS, user);\n            }\n            catch (error) {\n                console.log(error);\n                error.statusCode = 400;\n                return next(error);\n            }\n        });\n    }\n}\nexports.UserController = UserController;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/user/user.controller.ts?");

/***/ }),

/***/ "./src/app/user/user.model.ts":
/*!************************************!*\
  !*** ./src/app/user/user.model.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserModel = void 0;\nconst user_schema_1 = __webpack_require__(/*! ./user.schema */ \"./src/app/user/user.schema.ts\");\nclass UserModel {\n    static getInstance() {\n        if (!UserModel.instance) {\n            UserModel.instance = new UserModel();\n        }\n        return UserModel.instance;\n    }\n    initializeModel(sequelize) {\n        this.user = sequelize.define(\"tbl_user\", (0, user_schema_1.UserSchema)());\n    }\n    associatedModel() {\n    }\n}\nexports.UserModel = UserModel;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/user/user.model.ts?");

/***/ }),

/***/ "./src/app/user/user.routes.ts":
/*!*************************************!*\
  !*** ./src/app/user/user.routes.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserRoutes = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst user_controller_1 = __webpack_require__(/*! ./user.controller */ \"./src/app/user/user.controller.ts\");\nclass UserRoutes {\n    constructor() {\n        this.router = (0, express_1.Router)();\n        this.userController = new user_controller_1.UserController();\n        this.routes();\n    }\n    routes() {\n        this.router.post(\"/users/register\", this.userController.createUser.bind(this.userController));\n        this.router.post(\"/user/login\", this.userController.login.bind(this.userController));\n        this.router.post(\"/admin/register\", this.userController.createAdmin.bind(this.userController));\n    }\n}\nexports.UserRoutes = UserRoutes;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/user/user.routes.ts?");

/***/ }),

/***/ "./src/app/user/user.schema.ts":
/*!*************************************!*\
  !*** ./src/app/user/user.schema.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserSchema = void 0;\nconst sequelize_1 = __webpack_require__(/*! sequelize */ \"sequelize\");\nconst bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ \"bcryptjs\"));\nconst UserSchema = () => {\n    return {\n        id: {\n            type: sequelize_1.DataTypes.INTEGER,\n            autoIncrement: true,\n            primaryKey: true,\n            field: \"id\"\n        },\n        firstName: {\n            type: sequelize_1.DataTypes.STRING,\n            allowNull: false,\n            field: \"first_name\"\n        },\n        lastName: {\n            type: sequelize_1.DataTypes.STRING,\n            allowNull: false,\n            field: \"last_name\"\n        },\n        email: {\n            type: sequelize_1.DataTypes.STRING,\n            allowNull: false,\n            field: \"email\"\n        },\n        password: {\n            type: sequelize_1.DataTypes.STRING,\n            allowNull: false,\n            field: \"password\",\n            set(value) {\n                let hashedPassword = bcryptjs_1.default.hashSync(value, 10);\n                this.setDataValue('password', hashedPassword);\n            }\n        },\n        role: {\n            type: sequelize_1.DataTypes.INTEGER,\n            allowNull: false,\n            field: \"role\"\n        },\n        token: {\n            type: sequelize_1.DataTypes.STRING,\n            allowNull: true,\n            field: \"token\"\n        }\n    };\n};\nexports.UserSchema = UserSchema;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/user/user.schema.ts?");

/***/ }),

/***/ "./src/app/user/user.service.ts":
/*!**************************************!*\
  !*** ./src/app/user/user.service.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UserService = void 0;\nconst user_model_1 = __webpack_require__(/*! ./user.model */ \"./src/app/user/user.model.ts\");\nconst databaseConnection_1 = __webpack_require__(/*! ../../connection/databaseConnection */ \"./src/connection/databaseConnection.ts\");\nconst bcryptjs_1 = __importDefault(__webpack_require__(/*! bcryptjs */ \"bcryptjs\"));\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst grocery_items_model_1 = __webpack_require__(/*! ../grocery_items/grocery_items.model */ \"./src/app/grocery_items/grocery_items.model.ts\");\nconst ENVConfig = __webpack_require__(/*! ../../config/development.json */ \"./src/config/development.json\");\nclass UserService {\n    constructor() {\n        this.userModel = user_model_1.UserModel.getInstance();\n        this.groceryItemModel = grocery_items_model_1.GroceryItemModel.getInstance();\n        this.dbConnectionManager = databaseConnection_1.DatabaseConnectionManager.getInstance();\n    }\n    createUser(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield this.userModel.user.create(payload);\n                return user;\n            }\n            catch (error) {\n                console.log(error);\n                throw error;\n            }\n        });\n    }\n    signToken(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return jsonwebtoken_1.default.sign({ id: id }, ENVConfig.JWT_SECRET_KEY);\n        });\n    }\n    login(email, password) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                let result = null;\n                const userData = yield this.dbConnectionManager.dbClient.transaction((t) => __awaiter(this, void 0, void 0, function* () {\n                    const user = yield yield this.userModel.user.findOne({\n                        raw: true,\n                        where: { email },\n                        transaction: t,\n                    });\n                    return user;\n                }));\n                if (!userData || !bcryptjs_1.default.compareSync(password, userData.password)) {\n                    throw new Error(\"wrong user id or password\");\n                }\n                else {\n                    const token = yield this.signToken(userData.id);\n                    const updateUserData = yield this.dbConnectionManager.dbClient.transaction((t) => __awaiter(this, void 0, void 0, function* () {\n                        const updateUser = yield this.userModel.user.update({ token: token }, { where: { id: userData.id }, transaction: t });\n                        return updateUser;\n                    }));\n                    const updatedUser = yield this.userModel.user.findOne({\n                        where: { email }\n                    });\n                    result = updatedUser;\n                }\n                return result;\n            }\n            catch (error) {\n                error.statusCode = 400;\n                console.log(error);\n                throw error;\n            }\n        });\n    }\n    createAdmin(payload) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const user = yield this.userModel.user.create(payload);\n                return user;\n            }\n            catch (error) {\n                console.log(error);\n                throw error;\n            }\n        });\n    }\n}\nexports.UserService = UserService;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/app/user/user.service.ts?");

/***/ }),

/***/ "./src/connection/databaseConnection.ts":
/*!**********************************************!*\
  !*** ./src/connection/databaseConnection.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DatabaseConnectionManager = void 0;\n// DB Connection Manager\nconst sequelize_1 = __webpack_require__(/*! sequelize */ \"sequelize\");\nconst log_1 = __webpack_require__(/*! ../utilities/log */ \"./src/utilities/log.ts\");\nconst constants_1 = __webpack_require__(/*! ../constants/constants */ \"./src/constants/constants.ts\");\nconst models_1 = __webpack_require__(/*! ./models */ \"./src/connection/models.ts\");\nconst ENVConfig = __webpack_require__(/*! ../config/development.json */ \"./src/config/development.json\");\nclass DatabaseConnectionManager {\n    /**\n     *Creates an instance of DatabaseConnectionManager.\n     * @memberof DatabaseConnectionManager\n     */\n    constructor() {\n        /**\n         * @private\n         * @memberof BuzzDBConnectionManager\n         */\n        this.checkConnection = (delayTime) => {\n            return new Promise((resolve) => {\n                setTimeout(() => {\n                    this.dbClient\n                        .authenticate()\n                        .then(() => {\n                        log_1.logger.info(constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS_CONNECTION_TEXT);\n                        resolve(true);\n                    })\n                        .catch(err => {\n                        log_1.logger.error('Error: %s', err.message);\n                        resolve(false);\n                    });\n                }, delayTime);\n            });\n        };\n        this.modelLoader = models_1.ModelLoader.getInstance();\n    }\n    /**\n     * The static method that controls the access to the singleton instance.\n     */\n    static getInstance() {\n        if (!DatabaseConnectionManager.instance) {\n            DatabaseConnectionManager.instance = new DatabaseConnectionManager();\n        }\n        return DatabaseConnectionManager.instance;\n    }\n    /**\n     * @memberof DatabaseConnectionManager\n     */\n    initializeConnection(databaseConfig) {\n        return __awaiter(this, void 0, void 0, function* () {\n            this.databaseConfig = databaseConfig;\n            try {\n                this.dbClient = new sequelize_1.Sequelize(this.databaseConfig.DATABASE, this.databaseConfig.USER, this.databaseConfig.PASSWORD, {\n                    host: this.databaseConfig.HOST,\n                    dialect: 'mysql',\n                    define: {\n                        timestamps: false,\n                        freezeTableName: true\n                    },\n                });\n                yield this.checkAttemptsCompletionError();\n                this.modelLoader.initializeModels(this.dbClient);\n                this.modelLoader.associateModels();\n            }\n            catch (error) {\n                log_1.logger.error(`${constants_1.AppServerConstant.ERROR_MESSAGES.ERROR_DB_CONNECTION} - %o`, error);\n                throw new Error(`${constants_1.AppServerConstant.ERROR_MESSAGES.ERROR_DB_CONNECTION} - ${error.message}`);\n            }\n        });\n    }\n    closeConnection() {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.dbClient.close();\n        });\n    }\n    /**\n     * @private\n     * @returns {Promise<void>}\n     * @memberof BuzzDBConnectionManager\n     */\n    checkAttemptsCompletionError() {\n        return __awaiter(this, void 0, void 0, function* () {\n            let attempts = 1;\n            let success = yield this.checkConnection(0);\n            while (success !== true && attempts < this.databaseConfig.RETRY_ATTEMPTS) {\n                attempts++;\n                success = yield this.checkConnection(this.databaseConfig.RETRY_TIME);\n                log_1.logger.info('attempt number %s', attempts);\n            }\n            if (!success) {\n                throw new Error(constants_1.AppServerConstant.ERROR_MESSAGES.ERROR_DB_CONNECTION);\n            }\n        });\n    }\n}\nexports.DatabaseConnectionManager = DatabaseConnectionManager;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/connection/databaseConnection.ts?");

/***/ }),

/***/ "./src/connection/models.ts":
/*!**********************************!*\
  !*** ./src/connection/models.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ModelLoader = void 0;\nconst constants_1 = __webpack_require__(/*! ../constants/constants */ \"./src/constants/constants.ts\");\nconst log_1 = __webpack_require__(/*! ../utilities/log */ \"./src/utilities/log.ts\");\nconst user_model_1 = __webpack_require__(/*! ../app/user/user.model */ \"./src/app/user/user.model.ts\");\nconst order_model_1 = __webpack_require__(/*! ../app/orders/order.model */ \"./src/app/orders/order.model.ts\");\nconst order_item_model_1 = __webpack_require__(/*! ../app/order_items/order_item.model */ \"./src/app/order_items/order_item.model.ts\");\nconst grocery_items_model_1 = __webpack_require__(/*! ../app/grocery_items/grocery_items.model */ \"./src/app/grocery_items/grocery_items.model.ts\");\nclass ModelLoader {\n    constructor() {\n        this.userModel = user_model_1.UserModel.getInstance();\n        this.ordersModel = order_model_1.OrderModel.getInstance();\n        this.orderItemsModel = order_item_model_1.OrderItemsModel.getInstance();\n        this.groceryItemsModel = grocery_items_model_1.GroceryItemModel.getInstance();\n    }\n    static getInstance() {\n        if (!ModelLoader.instance) {\n            ModelLoader.instance = new ModelLoader();\n        }\n        return ModelLoader.instance;\n    }\n    initializeModels(sequelize) {\n        try {\n            this.userModel.initializeModel(sequelize);\n            this.ordersModel.initializeModel(sequelize);\n            this.orderItemsModel.initializeModel(sequelize);\n            this.groceryItemsModel.initializeModel(sequelize);\n        }\n        catch (error) {\n            log_1.logger.error(`${constants_1.AppServerConstant.ERROR_MESSAGES.DB_MODELS_INIT_FAILED} - ${error.message}`);\n            console.log(error);\n        }\n    }\n    associateModels() {\n        try {\n            this.userModel.associatedModel();\n            this.ordersModel.associatedModel();\n            this.orderItemsModel.associatedModel();\n            this.groceryItemsModel.associatedModel();\n        }\n        catch (error) {\n            log_1.logger.error(`${constants_1.AppServerConstant.ERROR_MESSAGES.DB_MODELS_ASSOCIATION_FAILED} - ${error.message}`);\n            console.log(error);\n        }\n    }\n}\nexports.ModelLoader = ModelLoader;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/connection/models.ts?");

/***/ }),

/***/ "./src/constants/constants.ts":
/*!************************************!*\
  !*** ./src/constants/constants.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AppServerConstant = void 0;\n/** Server constants to be defined here */\nclass AppServerConstant {\n}\nexports.AppServerConstant = AppServerConstant;\nAppServerConstant.CORS = {\n    ACCESS_CONTROL_ALLOW_ORIGIN: 'Access-Control-Allow-Origin',\n    ACCESS_CONTROL_ALLOW_METHODS: 'Access-Control-Allow-Methods',\n    ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers',\n    CONTENT_TYPE: 'Content-Type',\n    APPLICATION_JSON: 'application/json',\n    ALL_METHODS: 'GET,HEAD,OPTIONS,POST,PUT',\n    ALL_HEADERS: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',\n    TEXT_HTML: 'text/html',\n    ALL: '*'\n};\nAppServerConstant.PORT = 'port';\nAppServerConstant.LISTENING_TEXT = 'listening';\nAppServerConstant.APP_SERVER = '';\nAppServerConstant.ERROR_MESSAGES = {\n    ERROR_TEXT: 'error',\n    FAILED: 'FAILED',\n    LOG_ERROR: 'Error :',\n    ERROR: 'ERROR :',\n    ERROR_CONNECTION_CODE: 'ECONNREFUSED',\n    ERROR_CONNECTION_TEXT: 'The server refused the connection',\n    ERROR_DB_CONNECTION: 'Unable to connect to the database',\n    DB_MODELS_INIT_FAILED: 'Database models initialization failed',\n    DB_MODELS_ASSOCIATION_FAILED: 'Database models association failed',\n    ERROR_DB_CONNECTION_EXCEPTION: 'Error occurred while connecting to database server',\n    ERROR_SERVER_RESOURCES_CONNECTION_FAILURE: 'Error while connecting to server resources',\n    INVALID_MOBILE_NUMBER: 'Invalid mobile number!',\n    INVALID_CREDENTIALS: 'Invalid mobile number OR password!',\n    INVALID_PARAMETERS: 'Invalid parameters.',\n    ALREADY: 'This batch is already created.',\n    SOMETHING_WENT_WRONG: 'Something went wrong.',\n};\nAppServerConstant.SUCCESS_MESSAGES = {\n    SUCCESS: 'SUCCESS',\n    UPDATE: 'UPDATE',\n    SUCCESS_CONNECTION_TEXT: 'Connection successful',\n    RABBIT_CONNECTION: 'RabbitMQ connection established successfully',\n    RABBIT_CHANNEL_CREATE: 'RabbitMQ channel created successfully',\n    REDIS_CONNECTION_SUCCESSFUL: 'Redis connection established successfully',\n    ALL_ARTICLE_SYNCED_SUCCESS: 'All articles synced in redis cache successfully.',\n    READY_TEXT: 'ready',\n    UPDATED_SUCCESS: 'Updated successfully.',\n    CREATED_SUCCESS: 'Batch is created successfully.',\n    EXPENSE_SUCCESS: 'Expense Added Successfully.',\n    EXPENSE_UPDATE: 'Expense Updated Successfully.',\n    CHANGE_PASSWORD: 'PLEASE CHANGE YOUR PASSWORD.',\n    PASSWORD_CHANGED: 'PASSWORD CHANGED'\n};\nAppServerConstant.RESPONSE_CODE = {\n    OK: 200,\n    CREATED: 201,\n    BAD_REQUEST: 400, // generic client-side error\n    UNAUTHORIZED: 401, // req for protected resource without proper authorization\n    FORBIDDEN: 403, // req valid but not have necessary permissions\n    NOT_FOUND: 404, // requested resource is invalid OR server don't wanna reveal why req is refused\n    INTERNAL_SERVER_ERROR: 500, //generic REST API error response for any exception\n};\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/constants/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n/** main index file for starting the server */\nconst http = __importStar(__webpack_require__(/*! http */ \"http\"));\nconst constants_1 = __webpack_require__(/*! ./constants/constants */ \"./src/constants/constants.ts\");\nconst log_1 = __webpack_require__(/*! ./utilities/log */ \"./src/utilities/log.ts\");\nconst server_1 = __webpack_require__(/*! ./server */ \"./src/server.ts\");\nconst ENVConfig = __webpack_require__(/*! ./config/development.json */ \"./src/config/development.json\");\nconst expServerObj = new server_1.Server(ENVConfig);\nexpServerObj.connectToServerResources();\nexpServerObj.app.set(constants_1.AppServerConstant.PORT, ENVConfig.PORT || ENVConfig.DEFAULT_PORT);\nconst server = http.createServer(expServerObj.app);\nserver.listen(process.env.PORT || expServerObj.app.get(constants_1.AppServerConstant.PORT));\nserver.on(constants_1.AppServerConstant.ERROR_MESSAGES.ERROR_TEXT, onError);\nserver.on(constants_1.AppServerConstant.LISTENING_TEXT, onListening);\nfunction onError(error) {\n    log_1.logger.error(error);\n}\nfunction onListening() {\n    const addr = server.address();\n    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;\n    log_1.logger.info(`\r\n    ################################################\r\n    ###     Server listening on port: ${bind}    ###\r\n    ################################################\r\n    `);\n}\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/index.ts?");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Server = void 0;\n/** Main server file  */\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\n// import cookieparser from 'cookie-parser';\n// import morgan from 'morgan';\nconst log_1 = __webpack_require__(/*! ./utilities/log */ \"./src/utilities/log.ts\");\nconst error_handler_1 = __webpack_require__(/*! ./utilities/error-handler */ \"./src/utilities/error-handler.ts\");\nconst constants_1 = __webpack_require__(/*! ./constants/constants */ \"./src/constants/constants.ts\");\nconst databaseConnection_1 = __webpack_require__(/*! ./connection/databaseConnection */ \"./src/connection/databaseConnection.ts\");\nconst user_routes_1 = __webpack_require__(/*! ./app/user/user.routes */ \"./src/app/user/user.routes.ts\");\nconst grocery_items_routes_1 = __webpack_require__(/*! ./app/grocery_items/grocery_items.routes */ \"./src/app/grocery_items/grocery_items.routes.ts\");\nconst order_item_routes_1 = __webpack_require__(/*! ./app/order_items/order_item.routes */ \"./src/app/order_items/order_item.routes.ts\");\nconst ENVConfig = __webpack_require__(/*! ./config/development.json */ \"./src/config/development.json\");\nclass Server {\n    constructor(envConfig) {\n        this.envConfig = envConfig;\n        this.retryAttempt = 0;\n        this.app = (0, express_1.default)();\n    }\n    connectToServerResources() {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                const dbConnectionManager = databaseConnection_1.DatabaseConnectionManager.getInstance();\n                yield dbConnectionManager.initializeConnection(ENVConfig.MYSQL);\n            }\n            catch (error) {\n                console.log(error.message);\n                log_1.logger.error(`${constants_1.AppServerConstant.ERROR_MESSAGES.ERROR_SERVER_RESOURCES_CONNECTION_FAILURE} : %o`, error);\n            }\n            finally {\n                this.initializeRoutes();\n            }\n        });\n    }\n    // application routes\n    initializeRoutes() {\n        console.log(__dirname);\n        // this.app.use(morgan('dev'));\n        this.app.use(express_1.default.json());\n        this.app.use(express_1.default.urlencoded({ extended: true }));\n        this.app.set('view engine', 'ejs');\n        // this.app.use(cookieparser());\n        this.app.use((req, res, next) => {\n            res.setHeader(constants_1.AppServerConstant.CORS.CONTENT_TYPE, constants_1.AppServerConstant.CORS.APPLICATION_JSON);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_ORIGIN, constants_1.AppServerConstant.CORS.ALL);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_METHODS, constants_1.AppServerConstant.CORS.ALL_METHODS);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_HEADERS, constants_1.AppServerConstant.CORS.ALL_HEADERS);\n            next();\n        }, (new user_routes_1.UserRoutes()).router);\n        this.app.use((req, res, next) => {\n            res.setHeader(constants_1.AppServerConstant.CORS.CONTENT_TYPE, constants_1.AppServerConstant.CORS.APPLICATION_JSON);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_ORIGIN, constants_1.AppServerConstant.CORS.ALL);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_METHODS, constants_1.AppServerConstant.CORS.ALL_METHODS);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_HEADERS, constants_1.AppServerConstant.CORS.ALL_HEADERS);\n            next();\n        }, (new grocery_items_routes_1.GroceryItemRoutes()).router);\n        this.app.use((req, res, next) => {\n            res.setHeader(constants_1.AppServerConstant.CORS.CONTENT_TYPE, constants_1.AppServerConstant.CORS.APPLICATION_JSON);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_ORIGIN, constants_1.AppServerConstant.CORS.ALL);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_METHODS, constants_1.AppServerConstant.CORS.ALL_METHODS);\n            res.header(constants_1.AppServerConstant.CORS.ACCESS_CONTROL_ALLOW_HEADERS, constants_1.AppServerConstant.CORS.ALL_HEADERS);\n            next();\n        }, (new order_item_routes_1.OrderItemRoutes()).router);\n        this.app.use((err, req, res, next) => __awaiter(this, void 0, void 0, function* () {\n            console.log(err);\n            if (!err.statusCode) {\n                err.statusCode = 500;\n            }\n            (0, error_handler_1.handleError)(err, res);\n        }));\n    }\n}\nexports.Server = Server;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/server.ts?");

/***/ }),

/***/ "./src/utilities/app.util.ts":
/*!***********************************!*\
  !*** ./src/utilities/app.util.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.handleResult = void 0;\nconst constants_1 = __webpack_require__(/*! ../constants/constants */ \"./src/constants/constants.ts\");\nconst handleResult = (res, statusCode, message, data = null) => {\n    return res.status(statusCode).send({\n        statusCode,\n        message,\n        status: constants_1.AppServerConstant.SUCCESS_MESSAGES.SUCCESS,\n        data,\n    });\n};\nexports.handleResult = handleResult;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/utilities/app.util.ts?");

/***/ }),

/***/ "./src/utilities/error-handler.ts":
/*!****************************************!*\
  !*** ./src/utilities/error-handler.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.handleError = exports.ErrorHandler = void 0;\nclass ErrorHandler extends Error {\n    constructor(statusCode, message, stack = '') {\n        super();\n        this.statusCode = statusCode;\n        this.message = message;\n        this.stack = stack;\n    }\n}\nexports.ErrorHandler = ErrorHandler;\nconst handleError = (err, res) => {\n    const { statusCode, message } = err;\n    res.status(statusCode).json({\n        status: \"error\",\n        statusCode,\n        message\n    });\n};\nexports.handleError = handleError;\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/utilities/error-handler.ts?");

/***/ }),

/***/ "./src/utilities/log.ts":
/*!******************************!*\
  !*** ./src/utilities/log.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.logger = void 0;\nconst winston_1 = __importDefault(__webpack_require__(/*! winston */ \"winston\"));\nconst transports = [];\ntransports.push(new winston_1.default.transports.Console({\n    format: winston_1.default.format.combine(winston_1.default.format.cli(), winston_1.default.format.splat())\n}));\nexports.logger = winston_1.default.createLogger({\n    levels: winston_1.default.config.npm.levels,\n    format: winston_1.default.format.combine(winston_1.default.format.timestamp({\n        format: 'YYYY-MM-DD HH:mm:ss'\n    }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.splat(), winston_1.default.format.json()),\n    transports\n});\n\n\n//# sourceURL=webpack://e_commerce-backend/./src/utilities/log.ts?");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "sequelize":
/*!****************************!*\
  !*** external "sequelize" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "./src/config/development.json":
/*!*************************************!*\
  !*** ./src/config/development.json ***!
  \*************************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"PORT\":3020,\"REQUEST_STRICT_SSL\":false,\"RETRY_ATTEMPTS\":3,\"RETRY_TIME\":3000,\"JWT_SECRET_KEY\":\"my-secrete\",\"MYSQL\":{\"HOST\":\"localhost\",\"PORT\":3306,\"USER\":\"root\",\"PASSWORD\":\"harishmankar@18\",\"DATABASE\":\"grocery_system\",\"RETRY_TIME\":3000}}');\n\n//# sourceURL=webpack://e_commerce-backend/./src/config/development.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;