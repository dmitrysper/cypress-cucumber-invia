const report = require('multiple-cucumber-html-reporter');
const browser = process.env.BROWSER;
const browserVersion = process.env.BROWSER_VER;
const device = process.env.ENVIRON;

report.generate({
    jsonDir: './cypress/reports/',
    reportPath: './cypress/reports/',
    metadata:{
        browser: {
            name: browser,
            version: browserVersion
        },
        device: device,
        platform: {
            name: '',
            version: ''
        }
    }
});
