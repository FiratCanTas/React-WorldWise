export const convertEmojiToPng = (flag) => {
  if (!flag) {
    return;
  }
  let data;
  if (/^[A-Z]{2}$/i.test(flag)) {
    data = flag
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt())
      );
  } else {
    data = flag;
  }

  const countryCode = Array.from(data, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return `https://flagcdn.com/24x18/${countryCode}.png`;
};
