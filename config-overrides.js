const { override, useBabelRc } = require('customize-cra');
const Dotenv = require('dotenv-webpack');

// eslint-disable-next-line react-hooks/rules-of-hooks
module.exports = override(useBabelRc(),
    (config) => {
        config.plugins.push(new Dotenv({ path: './.env' }));
        return config;
    });
