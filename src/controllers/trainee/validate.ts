import Joi from "@hapi/joi";
export const schemas = {
  get: {
    query: Joi.object().keys({
      skip: Joi.number()
        .default(0)
        .messages({ error: "Skip is invalid" })
        .required(),
      limit: Joi.number()
        .default(10)
        .messages({ error: "Limit is invalid" })
        .required(),
    }),
  },

  put: {
    body: Joi.object().keys({
      id: Joi.string().required().messages({ error: "Id is required" }),
      dataToUpdate: Joi.object().messages({ error: "dataToUpdate is invalid" }),
    }),
  },

  post: {
    body: Joi.object()
      .keys({
        id: Joi.string().required().messages({ error: "Id is invalid" }),
        name: Joi.string().required().messages({ error: "Name is required" }),
      })
      .required(),
  },

  delete: {
    params: Joi.object().keys({
      id: Joi.required().messages({ error: "Id is required" }),
    }),
  },
};
