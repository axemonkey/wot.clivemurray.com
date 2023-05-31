module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy('wot.clivemurray.com/public');
	eleventyConfig.setUseGitIgnore(false);
	eleventyConfig.setServerOptions({
		liveReload: false,
		watch: [
			'wot.clivemurray.com/public/**/*',
		],
		showVersion: true,
	});
};
