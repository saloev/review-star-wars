import { LS_GLOBAL_DATA } from "../config/config";

import { Event, DOM } from "../utils/index";

import { globalEvents as reactiveData } from "../events/index";

import { LSAPI } from "../utils/index";

/**
 * Render HTML to given element
 */
export default class BaseView {
  /**
   *
   * @param {String} appendTo any valid css selector
   */
  constructor(appendTo, to = document.body) {
    this.node = DOM.select(to, `${appendTo}`);
    if (!this.node) {
      throw Error(`DOM element not found by selector ${appendTo}`);
    }
  }

  /**
   *
   * @param {String} elemSelector any valid css selector
   */
  select(elemSelector) {
    const node = DOM.select(document.body, elemSelector);

    if (!node) {
      throw Error(`Element not found by selector ${elemSelector}`);
    }

    return node;
  }

  /**
   * Call function for specific event
   * @param {String} name event name
   * @param {Function} func
   */
  listen(name, func) {
    reactiveData.subscribe(name, func, this);
  }

  /**
   * dispatch event and send data
   * @param {String} name
   * @param {any} data
   */
  commit(name, data) {
    reactiveData.publish(name, data);
  }

  /**
   * Save data to Local Storage
   * @param {String} key updated key data of LS
   * @param {Any} newData new data
   * @param {String} from updated LS object
   */
  updateLS(key, newData, from = LS_GLOBAL_DATA) {
    const value = LSAPI.getItem(from) || {};
    const newValue = { ...value, [key]: newData };
    LSAPI.setItem(from, newValue);
  }

  /**
   *
   * @param {String} key
   * @param {String} from
   */
  getFromLS(key, from = LS_GLOBAL_DATA) {
    const value = LSAPI.getItem(from) || {};
    return value[key];
  }

  /**
   *
   * @param {Array{String}} events
   * @param {Array{Functions}} funcs
   * @param {DOMElement} to
   */
  bindEvents(events, funcs, to = this.node) {
    events.forEach((event, index) => {
      Event.listen(event, funcs[index], to);
    });
  }

  /**
   * Render HTML string to node
   * @param {String} html
   */
  render(html, to = this.node) {
    DOM.renderHTML(to, html);
  }

  /**
   * Set page title and subtitle
   * @param {string} title
   * @param {string} subtitle
   */
  setTitleAndSubtitle(title, subtitle) {
    const titleEl = this.select(".main-header__title");
    const subtitleEl = this.select(".main-header__subtitle");
    this.render(title, titleEl);
    this.render(subtitle, subtitleEl);
  }
}
