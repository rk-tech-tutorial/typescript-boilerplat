// Path Aliasing
import moduleAlias from "module-alias";

moduleAlias.addAliases({
  "@controllers": `${__dirname}/controllers`,
  "@configs": `${__dirname}/configs/index`,
  "@utils": `${__dirname}/utils`,
  "@interfaces": `${__dirname}/interfaces`,
  "@helpers": `${__dirname}/helpers`,
  "@services": `${__dirname}/services`,
  "@middlewares": `${__dirname}/middlewares`,
  "@repository": `${__dirname}/repository`,
  "@scripts": `${__dirname}/scripts`,
  "@models": `${__dirname}/models/index`,
  "@validators": `${__dirname}/validators/index`,
  "@projection": `${__dirname}/projection/index`
});
