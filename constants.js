const path = require('path');
const os = require('os');

module.exports = {
    VENDOR_PDF_BOX_JAR: 'pdfbox-app-2.0.34.jar',
    VENDOR_TIKA_JAR: 'tika-app-3.2.0.jar',

    DIRECTORY: {
        PDF: path.join(os.tmpdir(), './files/pdf/'),
        IMAGE: path.join(os.tmpdir(), './files/image/'),
        VENDOR: path.join(os.tmpdir(), './vendor/'),
    },
};
