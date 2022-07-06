import SparkMD5 from 'spark-md5';

function formatSize(file) {
  let data = '';
  let size = file.size;
  if (size < 0.1 * 1024) {
    //如果小于0.1KB转化成B
    data = size.toFixed(2) + 'B';
  } else if (size < 0.1 * 1024 * 1024) {
    //如果小于0.1MB转化成KB
    data = (size / 1024).toFixed(2) + 'KB';
  } else if (size < 0.1 * 1024 * 1024 * 1024) {
    //如果小于0.1GB转化成MB
    data = (size / (1024 * 1024)).toFixed(2) + 'MB';
  } else {
    //其他转化成GB
    data = (size / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
  }
  let sizestr = data + '';
  let len = sizestr.indexOf('.');
  let dec = sizestr.substr(len + 1, 2);
  if (dec == '00') {
    //当小数点后为00时 去掉小数部分
    return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
  }
  return sizestr;
}
//  最后修改时间
//格式化时间

function getLatiTime(time) {
  // 格式化时间
  let date = new Date(time);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
}

//  获取后缀名
const getSuffix = file => {
  let { type } = file;
  return type.split('/')[1];
};
/* 获取图片宽高 */
const getImgInfo = file => {
  return new Promise(resolve => {
    let img = new Image();
    img.src = file.fileUrl;
    img.style.display = 'none';
    img.onload = () => {
      let { width, height } = img;
      resolve({ width, height });
    };
  });
};
/* 视频宽高和时长 */
const getVideoInfo = file => {
  return new Promise(resolve => {
    // 元数据已加载
    const video = document.createElement('video');
    video.src = file.fileUrl;
    video.style.display = 'none';
    video.onloadedmetadata = () => {
      let duration = video.duration; // 取整 ，四舍五入
      let width = video.videoWidth;
      let height = video.videoHeight;
      resolve({ width, height, duration });
    };
  });
};

const getPxSize = async file => {
  let type = file.type.split('/')[0];
  if (type === 'image') {
    return await getImgInfo(file);
  } else if (type === 'video') {
    return await getVideoInfo(file);
  } else {
    return {};
  }
};
const getFileMd5 = file => {
  return new Promise(resolve => {
    let fileReader = new FileReader();
    let spark = new SparkMD5.ArrayBuffer();
    // 获取文件二进制数据
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = function (e) {
      spark.append(e.target.result);
      let md5 = spark.end();
      resolve(md5);
    };
  });
};
const getFileInfo = async file => {
  let fileInfo = {
    name: file.name,
    type: file.type,
  };
  //  生成临时路径
  fileInfo.fileUrl = window.URL.createObjectURL(file);
  file.fileUrl = fileInfo.fileUrl;
  //  获取全部文件信息
  fileInfo.suffix = getSuffix(file)
  fileInfo.formatSize = formatSize(file);
  fileInfo.lastUpdateTime = getLatiTime(file.lastModified);
  let sizeData = await getPxSize(file);
  Object.assign(fileInfo, sizeData);
	fileInfo.fileMd5 = await getFileMd5(file)
  return fileInfo;
};

export { getFileInfo, formatSize, getSuffix, getPxSize, getFileMd5 };
