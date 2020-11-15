import EventsName, { globalEvents as reactiveData } from "../events/index";

import BaseLayout from "./BaseLayout";
import APILoader from "./APIRequestProgressLoader";
import AppLayout from "./AppLayout";
import FilmList from "./FilmList";

const Review = () => import(/* webpackChunkName: "Review" */ "./Review");

export default () => {
  const components = [
    {
      component: BaseLayout,
      type: "waitUntilDataLoaded",
    },
    {
      component: FilmList,
      type: "waitUntilDataLoaded",
    },
    {
      component: Review,
      type: "asynchronous",
    },
    {
      component: APILoader,
    },
    {
      component: AppLayout,
    },
  ];

  components.forEach(({ component: Component, type }) => {
    const dispatchComponentsType = {
      waitUntilDataLoaded: () => {
        reactiveData.subscribe(EventsName.APPLICATION_READY, () => {
          const newComponent = new Component();
          newComponent.init();
        });
      },
      asynchronous: () => {
        reactiveData.subscribe(EventsName.LOAD_ASYNC_FILES, (data) => {
          Component().then((module) => {
            const newComponent = new module.default(data);
            newComponent.init();
          });
        });
      },
    };

    if (dispatchComponentsType[type]) {
      dispatchComponentsType[type]();
    } else {
      const newComponent = new Component();
      newComponent.init();
    }
  });
};
