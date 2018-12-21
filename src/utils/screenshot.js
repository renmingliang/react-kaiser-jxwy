import html2canvas from 'html2canvas' // screenshot

/**
 * Converts canvas to an image
 * @param {object} canvas 对象
 */
function convertCanvasToImage(canvas) {
  /* const image = new Image()
  image.src = canvas.toDataURL('image/png')
  return image */
  const base64 = canvas.toDataURL('image/jpeg', 1.0)
  return base64
}

/**
 * 截图 // screenshot
 * @param {String} el 元素容器
 */
function screenshot(el) {
  const opts = {
    // scale: 2, // 添加的scale 参数
    logging: false, //日志开关，便于查看html2canvas的内部执行流程
    backgroundColor: null
  };

  return new Promise((resolve, reject) => {
    html2canvas(el, opts).then(function(canvas) {

      const context = canvas.getContext('2d');
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      console.log(canvas)
      const capture = convertCanvasToImage(canvas)
      resolve(capture)
    })
  })
}

export default screenshot