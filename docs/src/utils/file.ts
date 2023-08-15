
/**
 * 读取文件的文本内容
 */
export const readFileAsText = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      const result = e.target!.result || '{}'
      resolve(result)
    })

    reader.readAsText(file)
  })
}
