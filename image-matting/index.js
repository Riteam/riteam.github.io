const color = window.color
const colorFont = window.colorFont

document.getElementById('fileSelector')
  .addEventListener('change', function (ev) {
    let file = this.files[0]
    const url = window.URL.createObjectURL(file);
    img.src = url;
  })

let img = new Image()
img.crossOrigin = 'anonymous';
img.prevUrl = null
img.onload = function () {
  console.log(img.prevUrl, img.src);
  if (img.prevUrl) {
    window.URL.revokeObjectURL(img.prevUrl)
  }
  img.prevUrl = img.src
  drawImage(img)
}
img.src = location.host === 'riteam.github.io'
  ? '/imgs/cat.jpg'
  : 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=496620333,2325269774&fm=11&gp=0.jpg'


const CV = document.getElementById('cv')
const CTX = CV.getContext('2d')

function drawImage(img) {
  CV.width = img.width
  CV.height = img.height
  CTX.drawImage(img, 0, 0, img.width, img.height);
}

CV.onclick = function (event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = CTX.getImageData(x, y, 1, 1);
  var pixelData = pixel.data;
  const rgba = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
  colorFont.innerText = rgba

  let rgb = [...pixelData]
    .slice(0, -1)
    .map(i => {
      let x16 = i.toString(16)
      if (x16.length === 1) x16 = '0' + x16
      return x16
    })
    .join('')
  color.value = `#${rgb}`

  const area = CTX.getImageData(0, 0, CV.width, CV.height)
  let newData = mattingImageData(x, y, area)
  CTX.putImageData(newData, 0, 0)
}
function mattingImageData(x, y, imageData, ApproximateThreshold = 30) {
  /**
   * ApproximateThreshold 近似阈值
   * 0 表示完全一致
   * 越大表示颜色差距越大
   */
  console.log(imageData);
  let { width, height, data } = imageData
  let row = y, col = x
  let startIndex = toIndex(row, col)
  let queue = [startIndex]
  let color = getColor(data, startIndex)
  data[startIndex + 3] = 0
  if (color[3] === 0) return imageData


  while (queue.length) {
    let curr = queue.shift()
    let [row, col] = getPos(curr);

    [
      [row + 1, col],
      [row - 1, col],
      [row, col + 1],
      [row, col - 1]
    ].forEach(([row, col]) => {
      if (row >= 0 && col >= 0 && row < height && col < width) {
        let index = toIndex(row, col)
        let nextColor = getColor(data, index)
        if (
          nextColor[3] > 0
          && isSameColor(color, nextColor)
        ) {
          data[index + 3] = 0
          queue.push(index)
        }
      }
    })
  }

  return imageData

  function getPos(index) {
    return [index / (4 * width) | 0, (index % (width * 4)) / 4]
  }
  function toIndex(row, col) {
    return row * 4 * width + col * 4
  }

  function isSameColor(c1, c2) {
    // 计算相近的颜色
    let i = 3
    let count = 0
    while (i--) {
      count += (c1[i] - c2[i]) ** 2
    }
    return Math.sqrt(count) < ApproximateThreshold
  }

  function getColor(arr, index) {
    return arr.slice(index, index + 4)
  }
}