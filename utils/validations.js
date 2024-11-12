import Joi from "@hapi/joi";

class Validation {
  static registerValidation(data){
    const scheme = Joi.object({
      name: Joi.string().min(6).required(),
      //must have two domain parts e.g. example.com & TLD must be .com or .net
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      //must satisfy the custom regex pattern
      password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    return scheme.validate(data);
  };

  static loginValidation(data){
    const scheme = Joi.object({
      //must have two domain parts e.g. example.com & TLD must be .com or .net
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      //must satisfy the custom regex pattern
      password: Joi.string()
        .min(6)
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });

    return scheme.validate(data);
  };
}

export default Validation;
