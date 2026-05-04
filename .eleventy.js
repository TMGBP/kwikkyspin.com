const fs = require("fs")
const path = require("path")
const { DateTime } = require("luxon")
const { EleventyI18nPlugin } = require("@11ty/eleventy")
const markdownIt = require("markdown-it")

const languagesData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "src/_data/languages.json"), "utf-8"))

const supportedLanguages = languagesData.languages.filter(lang => lang.support && lang.locale).map(lang => lang.code)

module.exports = function (eleventyConfig) {
   eleventyConfig.setServerOptions({
      pathPrefix: "/",
   })

   eleventyConfig.addPlugin(EleventyI18nPlugin, {
      defaultLanguage: "en",
      supportedLanguages: supportedLanguages,
      fallbackLanguage: languagesData.defaultLanguage,
      directories: Object.fromEntries(supportedLanguages.map(lang => [lang, lang])),
   })

   /**
    * Force Markdown rendering and allow raw HTML inside .md files.
    * This lets index.md render content after the front matter,
    * including headings, paragraphs, lists, and custom HTML.
    */
   const markdownLibrary = markdownIt({
      html: true,
      breaks: false,
      linkify: true,
      typographer: true,
   })

   eleventyConfig.setLibrary("md", markdownLibrary)

   eleventyConfig.addNunjucksGlobal("readJSON", filePath => {
      const fullPath = path.resolve(filePath)
      return JSON.parse(fs.readFileSync(fullPath, "utf-8"))
   })

   eleventyConfig.addFilter("date", (dateObj, format = "yyyy-MM-dd") => {
      return DateTime.fromJSDate(dateObj).toFormat(format)
   })

   eleventyConfig.addNunjucksGlobal("getCurrentDate", () => {
      return DateTime.now().toFormat("yyyy-MM-dd")
   })

   eleventyConfig.addNunjucksGlobal("getLastModifiedDate", filePath => {
      const stats = fs.statSync(filePath)
      return DateTime.fromJSDate(stats.mtime).toFormat("yyyy-MM-dd")
   })

   eleventyConfig.addPassthroughCopy("src/assets")

   eleventyConfig.addCollection("robots", function (collectionApi) {
      return collectionApi.getAll().filter(item => item.data.robots)
   })

   return {
      dir: {
         input: "src",
         output: "_sites",
         data: "_data",
         includes: "_includes",
         layouts: "_includes/layouts",
      },

      passthroughFileCopy: true,

      markdownTemplateEngine: "njk",
      dataTemplateEngine: "njk",
      htmlTemplateEngine: "njk",

      templateFormats: ["html", "njk", "md"],
   }
}
