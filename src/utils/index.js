// 根据后缀获取对应icon
export function mimeType(mime = "") {

  const ext = mime.split('.').pop();

  if (ext === 'floder') return require('../images/icons/floder.svg').default;

  const pdfTypes = ['pdf'];
  const txtTypes = ['txt'];
  const docTypes = ['doc', 'docx'];
  const pptTypes = ['ppt', 'pptx'];
  const xlsTypes = ['xls', 'xlsx'];
  const zipTypes = ['rar', 'zip', 'vsd', 'apk', '7z'];
  const imgTypes = ['jpeg', 'png', 'jpg', 'gif', 'bmp', 'webp'];
  const mscTypes = ['m4r', 'aac', 'aiff', 'aif', 'amr', 'aob', 'ape', 'axa', 'caf', 'flac', 'it', 'm2a', 'm4a', 'm4b', 'mka', 'mlp', 'mod', 'mp1', 'mp2', 'mp3', 'mpa', 'mpc', 'mpga', 'oga', 'ogg', 'oma', 'opus', 'rmi', 's3m', 'spx', 'tta', 'voc', 'vqf', 'wav', 'w64', 'wma', 'wv', 'xa', 'xm'];
  const vdoTypes = [/*'m3u8',*/'3gp', '3gp', '3gp2', '3gpp', 'amv', 'asf', 'avi', 'axv', 'divx', 'dv', 'flv', 'f4v', 'gvi', 'gxf', 'm1v', 'm2p', 'm2t', 'm2ts', 'm2v', 'm4v', 'mks', 'mkv', 'moov', 'mov', 'mp2v', 'mp4', 'mpeg', 'mpeg1', 'mpeg2', 'mpeg4', 'mpg', 'mpv', 'mt2s', 'mts', 'mxf', 'mxg', 'nsv', 'nuv', 'ogm', 'ogv', 'ogx', 'spx', 'ps', 'qt', 'rec', 'rm', 'rmvb', 'tod', 'ts', 'tts', 'vob', 'vro', 'webm', 'wm', 'wmv', 'wtv', 'qlv', 'xesc'];

  const mimeTypes = [
    {
      key: pdfTypes,
      value: require('../images/icons/pdf.svg').default
    },
    {
      key: txtTypes,
      value: require('../images/icons/txt.svg').default
    },
    {
      key: docTypes,
      value: require('../images/icons/doc.svg').default
    },
    {
      key: pptTypes,
      value: require('../images/icons/ppt.svg').default
    },
    {
      key: xlsTypes,
      value: require('../images/icons/xls.svg').default
    },
    {
      key: zipTypes,
      value: require('../images/icons/zip.svg').default
    },
    {
      key: imgTypes,
      value: require('../images/icons/img.svg').default
    },
    {
      key: mscTypes,
      value: require('../images/icons/msc.svg').default
    },
    {
      key: vdoTypes,
      value: require('../images/icons/vdo.svg').default
    }
  ];

  for (let i = 0; i < mimeTypes.length; i++) {
    if (mimeTypes[i].key.includes(ext)) return mimeTypes[i].value;
  }

  return require('../images/icons/other.svg').default;
}

export const storages = {
  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      sessionStorage.setItem(key, JSON.stringify(value));
      return;
    }
    sessionStorage.setItem(key, value);
  },
  get(key) {
    const value = sessionStorage.getItem(key) || '';
    let val = null;
    try {
      val = JSON.parse(value);
    } catch (e) {
      return value;
    }

    if (typeof val === 'number') {
      return value;
    }
    return val;
  },
  del(key) {
    sessionStorage.removeItem(key);
  }
}

// 统一格式
export const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
}

// 序列化时间
export function formatTimeYYMS(time) {
  const date = new Date(time || 0);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join("-")
}

export function formatTime(time) {
  const date = new Date(time || 0);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  // const second = date.getSeconds();

  return [year, month, day].map(formatNumber).join("-") + " " + [hour, minute].map(formatNumber).join(":")
}

function createAnchor(src) {
  const anchor = document.createElement("a");
  anchor.href = src;
  anchor.setAttribute("download", true);
  anchor.click();
  anchor.remove();
}

// 批量下载 pc 尚可 mobile 体验差
export function downloads(arr) {
  for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
      createAnchor(arr[i]);
    }, (i + 1) * 500);
  }
}

// 节流
export function throttle(fn) {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    let context = this;
    timer = setTimeout(function () {
      fn.apply(context, arguments);
    }, 200)
  }
}

export function toBety(size) {
  let c = 0;
  let num = size || 0;
  let bety = ['KB', 'MB', 'GB', 'TB'];

  while (num > 1024) {
    num /= 1024;
    c++;
  }

  return num.toFixed(2) + bety[c];
}