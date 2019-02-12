const createElementFromHTML = (htmlString) => {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes
  return div.firstChild;
}

const insertAfter = (newNode, referenceNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

module.exports = {
  createElementFromHTML,
  insertAfter
}
