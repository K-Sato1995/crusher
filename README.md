
![Crusher- Low-code testing framework](https://user-images.githubusercontent.com/6849438/204544882-a0ea7aa0-625b-4547-8657-ba1a9e0acc44.png#gh-dark-mode-only)
![Crusher- Low-code testing framework](https://user-images.githubusercontent.com/6849438/204549825-4ab1f713-6068-4da4-86b0-58ddf7747f87.png#gh-light-mode-only)

<p>
  <a href="https://discord.com/invite/dHZkSNXQrg" target="_blank"><img src="https://img.shields.io/discord/789815044669177867?&labelColor=black"/></a>
 <a href="https://docs.crusher.dev" target="_blank"><img src="https://img.shields.io/static/v1?label=read&message=docs&color=blueviolet&logo=docs&labelColor=black"/></a>
 <a href="https://www.youtube.com/watch?v=Nc-TlgeKBSE" target="_blank"><img src="https://img.shields.io/static/v1?label=play&message=demo&color=e77335&logo=docs&labelColor=black"/></a>

</p>

<h2 >Crusher is fast all-in-one testing you'll ever need</h3>

New all-in-one testing framework/tool. It includes everything you need to test, low-code recorder, runner + batteries built-in.


An alternative to the *"old" testing*, where you:
-  Choose a library & runner (Jest, Cypress, Playwright, Puppeteer, etc.)
-  Build your own framework with different tools
-  Write tests that take hours
-  Maintain test whichs eats up your time
<details>
  <summary> 🤦 + more</summary>

* 🔋  Find the right selectors that work.
* 🚥  Setup CI/CD to run tests
* 💰 Start paying for every little thing ( or start building your own framework )
  * Pay for cloud services to run tests on different browser
  * Set up a reporting system to view test results - Cypress cloud
  * Image comparison tool to compare visual changes - Percy
*  🚨 And don't forget to set up alerts for test failures - Slack/Discord/Emails - plus lot more things like test management, debug, updating breaking tests etc.
</details>

![Crusher demo for test creation, running, cli](https://user-images.githubusercontent.com/6849438/204720236-4139dae2-a0e6-4ce6-a9fb-ab6788ec3cc9.gif)

It's an integrated framework built on top of playwright. Record test using **low-code or code** and it handles the rest.

Our primary focus is stability, speed, and better developer experience. **Crusher is in beta(v0.5)**. Join [Crusher's discord](https://discord.gg/dHZkSNXQrg) and help us make it better 🚀

##  Create your first test


Run ```npx crusher.dev``` in your git repo.

or [download binary](https://docs.crusher.dev/getting-started/create-your-first-test#or-install-recorder)

Reference: [Getting Started](https://docs.crusher.dev/getting-started/create-your-first-test#using-cli) | [What is Crusher](https://docs.crusher.dev/getting-started/what-is-crusher) 


## 👨🏽‍💻 Features

### Create test
- 👨🏽‍💻 **Test using low-code:** Create tests using our customized recorder based on chromium
- 📇 **Use code files:** Better APIs and more control with playwright APIs

### Run tests
- 🔋 **All major browsers supported:** 
- 👨🏽‍💻 **Built for developers:** Use modern javascript to write tests with simple workflow
- 🔥 **Fast test execution** 
- ⚡ **Blazing Fast:** Built on top of Playwright, Crusher delivers an amazing performance during execution

### Alert & Integration
- 📼 **Easy integration** with your projects
- 🦄 Central **reporting & dashboard**: See how your app is doing overall anytime-anywhere

## ⏩ Use cases
- **Test e2e user flows:** Never compromise your user experience by testing important end-to-end user flows.
- **Test UI of your project:** Never let a UI change catch you off guard.
- **Run tests locally:** Test specific functionalities of your app easily with a single click.
- **Test with every commit:** Run tests on every commit and add checks on pull requests.
- **Monitor production:** Periodically run tests for your website and get notified if something goes wrong.

## 💡 Philosophy
If you are involved in software development, you are no stranger to things breaking now and then. Sometimes it's because of a small typo/change, and sometimes because of reasons out of your control.

It seems like every time you are changing something, there is a chance of stuff breaking. The worst part is you're lost, and then someone reports the issue in prod.

Testing solves this, but it hasn't evolved. It's too complicated and sometimes hard. We're solving it by creating an integrated solution that simply works.

## 🧱 Deployment

**Crusher cloud-**  [Start using](https://crusher.dev) | Zero configuration setup
(Recommended: Faster, cheaper and less hassle)

**Self host:** Deploy using Docker or Kubernetes. [Docs](https://docs.crusher.dev/development/docker-deploy-locally)

## FAQs

- **I don't have any prior experience, Can I use Crusher?** Yes, we primarily designed Crusher to make testing easy. If you have used a browser before, you can use Crusher.
- **Low-code ain't powerful, I believe code is more powerful:-** Fair enough, we believe in both. We're also working on a code-first approach.
- **Why use this over selenium, cypress, etc?** With any library, you'll have to spend a lot of time setting up the testing framework for your project. With us, you can start testing right away. We're also built on top of playwright, which is a more stable and faster automation library.
- **Why a new framework?** Testing has not evolved. It can be quite frustrating to setup and maintain. With Crusher, we're trying to make it easy and fun.
- **Is Crusher using Electron?** Yes, we forked Electron to create our own chromium-based browser.

### Contribute to Crusher

- Setup crusher locally [Docs](https://docs.crusher.dev/development/setting-up-development-env)
- Found a bug? [File an issue](https://github.com/crusherdev/crusher/issues/new/choose)
- Wanna help. We love pull requests, too!

### License
This repo is entirely MIT licensed, except the **/src_ee directory (if applicable)**.
