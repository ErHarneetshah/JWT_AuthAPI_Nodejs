import Joi from "@hapi/joi";

class ValidationClass {
  static registerValidationClass(data){
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
        mobile_no: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
          'string.pattern.base': 'Mobile number must be exactly 10 digits.',
          'any.required': 'Mobile number is required.'
        })
    });

    return scheme.validate(data);
  };

  static loginValidationClass(data){
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

export default ValidationClass;
