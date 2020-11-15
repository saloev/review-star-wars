import { FetchData, DOM } from "../utils/index";

import EventsName from "../events/index";

import BaseView from "./BaseView";

const inputs = [
  {
    type: "text",
    label: "Username",
    placeholder: "User Name",
    status: "",
    value: "",
    class: "",
    required: true,
    validate(v) {
      return !v || v.length < 2;
    },
    errorMsg: "User name must containe more then 2 characters",
  },
  {
    type: "email",
    label: "Email",
    placeholder: "test@test.com",
    status: "",
    value: "",
    class: "",
    required: true,
    validate(v) {
      return (
        !v ||
        !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        )
      );
    },
    errorMsg: "Incorent email",
  },
  {
    type: "text",
    label: "Review",
    placeholder: "It was sooo good :)",
    status: "",
    msg: "",
    value: "",
    required: true,
    tag: "textarea",
    validate(v) {
      return !v || v.length < 10;
    },
    errorMsg: "Review name must containe more then 10 characters",
  },
];

export default class Review extends BaseView {
  inputs = inputs;

  constructor(id) {
    super(".main-content");
    const films = super.getFromLS("list");
    this.film = films.find(({ episode_id }) => episode_id === +id);
  }

  modalTemplate(content = "") {
    return `<div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content has-background-white pa-2">
      ${content}
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>`;
  }

  formTemaplate() {
    const form = this.inputs.reduce(
      (
        html,
        {
          type,
          label,
          placeholder,
          status,
          value,
          required,
          msg,
          tag,
          disabled,
        }
      ) => {
        const input = `<div class="field">
      <label class="label">${label}</label>
      <div class="control">
        <${tag || "input"} 
          class="input ${status} ${tag}" 
          type="${type}" 
          placeholder="${placeholder}" 
          value="${value}" 
          ${required ? "required" : ""}
          ${disabled ? "disabled" : ""}
        >${tag ? `${value} </${tag}>` : ""}
      </div>
      <p class="help ${status}">${msg || ""}</p>
    </div>`;

        return `${html}${input}`;
      },
      ""
    );

    return `
      <form class="form">
        ${form}
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-primary form__submit-btn">Submit</button>
          </div>
          <div class="control">
            <button class="button is-primary is-light form__reset-btn" type="reset">Cancel</button>
          </div>
        </div>
      </form>`;
  }

  reviewTemplate({
    title,
    episode_id: id,
    director,
    producer,
    opening_crawl: desc,
    release_date: releaseDate,
  }) {
    return `
    <div class="content is-large has-text-left">
      <p>${desc}</p>
      <h3>Reveiw ${title}</h3>
      ${this.formTemaplate()}
      ${this.modalTemplate()}
    </div>
    `;
  }

  init = () => {
    this.renderHTML();
    this.initEvents();
  };

  renderHTML() {
    super.setTitleAndSubtitle(
      this.film.title,
      `Director: ${this.film.director}`
    );

    const baseTemplate = `
    <div class="container px-4">
      <div class="is-flex is-justify-content-flex-start">
        <button class="back-btn is-primary button mb-4">Back</button>
      </div>
      ${this.reviewTemplate(this.film)}
    </div>
    `;
    super.render(`${baseTemplate}`);
  }

  toggleModalVisibility(isShow, content = "") {
    const stateClass = "is-active";
    const modal = super.select(".modal");
    if (isShow) modal.classList.add(stateClass);
    else modal.classList.remove(stateClass);

    const modalContent = modal.querySelector(".modal-content");
    super.render(isShow ? content : "", modalContent);
  }

  reRenderForm(form) {
    super.render(this.formTemaplate(), form);
  }

  setInputFileds(values, form) {
    this.inputs = this.inputs.map((input) => {
      Object.keys(values).forEach((key) => {
        input[key] = values[key];
      });
      return input;
    });
    this.reRenderForm(form);
  }

  showSubmitStatus(status, inputs) {
    const dispatchStatusColor = {
      success: "has-text-success",
      error: "has-text-danger",
    };
    const content = `<div class="content p-5 is-large">
    <h3 class="mt-0 ${
      dispatchStatusColor[status]
    }"> ${status.toUpperCase()}</h3>
    <p>${inputs.map((input) => `${input.value}`).join(" ")}</p>
  </div>`;

    this.toggleModalVisibility(true, content);
  }

  initEvents = () => {
    const btn = super.select(".back-btn");
    btn.onclick = () => {
      super.commit(EventsName.BACK_TO_MAIN_PAGE);
    };
    super.listen(EventsName.BACK_TO_FILM_PAGE, this.renderHTML);

    const form = super.select(".form");
    const resetBtn = super.select(".form__reset-btn");

    form.onsubmit = (e) => {
      e.preventDefault();

      let needToSubmit = true;
      this.inputs = this.inputs.map((item) => {
        const { value } = super.select(
          `${item.tag || "input"}[type='${item.type}']`
        );
        item.value = value;
        if (item.validate(value)) {
          needToSubmit = false;
          item.status = "is-danger";
          item.msg = item.errorMsg;
        } else {
          item.status = "is-success";
          item.msg = "";
        }
        return item;
      });

      this.reRenderForm(form);

      if (!needToSubmit) return;

      this.setInputFileds({ disabed: true }, form);
      FetchData.submitForm()
        .then((res) => {
          const copyInputs = this.inputs.map((item) => item);
          this.showSubmitStatus("success", copyInputs);
          this.setInputFileds({ disabed: false, value: "", status: "" }, form);
        })
        .catch((e) => {
          console.error(e);
          this.setInputFileds({ disabed: false }, form);
        });
    };

    resetBtn.onclick = () => {
      this.inputs = inputs;
      this.init();
    };

    ["modal-close", "modal-background"].forEach((item) => {
      const elem = super.select(`.${item}`);
      elem.onclick = () => this.toggleModalVisibility(false);
    });
  };
}
