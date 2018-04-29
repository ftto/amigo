const superagent = require('superagent');
const config = require('./config');
require('dotenv').config();

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET

function detect (query) {
    return superagent
        .post(config.naverApi.detect)
        .type('form')
        .set('X-Naver-Client-Id', NAVER_CLIENT_ID)
        .set('X-Naver-Client-Secret', NAVER_CLIENT_SECRET)
        .send({
            query
        })
}

function translate ({ source, target, text } = {}) {
    target = target || ''
    if (!target) {
        if (source === 'en') target = 'ko'
        else if (source === 'ko') target = 'en'
    }

    return superagent
        .post(config.naverApi.translate)
        .type('form')
        .set('X-Naver-Client-Id', NAVER_CLIENT_ID)
        .set('X-Naver-Client-Secret', NAVER_CLIENT_SECRET)
        .send({
            source,
            target,
            text
        })
}

module.exports = {
    detect,
    translate
}
