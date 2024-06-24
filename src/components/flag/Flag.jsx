import { useEffect, useState } from "react";
import { convertEmojiToPng } from "../../helpers/convertEmojiToPng";

const Flag = ({ emoji }) => {
  const [src, setSrc] = useState();
  useEffect(() => {
    const imageSrc = convertEmojiToPng(emoji);
    setSrc(imageSrc);
  }, [emoji]);
  return <img src={src} alt="flag" />;
};

export default Flag;
