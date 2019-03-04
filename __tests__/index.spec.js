const testPath = '../index.js';

const gaMock = jest.fn((action, type, params) => {
  action, type, params;
});

const locationMock = {
  href: 'http://example.com/',
};
const windowMock = {
  ga: gaMock,
  location: locationMock,
};
describe('eventRegister', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div>' + '  <a href="" class="target" id="target-id" />' + '</div>';
    gaMock.mockClear();
  });
  test('normal', () => {
    const {eventRegister} = require(testPath);
    const selector = '.target';
    eventRegister(windowMock)(selector, 'click');

    const ele = document.querySelector(selector);
    ele.click();
    expect(gaMock.mock.calls.length).toBe(1);
    expect(gaMock.mock.calls[0]).toEqual([
      'send',
      'event',
      {
        eventAction: 'click',
        eventCategory: 'target',
        eventLabel: 'http://example.com/#target-id',
      },
    ]);
  });

  test('element has no id', () => {
    document.body.innerHTML =
      '<div>' + '  <a href="" class="target" />' + '</div>';
    const {eventRegister} = require(testPath);
    const selector = '.target';
    eventRegister(windowMock)(selector, 'click');

    const ele = document.querySelector(selector);
    ele.click();
    expect(gaMock.mock.calls.length).toBe(1);
    expect(gaMock.mock.calls[0]).toEqual([
      'send',
      'event',
      {
        eventAction: 'click',
        eventCategory: 'target',
        eventLabel: 'http://example.com/#elements-1',
      },
    ]);
  });

  test('element has no id', () => {
    document.body.innerHTML =
      '<div>' + '  <a href="" class="target" />' + '</div>';
    const {eventRegister} = require(testPath);
    const selector = '.target';
    eventRegister(windowMock)(selector, 'click');

    const ele = document.querySelector(selector);
    ele.click();
    expect(gaMock.mock.calls.length).toBe(1);
    expect(gaMock.mock.calls[0]).toEqual([
      'send',
      'event',
      {
        eventAction: 'click',
        eventCategory: 'target',
        eventLabel: 'http://example.com/#elements-1',
      },
    ]);
  });
});

describe('batchEventRegister', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div>' +
      '  <a href="" class="target-1" id="target-1" />' +
      '  <a href="" class="target-2" id="target-2" />' +
      '  <a href="" class="target-3" id="target-3" />' +
      '</div>';
    gaMock.mockClear();
  });
  test('normal', () => {
    const {batchEventRegister} = require(testPath);
    const selectors = ['.target-1', '.target-2', '.target-3'];
    batchEventRegister(windowMock, selectors, 'click');

    selectors.forEach(selector => {
      const ele = document.querySelector(selector);
      ele.click();
    })
    expect(gaMock.mock.calls.length).toBe(3);
    expect(gaMock.mock.calls[0]).toEqual([
      'send',
      'event',
      {
        eventAction: 'click',
        eventCategory: 'target-1',
        eventLabel: 'http://example.com/#target-1',
      },
    ]);
  });
});
