const eventRegister = ({ga, location}) => (
  selector,
  event,
  {eventTracker, beforeCallback, afterCallback},
) => {
  document.body.querySelectorAll(selector).forEach((ele, index) => {
    ele.addEventListener(event, () => {
      const id = ele.id || 'elements-' + String(index + 1)
      const label = location.href + '#' + id;

      if (eventTracker instanceof Function) {
        return eventTracker(ga, ele, event, selector, label);
      }
      defalutEventTracker(ga, ele, event, selector, label, {
        beforeCallback,
        afterCallback,
      });
    });
  });
};

const defaultEventTracker = (ga, ele, eventAction, eventCategory, eventLabel) => {
  beforeCallback instanceof Function &&
    beforeCallback(ga, ele, eventAction, selector);
  const object = {
    eventAction,
    eventCategory,
    eventLabel,
  };
  ga('send', 'event', object);
  afterCallback instanceof Function &&
    afterCallback(ga, ele, eventAction, selector);
};

const batchEventRegister = ({ga, location}, selectors, event, options) =>
  selectors.forEach(selector => eventRegister({ga, location})(selector, event, options))

module.exports = {
  eventRegister,
  batchEventRegister,
};
