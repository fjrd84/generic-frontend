import { GenericFrontendPage } from './app.po';

describe('generic-frontend App', function() {
  let page: GenericFrontendPage;

  beforeEach(() => {
    page = new MigrationProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
