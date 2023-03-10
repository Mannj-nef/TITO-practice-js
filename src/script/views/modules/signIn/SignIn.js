function SignIn() {
  return `
    <div class="form-wrapp">
    <form id="form-sign-in" class="form-login" autocomplete="off">
      <h2 class="form-title">Wellcome</h2>
      <p class="form-sub-title">Wellcome! Please enter your details.</p>
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
      <button class="btn submit-form">
        <div class="loading d-none"></div>
        <span class="">Sign In</span>
      </button>
      <p class="confirm-is-account">
        You have an account <span class="register-link">Sign Up</span>
      </p>
    </form>
  </div>
    `;
}
export default SignIn;