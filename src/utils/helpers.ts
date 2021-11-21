
export const downloadFile = (content: string, filename: string) => {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

export const copy = (text: string) => {
  const input = document.createElement('textarea')
  input.innerHTML = text;
  document.body.appendChild(input);
  input.select();
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}

export const getFirstLineOfString = (content: string): string => {
  return content.split('\n')[0]
}

export const removeContentFromString = (content: string, char: string): string => {
  return content.replace(/char/g, '')
}
