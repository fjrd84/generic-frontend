import { LastadAppPage } from './app.po';

describe('lastad-app App', function() {
  let page: LastadAppPage;

  beforeEach(() => {
    page = new LastadAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
