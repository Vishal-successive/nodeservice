import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "../../utils/swagger";
import { authMiddleWare } from "../../libs/routes/authMiddleWare";
import { moduleName, permissionTypes } from "../../utils/constants";
import { middleware } from "../../libs/validationMiddleware";
import { schemas } from "./validate";
import Controller from "./Controller";

const traineeController = new Controller();
const router = express.Router();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.get("/swagger.json", (req, res) => {
  return res.json(swaggerDocs);
});

/**
 * @swagger
 * /gettraineebyid:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Get Trainee By Id
 *    parameters:
 *      - name: skip
 *        in: query
 *        description: skip the pages
 *        required: true
 *        schema:
 *          type: integer
 *          format: int32
 *      - name: limit
 *        in: query
 *        description: limit the pages
 *        required: true
 *        schema:
 *          type: integer
 *          format: int32
 *      - name: id
 *        in: query
 *        description: Id of Trainee
 *        required: false
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Not Found
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.get(
  "/gettraineebyid",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.get),
  traineeController.getTraineeById
);

/**
 * @swagger
 * /getalltrainees:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      description: Use to return all trainees
 *      parameters:
 *        - name: skip
 *          in: query
 *          description: skip the pages
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *        - name: limit
 *          in: query
 *          description: limit the pages
 *          required: true
 *          schema:
 *            type: integer
 *            format: int32
 *      responses:
 *       '200':
 *          description: A successful response
 *       '422':
 *          description: Unprocessable Entity
 *       '500':
 *          description: Internal Server Error
 */
router.get(
  "/getalltrainees",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.get),
  traineeController.getAllTrainee
);

/**
 * @swagger
 * /createtrainee:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      description: Create Trainee
 *    parameters:
 *      - name: name
 *        in: body
 *        description: name of user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: email
 *        in: body
 *        description: Email of user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: password
 *        in: body
 *        description: Password of user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.post(
  "/createtrainee",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.post),
  traineeController.createTrainee
);

/**
 * @swagger
 * /updatetrainee:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      description: Update Trainee
 *    parameters:
 *      - name: id
 *        in: body
 *        description: ID of user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: dataToUpdate
 *        in: body
 *        description: Data to be updated
 *        required: true
 *        schema:
 *          type: object
 *          format: object
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.put(
  "/updatetrainee",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.put),
  traineeController.updateTrainee
);

/**
 * @swagger
 * /deletetrainee:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      description: Trainee DELETE Route
 *    parameters:
 *      - name: id
 *        in: params
 *        description: Id of user
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: A successful response
 *      '404':
 *        description: Not Found
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.delete(
  "/deletetrainee/:id",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.delete),
  traineeController.deleteTraineeById
);

export default router;
