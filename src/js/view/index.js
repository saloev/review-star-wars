import EventsName, { globalEvents as reactiveData } from "../events/index";

import BaseLayout from "./BaseLayout";
import APILoader from "./APIRequestProgressLoader";
import AppLayout from "./AppLayout";
import FilmList from "./FilmList";

export default () => {
  const components = [
    {
      component: APILoader,
    },
    {
      component: AppLayout,
    },
    {
      component: BaseLayout,
      waitUntilDataLoaded: true,
    },
    {
      component: FilmList,
      waitUntilDataLoaded: true,
    },
  ];

  components.forEach(({ component: Component, waitUntilDataLoaded }) => {
    if (waitUntilDataLoaded) {
      reactiveData.subscribe(EventsName.APPLICATION_READY, () => {
        const newComponent = new Component();
        newComponent.init();
      });
    } else {
      const newComponent = new Component();
      newComponent.init();
    }
  });
};
