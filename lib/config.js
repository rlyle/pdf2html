// lib/config.js
/**
 * Configuration constants
 */

const constants = require('../constants');

const DEFAULT_OPTIONS = {
    ...constants,
    thumbnail: {
        page: 1,
        imageType: 'png',
        width: 160,
        height: 226,
    },
    command: {
        maxBuffer: 1024 * 2000,
        javaBin: 'java',
        lambdaJavaBin: '/opt/java/bin/java'
    },
};

module.exports = { DEFAULT_OPTIONS };
