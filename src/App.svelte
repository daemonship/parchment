<script lang="ts">
  import FantasyLetter from './templates/FantasyLetter.svelte';
  import { downloadHandout } from './lib/renderer';

  const DEFAULT_TEXT = `My dearest and most honoured companion,

I write to thee in the shadow of great urgency, for the matter which hath brought me to this forsaken crossroads brook no further delay. The eastern road is not safe — the brigands of the Thornwood have grown bold since the garrison withdrew, and three merchants were set upon not a fortnight past.

Make thy way instead through the village of Millhaven and seek lodging at the sign of the Crossed Keys. The innkeeper, one Aldric Brewbourne, is a man of honour and will know where I am to be found.

I trust thy sword arm is rested and thy wits sharp, for I fear we shall need both before this business is concluded.

Until we meet again, I remain thy faithful ally.`;

  let text = $state(DEFAULT_TEXT);
  let templateRef = $state<HTMLElement | undefined>();
  let exporting = $state(false);
  let exportError = $state('');

  async function handleExport() {
    if (!templateRef) return;
    exporting = true;
    exportError = '';
    try {
      await downloadHandout(templateRef, 'fantasy-letter-handout.png');
    } catch (err) {
      exportError = err instanceof Error ? err.message : 'Export failed';
    } finally {
      exporting = false;
    }
  }
</script>

<div class="app">
  <header class="app-header">
    <h1>Parchment</h1>
    <p class="tagline">TTRPG Handout Generator</p>
  </header>

  <main class="editor">
    <div class="controls-panel">
      <label class="panel-label" for="content-input">Handout Text</label>
      <textarea
        id="content-input"
        class="content-input"
        bind:value={text}
        placeholder="Enter your handout text…"
        rows={20}
      ></textarea>

      <div class="actions">
        <button
          class="export-btn"
          onclick={handleExport}
          disabled={exporting}
        >
          {exporting ? 'Rendering…' : 'Export PNG'}
        </button>
        {#if exportError}
          <p class="export-error">{exportError}</p>
        {/if}
      </div>

      <div class="template-info">
        <strong>Template:</strong> Fantasy Medieval Letter
      </div>
    </div>

    <div class="preview-panel">
      <div class="preview-label">Live Preview</div>
      <div class="preview-scaler">
        <div class="preview-inner">
          <FantasyLetter {text} bind:ref={templateRef} />
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    background: #1a1610;
    color: #e8d5a0;
    display: flex;
    flex-direction: column;
  }

  .app-header {
    padding: 1.25rem 2rem;
    border-bottom: 1px solid #3a2c14;
    display: flex;
    align-items: baseline;
    gap: 1rem;
  }

  .app-header h1 {
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 1.75rem;
    color: #d4a94a;
    font-weight: normal;
    letter-spacing: 0.05em;
  }

  .tagline {
    font-size: 0.85rem;
    color: #8a7050;
  }

  .editor {
    flex: 1;
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 0;
    overflow: hidden;
  }

  /* Controls */
  .controls-panel {
    background: #120f0a;
    border-right: 1px solid #3a2c14;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
  }

  .panel-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8a7050;
  }

  .content-input {
    width: 100%;
    background: #1e1810;
    border: 1px solid #3a2c14;
    border-radius: 4px;
    color: #d4c090;
    font-family: 'Georgia', serif;
    font-size: 0.9rem;
    line-height: 1.6;
    padding: 0.75rem;
    resize: vertical;
    min-height: 280px;
  }

  .content-input:focus {
    outline: none;
    border-color: #7a5028;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .export-btn {
    width: 100%;
    padding: 0.7rem 1.5rem;
    background: #7a4f1a;
    color: #f5e6c8;
    border: 1px solid #a06830;
    border-radius: 4px;
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.15s;
  }

  .export-btn:hover:not(:disabled) {
    background: #955f20;
  }

  .export-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .export-error {
    font-size: 0.8rem;
    color: #c05040;
  }

  .template-info {
    font-size: 0.8rem;
    color: #6a5030;
    padding-top: 0.5rem;
    border-top: 1px solid #2a2010;
  }

  /* Preview */
  .preview-panel {
    display: flex;
    flex-direction: column;
    overflow: auto;
    background: #0e0c08;
  }

  .preview-label {
    padding: 0.5rem 1.5rem;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #4a3820;
    border-bottom: 1px solid #2a2010;
    flex-shrink: 0;
  }

  .preview-scaler {
    flex: 1;
    overflow: auto;
    padding: 2rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }

  .preview-inner {
    transform-origin: top center;
    /* Scale preview to fit — actual template is 650px wide */
    transform: scale(0.75);
  }
</style>
