const router = require('express').Router();
const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');

const v1Routes = require('./v1');

router.use('/v1', v1Routes);

router.get('/tokens', (_, res) => out.success(res, codes.SUCCESS, {
  token: 'Axy1NPs9cRvFmLbwSUSoaZ9D9RKRKqgeAKDfFVyqotm7',
  clientAddress: 'DA4DPv42AysvMTmoyENVh6Gcze9TAXLiTYu4hfqhpZEv',
  clientKey: '[157,249,175,101,122,182,47,192,105,240,54,194,213,195,121,146,201,106,219,147,200,95,247,85,195,76,71,142,37,248,154,1,180,158,26,169,137,222,242,209,179,4,173,212,224,200,138,150,239,47,69,26,63,51,13,57,87,117,250,41,31,23,5,255]',
  clientKeyPub: 'DA4DPv42AysvMTmoyENVh6Gcze9TAXLiTYu4hfqhpZEv',
}));

module.exports = router;
