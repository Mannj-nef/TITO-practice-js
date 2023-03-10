function SignUp() {
  return `
    <div class="form-wrapp">
    <form id="form-sign-up" class="form-login" autocomplete="off">
      <h2 class="form-title">Wellcome back</h2>
      <p class="form-sub-title">Wellcome back! Please enter your details.</p>
      <div class="form-wrapp-input">
        <label for="email" class="form-label">Email address</label>
        <input
          id="email"
          type="text"
          class="form-input"
          placeholder="Enter your email address..."
        />
      </div>
      <div class="form-wrapp-input">
        <label for="password" class="form-label">Password</label>
        <div class="form-wrapp-password">
          <input
            id="password"
            type="password"
            class="form-input"
            placeholder="Enter your password..."
          />
          <div class="show-password">
            <include src="./assets/iconEye.svg"></include>
          </div>
        </div>
      </div>
      <div class="form-wrapp-input">
        <label for="confirm-password" class="form-label">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          class="form-input"
          placeholder="Enter your confirm password..."
        />
      </div>
      <button class="btn submit-form">
        <div class="loading d-none"></div>
        <span class="">Sign up</span>
      </button>
      <p class="confirm-is-account">
        Don't have an account? <span class="login-link"> Sign up</span>
      </p>
    </form>
  </div>
  
    `;
}

export default SignUp;
