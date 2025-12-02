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
          <button class="button" id="Check Now" style="background-color: #007BFF; color: white; display: block; width: 100%">Check Now</button>
        </p>
        <div class="buttons-row">
          <button class="button" id="Subscribe" style="background-color: #28A745; color: white;">Subscribe</button>
          <button class="button" id="Unsubscribe" style="background-color: #FA120A; color: white;">Unsubscribe</button>
        </div>
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
      const self = this;

      try {
        await SafeSDK.initialize({
          apiBaseUrl: 'https://antifraud.bespot.dev/v2',
          apiKey: 'MlKOGseZ5t1zf32YVs9JR216wvtW7jGE94xMJ5LQ',
          authTokenUrl: 'https://antifraud.auth.eu-west-1.amazoncognito.com/oauth2/token',
          clientId: '7n5n65e9uelidgneo31qs7t1hi',
          clientSecret: '1aph1feftr3ll4asqbpesi9i7ov531o0li7591rgqah2ner05edc',
          params: { debugLoggingEnabled: true },
        });
      } catch (err) {
        console.error('SafeSDK.initialize failed', err);
      }

      const subscribeButton = this.shadowRoot.getElementById('Subscribe');
      subscribeButton.addEventListener('click', async () => {
        try {
          const { action } = await SafeSDK.subscribe();
          console.log('Subscribe action:', action.type, action.signature);
        } catch (err) {
          console.error('SafeSDK.subscribe failed', err);
        }
      });
      const unsubscribeButton = this.shadowRoot.getElementById('Unsubscribe');
      unsubscribeButton.addEventListener('Click', async () => {
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
