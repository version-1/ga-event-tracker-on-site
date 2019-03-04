const eventRegister = ({ga, location}) => (
  selector,
  event,
  options = {},
) => {
  const { eventTracker, beforeCallback, afterCallback } = options
  document.body.querySelectorAll(selector).forEach((ele, index) => {
    ele.addEventListener(event, () => {
      const id = ele.id || 'elements-' + String(index + 1)
      const label = location.href + '#' + id;
      const eventCategory = selector.replace(/^\./, '').replace(/^#/, '')

      if (eventTracker instanceof Function) {
        return eventTracker(ga, ele, event, eventCategory, label);
      }
      defaultEventTracker(ga, ele, event, eventCategory, label, {
        beforeCallback,
        afterCallback,
      });
    });
  });
};

const defaultEventTracker = (ga, ele, eventAction, eventCategory, eventLabel, options) => {
  const { beforeCallback, afterCallback } = options
  beforeCallback instanceof Function &&
    beforeCallback(ga, ele, eventAction, eventLabel);
  const object = {
    eventAction,
    eventCategory,
    eventLabel,
  };
  ga('send', 'event', object);
  afterCallback instanceof Function &&
    afterCallback(ga, ele, object);
};

const batchEventRegister = ({ga, location}, selectors, event, options) =>
  selectors.forEach(selector => eventRegister({ga, location})(selector, event, options))

module.exports = {
  eventRegister,
  batchEventRegister,
};
