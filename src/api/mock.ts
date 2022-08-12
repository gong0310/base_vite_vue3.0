import { json } from "stream/consumers";

type NameList = {
  name: string;
};
export const axios = (url: string): Promise<NameList[]> => {
  return new Promise((resolve) => {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GEt", url);
    xhr.send(null);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 1 && xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      }
    };
  });
};
