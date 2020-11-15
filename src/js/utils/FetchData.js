import { API_ENDPOINT, LS_GLOBAL_DATA } from "../config/config";
import EventsName, { globalEvents as reactiveData } from "../events/index";

import LSAPI from "./LSAPI";

function progress(percentage) {
  reactiveData.publish(EventsName.API_REQUEST, percentage);
}

/**
 * @based on @see https://learn.javascript.ru/fetch-progress and @see https://dev.to/samthor/progress-indicator-with-fetch-1loo
 *
 * Common fetch function
 *
 * @param {String} url
 * @returns {any}
 */
async function fetchDataAsync(url) {
  let needArtificialDelay = false;

  const urlPath = url.startsWith("https") ? url : `${API_ENDPOINT}/${url}`;
  // Шаг 1: начинаем загрузку fetch, получаем поток для чтения
  const response = await fetch(`${urlPath}`);

  const reader = response.body.getReader();

  // Шаг 2: получаем длину содержимого ответа
  const contentLength = +response.headers.get("Content-Length");

  // Шаг 3: считываем данные:
  let receivedLength = 0; // количество байт, полученных на данный момент
  const chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)

  for (;;) {
    // eslint-disable-next-line no-await-in-loop
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
    receivedLength += value.length;

    if (contentLength) {
      progress((receivedLength / contentLength) * 100)();
    } else {
      needArtificialDelay = true;
      progress(80);
    }
  }

  // Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
  const chunksAll = new Uint8Array(receivedLength);
  let position = 0;
  chunks.forEach((chunk) => {
    chunksAll.set(chunk, position);
    position += chunk.length;
  });

  // Шаг 5: декодируем Uint8Array обратно в строку
  const result = new TextDecoder("utf-8").decode(chunksAll);

  const parseResult = JSON.parse(result);
  if (needArtificialDelay) progress(100);

  return parseResult;
}

export default {
  filmList() {
    return fetchDataAsync("films/");
  },

  film(id) {
    return fetchDataAsync(`films/${id}/`);
  },
  submitForm(data) {
    progress(80);
    return new Promise((resolve) => {
      setTimeout(() => {
        progress(100);
        resolve();
      }, 1000);
    });
  },
};
