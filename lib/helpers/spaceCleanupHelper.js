function isEscaped(text, index) {
  let backslashCount = 0;
  let i;

  for (i = index - 1; i >= 0 && text[i] === '\\'; i--) {
    backslashCount++;
  }

  return backslashCount % 2 === 1;
}

function getTagWithoutExtraSpaces(tag, startDelimiter, endDelimiter, specialChars) {
  let body = tag.slice(startDelimiter.length).slice(0, -endDelimiter.length);
  let resultBody = '';
  let i;
  let waitForChar = null;
  let specialCharSet = new Set(specialChars);

  body = body.trim();
  for (i = 0; i < body.length; i++) {
    if (waitForChar && body[i] !== waitForChar) {
      resultBody += body[i];
      continue;
    }

    if (body[i] === '"' || body[i] === "'") {
      if (!waitForChar) {
        waitForChar = body[i];
      } else if (waitForChar === body[i] && !isEscaped(body, i)) {
        waitForChar = null;
      }
    }

    if (specialCharSet.has(body[i])) {
      resultBody = resultBody.trim();
    }
    if (specialCharSet.has(resultBody[resultBody.length - 1]) && body[i] === ' ') {
      continue;
    }
    if (resultBody[resultBody.length - 1] === ' ' && body[i] === ' ') {
      continue;
    }
    if (body[i] !== '\n') {
      resultBody += body[i];
    }
  }

  return startDelimiter + resultBody + endDelimiter;
}

function clearTemplateExtraSpaces(template, startDelimiter, endDelimiter, specialChars) {
  let i;
  let startIndex = null;
  let tempSubstring;
  let resultString = '';

  for (i = 0; i < template.length + 1; i++) {
    if (startIndex !== null) {
      tempSubstring = template.substring(i - endDelimiter.length, i);
      if (tempSubstring === endDelimiter) {
        resultString += getTagWithoutExtraSpaces(
          template.substring(startIndex, i),
          startDelimiter,
          endDelimiter,
          specialChars,
        );
        startIndex = null;
      }
    }
    if (startIndex === null) {
      tempSubstring = template.substring(i, i + startDelimiter.length);
      if (tempSubstring === startDelimiter) {
        startIndex = i;
      } else if (template[i] !== undefined) {
        resultString += template[i];
      }
    }
  }

  return resultString;
}

module.exports = {
  clearTemplateExtraSpaces,
};
