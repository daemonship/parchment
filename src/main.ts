import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';

const target = document.getElementById('app');
if (!target) {
  document.body.innerHTML =
    '<p style="color:red;padding:2rem;font-family:sans-serif">Application failed to load. Please refresh the page.</p>';
  throw new Error('Mount target #app not found in document');
}

const app = mount(App, { target });

export default app;
