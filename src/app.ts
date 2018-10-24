import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-framework';

export class App {
  public title: string = "LoginRadius Aurelia Demo";
  private router: Router;

  constructor() {}

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = "LoginRadius Aurelia Demo";
    config.map([
      {route: '', moduleId: PLATFORM.moduleName('./components/main-page'), name: 'main-page'},
    ]);
    this.router = router;
  }
}