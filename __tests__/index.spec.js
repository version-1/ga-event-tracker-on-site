const testPath = ('../index.js')

const gaMock = jest.fn((action, type, params) => {action, type, params})

const locationMock = {
  href: 'http://example.com/'
}
const windowMock = {
  ga: gaMock,
  location: locationMock
}
describe('eventRegister', () => {
  test('normal', () => {
    document.body.innerHTML =
       '<div>' +
       '  <a href="" class="target" id="target-id" />' +
       '</div>';
    const { eventRegister } = require(testPath)
    const selector = '.target'
    console.log('debug')
    console.log(eventRegister)
    eventRegister(windowMock)(selector, 'click')

    document.querySelector(selector).click()
    expect(gaMock.mock.calls.length).toBe(1);
  })

})
