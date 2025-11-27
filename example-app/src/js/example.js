import { SafeSDK } from 'gatekeeper-sdk-capacitor';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    SafeSDK.echo({ value: inputValue })
}
