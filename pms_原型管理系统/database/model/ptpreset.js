var mongoose = require('./db.js'),
  Schema = mongoose.Schema;

var PtPresetSchema = new Schema({
  cuid: {
    type: String,
    default: '59cb39c918075526fc0b86e5',
  },
  cuser: {
    type: String,
    default: 'paratag',
  },
  cdate: {
    type: Date,
    default: new Date(),
  },
  title: {
    type: String,
    default: '自定义主题',
  },
  '--pd-xs': {
    type: String,
    default: '0.04rem',
  },
  '--pd-s': {
    type: String,
    default: '0.08rem',
  },
  '--pd-m': {
    type: String,
    default: '0.16rem',
  },
  '--pd-l': {
    type: String,
    default: '0.24rem',
  },
  '--pd-xl': {
    type: String,
    default: '0.32rem',
  },
  '--wd-xs': {
    type: String,
    default: '0.24rem',
  },
  '--wd-s': {
    type: String,
    default: '0.32rem',
  },
  '--wd-m': {
    type: String,
    default: '0.4rem',
  },
  '--wd-l': {
    type: String,
    default: '0.56rem',
  },
  '--wd-xl': {
    type: String,
    default: '1.2rem',
  },
  '--wd-panel': {
    type: String,
    default: '2rem',
  },
  '--wd-dialog': {
    type: String,
    default: '3.6rem',
  },
  '--wd-page': {
    type: String,
    default: '9.6rem',
  },
  '--ht-xs': {
    type: String,
    default: '0.24rem',
  },
  '--ht-s': {
    type: String,
    default: '0.32rem',
  },
  '--ht-m': {
    type: String,
    default: '0.4rem',
  },
  '--ht-l': {
    type: String,
    default: '0.56rem',
  },
  '--ht-xl': {
    type: String,
    default: '0.8rem',
  },
  '--ht-panel': {
    type: String,
    default: '2rem',
  },
  '--ht-dialog': {
    type: String,
    default: '3.6rem',
  },
  '--ht-page': {
    type: String,
    default: '9.6rem',
  },
  '--cl-front': {
    type: String,
    default: '#ffffff',
  },
  '--cl-back': {
    type: String,
    default: '#eeeeee',
  },
  '--cl-light': {
    type: String,
    default: '#f5f5f5',
  },
  '--cl-hint': {
    type: String,
    default: '#9e9e9e',
  },
  '--cl-sec': {
    type: String,
    default: '#757575',
  },
  '--cl-prim': {
    type: String,
    default: '#616161',
  },
  '--cl-front-i': {
    type: String,
    default: '#424242',
  },
  '--cl-back-i': {
    type: String,
    default: '#424242',
  },
  '--cl-light-i': {
    type: String,
    default: '#424242',
  },
  '--cl-light-i': {
    type: String,
    default: '#424242',
  },
  '--cl-prim-i': {
    type: String,
    default: '#ffffff',
  },
  '--cl-sec-i': {
    type: String,
    default: '#f5f5f5',
  },
  '--cl-mask': {
    type: String,
    default: '#ffffff00',
  },
  '--cl-mask-i': {
    type: String,
    default: '#0000007f',
  },
  '--cl-shadow': {
    type: String,
    default: '#0000007f',
  },
  '--cl-theme-light': {
    type: String,
    default: '#dcedc8',
  },
  '--cl-theme': {
    type: String,
    default: '#8bc34a',
  },
  '--cl-theme-dark': {
    type: String,
    default: '#558b2f',
  },
  '--cl-theme-sec-light': {
    type: String,
    default: '#a3e9a4',
  },
  '--cl-theme-sec': {
    type: String,
    default: '#259b24',
  },
  '--cl-theme-sec-dark': {
    type: String,
    default: '#0a7e07',
  },
  '--cl-alert-light': {
    type: String,
    default: '#ffe082',
  },
  '--cl-alert': {
    type: String,
    default: '#ff9800',
  },
  '--cl-alert-dark': {
    type: String,
    default: '#ff8f00',
  },
  '--fs-xs': {
    type: String,
    default: '0.1rem',
  },
  '--fs-s': {
    type: String,
    default: '0.12rem',
  },
  '--fs-m': {
    type: String,
    default: '0.14rem',
  },
  '--fs-l': {
    type: String,
    default: '0.16rem',
  },
  '--fs-xl': {
    type: String,
    default: '0.28rem',
  },
  '--radius-s': {
    type: String,
    default: '0.02rem',
  },
  '--radius-m': {
    type: String,
    default: '0.04rem',
  },
  '--radius-l': {
    type: String,
    default: '0.56rem',
  },
  '--shadow-color-m': {
    type: String,
    default: '#00000033',
  },
  '--shadow-offset-m': {
    type: String,
    default: '0.01rem',
  },
  '--shadow-distance-m': {
    type: String,
    default: '0.03rem',
  },
  '--shadow-color-l': {
    type: String,
    default: '#00000033',
  },
  '--shadow-offset-l': {
    type: String,
    default: '0.02rem',
  },
  '--shadow-distance-l': {
    type: String,
    default: '0.08rem',
  },
  '--bdr-style': {
    type: String,
    default: 'solid',
  },
  '--bdr-color': {
    type: String,
    default: '#e0e0e0',
  },
  '--bdr-color-i': {
    type: String,
    default: '#424242',
  },
  '--bdr-width': {
    type: String,
    default: '0.01rem',
  },
  '--presto': {
    type: String,
    default: '100ms',
  },
  '--vivo': {
    type: String,
    default: '200ms',
  },
  '--largo': {
    type: String,
    default: '800ms',
  },

});

module.exports = mongoose.model('PtPreset', PtPresetSchema);