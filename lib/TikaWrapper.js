// lib/TikaWrapper.js
const debug = require('debug')('pdf2html');
const path = require('path');
const fse = require('fs-extra');
const CommandExecutor = require('./CommandExecutor');
const FileManager = require('./FileManager');
const { DEFAULT_OPTIONS } = require('./config');

/**
 * Apache Tika wrapper for content extraction
 */
class TikaWrapper {
    static async extract(filepath, format, options = {}) {
        return FileManager.withTempFile(filepath, DEFAULT_OPTIONS.DIRECTORY.PDF, async (tempFilePath) => {
            const args = ['-jar', path.join(DEFAULT_OPTIONS.DIRECTORY.VENDOR, DEFAULT_OPTIONS.VENDOR_TIKA_JAR), `--${format}`, tempFilePath];

            if (fse.existsSync(DEFAULT_OPTIONS.command.lambdaJavaBin)) {
                DEFAULT_OPTIONS.command.javaBin = DEFAULT_OPTIONS.command.lambdaJavaBin;
            }

            const maxBuffer = options.maxBuffer || DEFAULT_OPTIONS.command.maxBuffer;
            return CommandExecutor.execute(DEFAULT_OPTIONS.command.javaBin, args, { maxBuffer });
        });
    }

    static async extractHTML(filepath, options) {
        debug('Converting PDF to HTML');
        return this.extract(filepath, 'html', options);
    }

    static async extractText(filepath, options) {
        debug('Converting PDF to Text');
        return this.extract(filepath, 'text', options);
    }

    static async extractMetadata(filepath, options) {
        debug('Extracting metadata from PDF');
        const jsonString = await this.extract(filepath, 'json', options);
        return JSON.parse(jsonString);
    }
}

module.exports = TikaWrapper;
