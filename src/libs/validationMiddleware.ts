import Joi from "@hapi/joi";
export const middleware = (schema) => {
  return (req, res, next) => {
    console.log("validationMidleware...");
    let error;
    Object.keys(schema).forEach((key) => {
      const obj = schema[key];
      const response = obj.validate(req[key]);
      error = response.error;
    });
    const valid = error === undefined;
    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      console.log("error: ", message);
      res.status(422).json({ error: message });
    }
  };
};
