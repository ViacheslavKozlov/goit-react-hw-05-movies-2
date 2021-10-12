import slugify from "slugify";

const createSlug = string =>
  slugify(string, {
    lower: true
  });

const getId = line => line.match(/[a-z0-9]+$/)[0];

export { createSlug, getId };
