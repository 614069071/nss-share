// 根据后缀获取对应icon
export function mimeType(mime) {

  if (mime === 'floder') return require('../images/icons/floder.png').default;

  const pdfTypes = ['pdf'];
  const txtTypes = ['txt'];
  const docTypes = ['doc', 'docx'];
  const pptTypes = ['ppt', 'pptx'];
  const xlsTypes = ['xls', 'xlsx'];
  const zipTypes = ['rar', 'zip', 'vsd', 'apk'];
  const imgTypes = ['jpeg', 'png', 'jpg', 'gif', 'bmp', 'webp'];
  const mscTypes = ['aac', 'aiff', 'aif', 'amr', 'aob', 'ape', 'axa', 'caf', 'flac', 'it', 'm2a', 'm4a', 'm4b', 'mka', 'mlp', 'mod', 'mp1', 'mp2', 'mp3', 'mpa', 'mpc', 'mpga', 'oga', 'ogg', 'oma', 'opus', 'rmi', 's3m', 'spx', 'tta', 'voc', 'vqf', 'wav', 'w64', 'wma', 'wv', 'xa', 'xm'];
  const vdoTypes = ['3gp', '3gp', '3gp2', '3gpp', 'amv', 'asf', 'avi', 'axv', 'divx', 'dv', 'flv', 'f4v', 'gvi', 'gxf', 'm1v', 'm2p', 'm2t', 'm2ts', 'm2v', 'm4v', 'mks', 'mkv', 'moov', 'mov', 'mp2v', 'mp4', 'mpeg', 'mpeg1', 'mpeg2', 'mpeg4', 'mpg', 'mpv', 'mt2s', 'mts', 'mxf', 'mxg', 'nsv', 'nuv', 'ogm', 'ogv', 'ogx', 'spx', 'ps', 'qt', 'rec', 'rm', 'rmvb', 'tod', 'ts', 'tts', 'vob', 'vro', 'webm', 'wm', 'wmv', 'wtv', 'qlv', 'xesc'];

  const mimeTypes = [
    {
      key: pdfTypes,
      value: require('../images/icons/pdf.png').default
    },
    {
      key: txtTypes,
      value: require('../images/icons/txt.png').default
    },
    {
      key: docTypes,
      value: require('../images/icons/doc.png').default
    },
    {
      key: pptTypes,
      value: require('../images/icons/ppt.png').default
    },
    {
      key: xlsTypes,
      value: require('../images/icons/xls.png').default
    },
    {
      key: zipTypes,
      value: require('../images/icons/zip.png').default
    },
    {
      key: imgTypes,
      value: require('../images/icons/img.png').default
    },
    {
      key: mscTypes,
      value: require('../images/icons/msc.png').default
    },
    {
      key: vdoTypes,
      value: require('../images/icons/vdo.png').default
    }
  ];

  for (let i = 0; i < mimeTypes.length; i++) {
    if (mimeTypes[i].key.includes(mime)) return mimeTypes[i].value;
  }

  return require('../images/icons/other.png').default;
}