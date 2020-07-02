import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { swaggerOptions } from "../../utils/swagger";
import { authMiddleWare } from "../../libs/routes/authMiddleWare";
import { moduleName, permissionTypes } from "../../utils/constants";
import { middleware } from "../../libs/validationMiddleware";
import { schemas } from "./validate";
import { userCount, readUser } from "../../repositories/user/UserRepository";

const router = express.Router();
const swaggerDocs = swaggerJsDoc(swaggerOptions);
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /get:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    description: Trainee GET Route
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
  "/get",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.get),
  (req, res) => {
    res.send("GET Route");
    res.end();
  }
);

/**
 * @swagger
 * /getalltrainees:
 *    get:
 *      description: Use to return all trainees
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
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.get("/getalltrainees", middleware(schemas.get), async (req, res) => {
  try {
    const skip = Number(req.query.skip);
    const limit = Number(req.query.limit);
    const trainee = await readUser(
      { email: "vishal.kumar@successive.tech" },
      {},
      {
        skip,
        limit,
        sort: {
          name: "desc",
        },
      }
    );

    const count = await userCount();

    res.json({
      "All Trainees": trainee,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @swagger
 * /post:
 *    post:
 *      description: Trainee POST Route
 *    parameters:
 *      - name: id
 *        in: body
 *        description: ID of user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: name
 *        in: body
 *        description: name of user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: A successful response
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.post(
  "/post",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.post),
  (req, res) => {
    res.send("POST Route");
    res.end();
  }
);

/**
 * @swagger
 * /put:
 *    put:
 *      description: Trainee PUT Route
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
 *        description: dataToUpdate of user
 *        required: true
 *        schema:
 *          type: object
 *    responses:
 *      '201':
 *        description: A successful response
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.put(
  "/put",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.put),
  (req, res) => {
    res.send("PUT Route");
    res.end();
  }
);

/**
 * @swagger
 * /delete:
 *    delete:
 *      description: Trainee DELETE Route
 *    parameters:
 *      - name: id
 *        in: params
 *        description: Id of user
 *        required: true
 *        schema:
 *          type: integer
 *          format: int32
 *    responses:
 *      '200':
 *        description: A successful response
 *      '422':
 *        description: Unprocessable Entity
 *      '500':
 *        description: Internal Server Error
 */
router.delete(
  "/delete",
  authMiddleWare(moduleName.getUsers, permissionTypes.read),
  middleware(schemas.delete),
  (req, res) => {
    res.send("DELETE Route");
    res.end();
  }
);

export default router;
