class LoginComponent {
  constructor(window) {
    this._storage = window.localStorage;
    //buildLoginComponent();
  }

  buildLoginComponent() {}
}

// has to be on the bottom of the page
const init = () => {
  new LoginComponent(this);
};

window.onload = init;
