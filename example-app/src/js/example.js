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
      div {
        overflow-wrap: break-word;
      }

    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor</h1>
      </capacitor-welcome-titlebar>
      <main>
        <div class="buttons-row">
          <button class="button" id="EnableLogging" style="background-color: #28A745; color: white;">Enable Logging</button>
          <button class="button" id="DisableLogging" style="background-color: #FA120A; color: white;">Disable Logging</button>
        </div>
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
          <button class="button" id="LocationPermissions" style="background-color: #1E3F4A; color: white; display: block; width: 100%; height: 36px; margin-bottom:8px;">Ask for location permissions</button>
          <button class="button" id="StoragePermissions" style="background-color: #1E3F4A; color: white; display: block; width: 100%; height: 36px; margin-bottom:8px;">Ask for storage permissions (Android)</button>
          <button class="button" id="MediaAudioPermissions" style="background-color: #1E3F4A; color: white; display: block; width: 100%; height: 36px; margin-bottom:8px;">Ask for media-audio permissions (Android 13+)</button>
        </p>
          <br>
          Action: <b><label id="ActionLabel">No action result yet</label></b>
          <br>
          Signature: <b><label id="SignatureLabel">-</label></b>
        <p>
          <img id="image" style="max-width: 100%">
        </p>
      </main>
    </div>
    `;
    }

    async connectedCallback() {
      let actionListener = null;
      let errorListener = null;
      const actionLabel = this.shadowRoot.getElementById('ActionLabel');
      const signatureLabel = this.shadowRoot.getElementById('SignatureLabel');

      function updateLabel(action, signature) {
        actionLabel.textContent = action;
        signatureLabel.textContent = signature;
      }

      const enableLoggingButton = this.shadowRoot.getElementById('EnableLogging');
      enableLoggingButton.addEventListener('click', async () => {
        SafeSDK.enableLogging({ debugLoggingEnabled: true });
      });

      const disableLoggingButton = this.shadowRoot.getElementById('DisableLogging');
      disableLoggingButton.addEventListener('click', async () => {
        SafeSDK.enableLogging({ debugLoggingEnabled: false });
      });

      const initializeButton = this.shadowRoot.getElementById('Initialize');
      initializeButton.addEventListener('click', async () => {
        try {
          await SafeSDK.initialize({
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

      const askForLocationPermissionsButton = this.shadowRoot.getElementById('LocationPermissions');

      askForLocationPermissionsButton.addEventListener('click', async () => {
        try {
          await SafeSDK.askForLocationPermissions();
          console.log('Location Permissions requested');
        } catch (err) {
          console.error('SafeSDK.askForLocationPermissions failed', err);
        }
      });

      const askForStoragePermissionsButton = this.shadowRoot.getElementById('StoragePermissions');

      askForStoragePermissionsButton.addEventListener('click', async () => {
        try {
          await SafeSDK.askForStoragePermissions();
          console.log('Storage Permissions requested');
        } catch (err) {
          console.error('SafeSDK.askForStoragePermissions failed', err);
        }
      });

      const askForMediaAudioPermissionsButton = this.shadowRoot.getElementById('MediaAudioPermissions');

      askForMediaAudioPermissionsButton.addEventListener('click', async () => {
        try {
          await SafeSDK.askForMediaAudioPermissions();
          console.log('Media-audio Permissions requested');
        } catch (err) {
          console.error('SafeSDK.askForMediaAudioPermissions failed', err);
        }
      });

      const subscribeButton = this.shadowRoot.getElementById('Subscribe');
      subscribeButton.addEventListener('click', async () => {
        try {
          if (!actionListener) {
            actionListener = await SafeSDK.addListener('receivedAction', (action) => {
              updateLabel(action.type, action.signature);
            });
          }
          if (!errorListener) {
            errorListener = await SafeSDK.addListener('subscribeError', (error) => {
              console.error('SafeSDK subscribe failed', error);
              updateLabel(error.message, '-');
            });
          }
          await SafeSDK.subscribe();
        } catch (err) {
          console.error('SafeSDK.subscribe failed', err);
        }
      });
      const checkButton = this.shadowRoot.getElementById('Check Now');
      checkButton.addEventListener('click', async () => {
        try {
          const { action } = await SafeSDK.check();
          console.log('Check action:', action.type, action.signature);
          updateLabel(action.type, action.signature);
        } catch (err) {
          console.error('SafeSDK.check failed', err);
          updateLabel(err.message, '-');
        }
      });
      const unsubscribeButton = this.shadowRoot.getElementById('Unsubscribe');
      unsubscribeButton.addEventListener('click', async () => {
        try {
          await SafeSDK.unsubscribe();
          if (actionListener) {
            await actionListener.remove();
            actionListener = null;
          }
          if (errorListener) {
            await errorListener.remove();
            errorListener = null;
          }
          console.log('SafeSDK.unsubscribe is done!');
        } catch (err) {
          console.error('SafeSDK.unsubscribe failed', err);
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
