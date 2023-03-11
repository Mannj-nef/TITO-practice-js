class AuthController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.getLoginForm(this.handleLogin);
  }
  handleLogin = async (data) => {
    console.log({ data });

    try {
    } catch (error) {
      console.log(error);
    }
  };
}

export default AuthController;
