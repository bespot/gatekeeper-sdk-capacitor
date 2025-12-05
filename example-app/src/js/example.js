import { SafeSDK } from 'gatekeeper-sdk-capacitor';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .buttons-row {
        display: flex;
        gap: 10px;
        width: 100%;
      }
      .buttons-row .button {
        flex: 1;
        padding: 10px 16px;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 8px;
        text-decoration: none;
        cursor: pointer;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <p>
          <button class="button" id="Initialize" style="background-color: #007BFF; color: white; display: block; width: 100%">Initialize</button>
        </p>
        <p>
          <button class="button" id="Check Now" style="background-color: #007BFF; color: white; display: block; width: 100%">Check Now</button>
        </p>
        <div class="buttons-row">
          <button class="button" id="Subscribe" style="background-color: #28A745; color: white;">Subscribe</button>
          <button class="button" id="Unsubscribe" style="background-color: #FA120A; color: white;">Unsubscribe</button>
        </div>
        <p>
        <div class="buttons-row">
          <button class="button" id="UserId 1" style="background-color: #808080; color: white;">UserId 1</button>
          <button class="button" id="UserId 2" style="background-color: #808080; color: white;">UserId 2</button>
          <button class="button" id="UserId 3" style="background-color: #808080; color: white;">UserId 3</button>
        </div>
        </p>
        <p>
          <button class="button" id="Ask for permissions" style="background-color: #1E3F4A; color: white; display: block; width: 100%">Ask for permissions</button>
        </p>
        <p>
          <img id="image" style="max-width: 100%">
        </p>
      </main>
    </div>
    `;
    }

    async connectedCallback() {
      const initializeButton = this.shadowRoot.getElementById('Initialize');
      initializeButton.addEventListener('click', async () => {
        try {
          await SafeSDK.initialize({
            apiBaseUrl: 'https://antifraud.bespot.dev/v2',
            apiKey: 'MlKOGseZ5t1zf32YVs9JR216wvtW7jGE94xMJ5LQ',
            authTokenUrl: 'https://antifraud.auth.eu-west-1.amazoncognito.com/oauth2/token',
            clientId: '7n5n65e9uelidgneo31qs7t1hi',
            clientSecret: '1aph1feftr3ll4asqbpesi9i7ov531o0li7591rgqah2ner05edc',
            params: { debugLoggingEnabled: true },
          });
          console.log('Initialized done');
        } catch (err) {
          console.error('SafeSDK.initialize failed', err);
        }
      });

      const userId1Button = this.shadowRoot.getElementById('UserId 1');
      const userId2Button = this.shadowRoot.getElementById('UserId 2');
      const userId3Button = this.shadowRoot.getElementById('UserId 3');

      const registerUserIdButton = (button) => {
        if (!button) return;
        button.addEventListener('click', async () => {
          const userId = button.textContent.trim();
          try {
            await SafeSDK.setUserId({ userId });
            console.log('Set userId to:', userId);
          } catch (err) {
            console.error('SafeSDK.setUserId failed', err);
          }
        });
      };

      registerUserIdButton(userId1Button);
      registerUserIdButton(userId2Button);
      registerUserIdButton(userId3Button);

      const askForPermissionsButton = this.shadowRoot.getElementById('Ask for permissions');

      askForPermissionsButton.addEventListener('click', async () => {
        try {
          await SafeSDK.askForPermissions();
          console.log('Permissions requested');
        } catch (err) {
          console.error('SafeSDK.askForPermissions failed', err);
        }
      });

      const subscribeButton = this.shadowRoot.getElementById('Subscribe');
      subscribeButton.addEventListener('click', async () => {
        try {
          const { action } = await SafeSDK.subscribe();
          console.log('Subscribe action:', action.type, action.signature);
        } catch (err) {
          console.error('SafeSDK.subscribe failed', err);
        }
      });
      const checkButton = this.shadowRoot.getElementById('Check Now');
      checkButton.addEventListener('click', async () => {
        try {
          const { action } = await SafeSDK.check();
          console.log('Check action:', action.type, action.signature);
        } catch (err) {
          console.error('SafeSDK.check failed', err);
        }
      });
      const unsubscribeButton = this.shadowRoot.getElementById('Unsubscribe');
      unsubscribeButton.addEventListener('click', async () => {
        try {
          await SafeSDK.unsubscribe();
          console.log('SafeSDK.unsubscribe is done!');
        } catch (err) {
          console.error('SafeSDK.subscribe failed', err);
        }
      });
    }
  },
);

window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px 15px 15px 15px;
        text-align: center;
        background-color: #ffffff;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  },
);
