// START 11TY imports
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import { InputPathToUrlTransformPlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import sitemap from "@quasibit/eleventy-plugin-sitemap";
// END 11TY imports

// START LibDoc imports
import libdocConfig from "./_data/libdocConfig.js";
import libdocFunctions from "./_data/libdocFunctions.js";
// END LibDoc imports

export default function (eleventyConfig) {
    // START PLUGINS
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(
        eleventyImageTransformPlugin,
        libdocFunctions.pluginsParameters.eleventyImageTransform()
    );
    eleventyConfig.addPlugin(feedPlugin, {
        type: "rss",
        outputPath: "/rss.xml",
        collection: {
            name: "postsByDateDescending",
            limit: 10,
        },
        metadata: {
            language: "en",
            title: "TerabyteTiger's Blog",
            subtitle: libdocConfig.blogDescription,
            base: "https://terabytetiger.com/",
            author: {
                name: "Tyler VanBlargan",
                email: "",
            },
        },
    });
    eleventyConfig.addPlugin(sitemap, {
        lastModifiedProperty: "modified",
        sitemap: {
            hostname: "https://terabytetiger.com",
        },
    });
    // END PLUGINS

    // START FILTERS
    eleventyConfig.addAsyncFilter("autoids", libdocFunctions.filters.autoids);
    eleventyConfig.addAsyncFilter("embed", libdocFunctions.filters.embed);
    eleventyConfig.addAsyncFilter("cleanup", libdocFunctions.filters.cleanup);
    eleventyConfig.addAsyncFilter(
        "dateString",
        libdocFunctions.filters.dateString
    );
    eleventyConfig.addAsyncFilter(
        "datePrefixText",
        libdocFunctions.filters.datePrefixText
    );
    eleventyConfig.addAsyncFilter("toc", libdocFunctions.filters.toc);
    // END FILTERS

    // START COLLECTIONS
    eleventyConfig.addCollection("myTags", libdocFunctions.collections.myTags);
    eleventyConfig.addCollection(
        "archiveTags",
        libdocFunctions.collections.archiveTags
    );
    eleventyConfig.addCollection(
        "postsByDateDescending",
        libdocFunctions.collections.postsByDateDescending
    );
    eleventyConfig.addCollection(
        "archivedPostsByDateDescending",
        libdocFunctions.collections.archivedPostsByDateDescending
    );
    // END COLLECTIONS

    // START SHORTCODES
    eleventyConfig.addShortcode("alert", libdocFunctions.shortcodes.alert);
    eleventyConfig.addPairedShortcode(
        "alertAlt",
        libdocFunctions.shortcodes.alert
    );
    eleventyConfig.addShortcode("embed", libdocFunctions.shortcodes.embed);
    eleventyConfig.addShortcode("icomoon", libdocFunctions.shortcodes.icomoon);
    eleventyConfig.addShortcode("icon", libdocFunctions.shortcodes.icon);
    eleventyConfig.addShortcode(
        "iconCard",
        libdocFunctions.shortcodes.iconCard
    );
    eleventyConfig.addPairedShortcode(
        "sandbox",
        libdocFunctions.shortcodes.sandbox
    );
    eleventyConfig.addPairedShortcode(
        "sandboxFile",
        libdocFunctions.shortcodes.sandboxFile
    );
    // END SHORTCODES

    // START FILE COPY
    eleventyConfig.addPassthroughCopy("sandboxes");
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("core/assets");
    eleventyConfig.addPassthroughCopy("favicon.png");
    // Specifically dump the static folder to "/" instead of "/static/"
    eleventyConfig.addPassthroughCopy({ "static/": "/" });
    // END FILE COPY

    return {
        pathPrefix: libdocConfig.htmlBasePathPrefix,
    };
}
