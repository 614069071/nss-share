// 根据后缀获取对应icon
export function mimeType(mime) {
  const pdfTypes = ['pdf'];
  const txtTypes = ['txt'];
  const docTypes = ['doc', 'docx'];
  const pptTypes = ['ppt', 'pptx'];
  const xlsTypes = ['xls', 'xlsx'];
  const zipTypes = ['rar', 'zip', 'vsd', 'apk'];
  const imgTypes = ['jpeg', 'png', 'jpg', 'gif', 'bmp', 'webp'];
  const mscTypes = ['aac', 'aiff', 'aif', 'amr', 'aob', 'ape', 'axa', 'caf', 'flac', 'it', 'm2a', 'm4a', 'm4b', 'mka', 'mlp', 'mod', 'mp1', 'mp2', 'mp3', 'mpa', 'mpc', 'mpga', 'oga', 'ogg', 'oma', 'opus', 'rmi', 's3m', 'spx', 'tta', 'voc', 'vqf', 'wav', 'w64', 'wma', 'wv', 'xa', 'xm'];
  const vdoTypes = ['3gp', '3gp', '3gp2', '3gpp', 'amv', 'asf', 'avi', 'axv', 'divx', 'dv', 'flv', 'f4v', 'gvi', 'gxf', 'm1v', 'm2p', 'm2t', 'm2ts', 'm2v', 'm4v', 'mks', 'mkv', 'moov', 'mov', 'mp2v', 'mp4', 'mpeg', 'mpeg1', 'mpeg2', 'mpeg4', 'mpg', 'mpv', 'mt2s', 'mts', 'mxf', 'mxg', 'nsv', 'nuv', 'ogm', 'ogv', 'ogx', 'spx', 'ps', 'qt', 'rec', 'rm', 'rmvb', 'tod', 'ts', 'tts', 'vob', 'vro', 'webm', 'wm', 'wmv', 'wtv', 'qlv', 'xesc'];

  const pdfIconBase64 = 'pdf';
  const txtIconBase64 = 'txt';
  const docIconBase64 = 'doc';
  const pptIconBase64 = 'ppt';
  const xlsIconBase64 = 'xls';
  const zipIconBase64 = 'zip';
  const imgIconBase64 = 'image';
  const mscIconBase64 = 'music';
  const vdoIconBase64 = 'video';

  const otherIconBse64 = 'other';

  const mimeTypes = [
    {
      key: pdfTypes,
      value: pdfIconBase64
    },
    {
      key: txtTypes,
      value: txtIconBase64
    },
    {
      key: docTypes,
      value: docIconBase64
    },
    {
      key: pptTypes,
      value: pptIconBase64
    },
    {
      key: xlsTypes,
      value: xlsIconBase64
    },
    {
      key: zipTypes,
      value: zipIconBase64
    },
    {
      key: imgTypes,
      value: imgIconBase64
    },
    {
      key: mscTypes,
      value: mscIconBase64
    },
    {
      key: vdoTypes,
      value: vdoIconBase64
    }
  ];

  for (let i = 0; i < mimeTypes.length; i++) {
    if (mimeTypes[i].key.includes(mime)) return mimeTypes[i].value;
  }

  return otherIconBse64;
}