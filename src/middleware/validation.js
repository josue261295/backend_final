import { matchedData, validationResult } from "express-validator";

export function validateRequest(rules) {
  return async (req, res, next) => {
    await Promise.all(rules.map((rule) => rule.run(req)));
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const errors = result.array().map((e) => ({
        field: e.type === "field" ? e.path : e.type,
        message: e.msg,
      }));

      return res.status(400).json({
        ok: false,
        message: "Error de validación",
        errors,
      });
    }

    const cleanBody = matchedData(req, {
      locations: ["body"],
      includeOptionals: true,
    });
    req.body = cleanBody;
    next();
  };
}
