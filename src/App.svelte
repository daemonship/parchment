<script lang="ts">
  import FantasyLetter from './templates/FantasyLetter.svelte';
  import FantasyWantedPoster from './templates/FantasyWantedPoster.svelte';
  import FantasyTavernMenu from './templates/FantasyTavernMenu.svelte';
  import GothicJournalEntry from './templates/GothicJournalEntry.svelte';
  import GothicNewspaperClipping from './templates/GothicNewspaperClipping.svelte';
  import GothicTelegram from './templates/GothicTelegram.svelte';
  import { downloadHandout } from './lib/renderer';

  // Template definitions
  type Genre = 'fantasy' | 'gothic';
  type TemplateId =
    | 'fantasy-letter'
    | 'fantasy-wanted'
    | 'fantasy-tavern'
    | 'gothic-journal'
    | 'gothic-newspaper'
    | 'gothic-telegram';

  interface Template {
    id: TemplateId;
    name: string;
    genre: Genre;
    component: any;
    defaultText: string;
  }

  const templates: Template[] = [
    {
      id: 'fantasy-letter',
      name: 'Fantasy Letter',
      genre: 'fantasy',
      component: FantasyLetter,
      defaultText: `My dearest and most honoured companion,

I write to thee in the shadow of great urgency, for the matter which hath brought me to this forsaken crossroads brook no further delay. The eastern road is not safe — the brigands of the Thornwood have grown bold since the garrison withdrew, and three merchants were set upon not a fortnight past.

Make thy way instead through the village of Millhaven and seek lodging at the sign of the Crossed Keys. The innkeeper, one Aldric Brewbourne, is a man of honour and will know where I am to be found.

I trust thy sword arm is rested and thy wits sharp, for I fear we shall need both before this business is concluded.

Until we meet again, I remain thy faithful ally.`
    },
    {
      id: 'fantasy-wanted',
      name: 'Wanted Poster',
      genre: 'fantasy',
      component: FantasyWantedPoster,
      defaultText: `The individual known as "Blackjack" Malloy is wanted for crimes including highway robbery, assault on a crown official, and the theft of the Earl's signet ring.

Male human, approximately 30 years of age, 5'11" in height, with dark hair cut short and a distinctive scar running from left temple to jawline. Often wears a leather jerkin and carries a shortsword with a bird's-head pommel. Speaks with a common northern accent.

May be armed and dangerous. Approach with caution.`
    },
    {
      id: 'fantasy-tavern',
      name: 'Tavern Menu',
      genre: 'fantasy',
      component: FantasyTavernMenu,
      defaultText: `THE CROSSed KEYS
~ Purveyor of Fine Fare & Drink ~

STARTERS
Roasted Garlic Soup ............ 3 cp
Hearth-Baked Bread ............. 1 cp
Cheese & Pickle Platter ........ 4 cp

MAIN COURSES
Hunter's Stew .................. 5 cp
Roasted Chicken w/ Herbs ....... 8 cp
Grilled Trout .................. 6 cp
Boar's Leg ..................... 1 sp

DRINKS
Ale (Pint) ..................... 2 cp
Fine Wine ........................ 5 cp
Mead ............................ 4 cp

~ Ask about our daily specials! ~`
    },
    {
      id: 'gothic-journal',
      name: 'Journal Entry',
      genre: 'gothic',
      component: GothicJournalEntry,
      defaultText: `October the 24th, 1892

The nightmares have returned. Each night now I see the same vision — a great house upon a cliff, its windows like eyes watching me, and the sound of the sea crashing against rocks below. I wake screaming, drenched in cold sweat.

Dr. Williams says it is merely exhaustion, that my mind is playing tricks upon me. But I know what I saw. I know what I felt. The house is calling to me. I feel its pull even as I write these words.

I have decided to travel to Blackwood Manor on the morrow. I must know the truth. I must understand why this house haunts my every waking hour.

If I do not return, burn this journal.`
    },
    {
      id: 'gothic-newspaper',
      name: 'Newspaper Clipping',
      genre: 'gothic',
      component: GothicNewspaperClipping,
      defaultText: `MYSTERIOUS DISAPPEARANCE AT BLACKWOOD MANOR

Local authorities are investigating the strange disappearance of Mr. Jonathan Harrowe, last seen on the evening of October 24th. Mr. Harrowe, a gentleman of some means, had recently taken up residence at the infamous Blackwood Manor, a property with a dark and troubled history.

Neighbors report hearing a blood-curdling scream emanating from the property at approximately 11:47 PM. When constables arrived on the scene, they found the front door standing open and the house deserted. No trace of Mr. Harrowe has been found.

The Blackwood Manor property has been the subject of much speculation in recent years, with many locals claiming it to be cursed. This latest incident is certain to fuel further rumors.

Anyone with information regarding Mr. Harrowe's whereabouts is urged to contact Inspector Graves at Scotland Yard.`
    },
    {
      id: 'gothic-telegram',
      name: 'Telegram',
      genre: 'gothic',
      component: GothicTelegram,
      defaultText: `URGENT — STOP

DO NOT TRAVEL TO BLACKWOOD MANOR — STOP

DANGER IMMINENT — STOP

YOUR LIFE IS IN PERIL — STOP

BURN ALL PAPERS — STOP

TRUST NO ONE — STOP

WIRE IMMEDIATELY UPON RECEIPT — STOP`

    }
  ];

  // State
  let selectedGenre = $state<Genre>('fantasy');
  let selectedTemplate = $state<Template>(templates[0]);
  let text = $state(templates[0].defaultText);
  let templateRef = $state<HTMLElement | undefined>();
  let exporting = $state(false);
  let exportError = $state('');

  // Filter templates by genre
  let filteredTemplates = $derived(
    templates.filter(t => t.genre === selectedGenre)
  );

  // Handle template selection
  function selectTemplate(template: Template) {
    selectedTemplate = template;
    // Update text when template changes to fix Issue #4
    text = template.defaultText;
  }

  // Handle genre toggle
  function toggleGenre() {
    selectedGenre = selectedGenre === 'fantasy' ? 'gothic' : 'fantasy';
    // Select first template of new genre
    const firstInGenre = templates.find(t => t.genre === selectedGenre);
    if (firstInGenre) {
      selectTemplate(firstInGenre);
    }
  }

  async function handleExport() {
    if (!templateRef) return;
    exporting = true;
    exportError = '';
    
    // Get the preview inner element (parent of templateRef)
    const previewInner = templateRef.parentElement;
    let originalTransform = '';
    let originalPosition = '';
    let originalTop = '';
    let originalLeft = '';
    let originalWidth = '';
    let originalHeight = '';
    let originalZIndex = '';
    if (previewInner && previewInner.classList.contains('preview-inner')) {
      originalTransform = previewInner.style.transform;
      originalPosition = previewInner.style.position;
      originalTop = previewInner.style.top;
      originalLeft = previewInner.style.left;
      originalWidth = previewInner.style.width;
      originalHeight = previewInner.style.height;
      originalZIndex = previewInner.style.zIndex;
      // Move the element to fixed position, full size, no scaling, ensure visibility
      previewInner.style.transform = 'none';
      previewInner.style.position = 'fixed';
      previewInner.style.top = '0';
      previewInner.style.left = '0';
      previewInner.style.width = '650px';
      previewInner.style.height = '900px';
      previewInner.style.zIndex = '9999';
    }
    
    try {
      await downloadHandout(templateRef, `${selectedTemplate.id}-handout.png`);
    } catch (err) {
      exportError = err instanceof Error ? err.message : 'Export failed';
      console.error('Export error:', err);
    } finally {
      // Restore original styles
      if (previewInner && previewInner.classList.contains('preview-inner')) {
        previewInner.style.transform = originalTransform;
        previewInner.style.position = originalPosition;
        previewInner.style.top = originalTop;
        previewInner.style.left = originalLeft;
        previewInner.style.width = originalWidth;
        previewInner.style.height = originalHeight;
        previewInner.style.zIndex = originalZIndex;
      }
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
      <!-- Genre Toggle -->
      <div class="genre-toggle">
        <button
          class="genre-btn"
          class:selected={selectedGenre === 'fantasy'}
          onclick={() => toggleGenre()}
        >
          Fantasy Medieval
        </button>
        <button
          class="genre-btn"
          class:selected={selectedGenre === 'gothic'}
          onclick={() => toggleGenre()}
        >
          Gothic Horror
        </button>
      </div>

      <!-- Template Selector -->
      <div class="panel-label">Select Template</div>
      <div class="template-grid">
        {#each filteredTemplates as template}
          <button
            class="template-card"
            class:selected={selectedTemplate.id === template.id}
            onclick={() => selectTemplate(template)}
          >
            <div class="template-card-inner">
              <span class="template-icon">{template.genre === 'fantasy' ? '⚔' : '🕯'}</span>
              <span class="template-name">{template.name}</span>
            </div>
          </button>
        {/each}
      </div>

      <!-- Content Input -->
      <label class="panel-label" for="content-input">Handout Text</label>
      <textarea
        id="content-input"
        class="content-input"
        bind:value={text}
        placeholder="Enter your handout text…"
        rows={15}
      ></textarea>

      <!-- Export Button -->
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
    </div>

    <div class="preview-panel">
      <div class="preview-label">Live Preview</div>
      <div class="preview-scaler">
        <div class="preview-inner">
          {#if selectedTemplate.id === 'fantasy-letter'}
            <FantasyLetter {text} bind:ref={templateRef} />
          {:else if selectedTemplate.id === 'fantasy-wanted'}
            <FantasyWantedPoster {text} bind:ref={templateRef} />
          {:else if selectedTemplate.id === 'fantasy-tavern'}
            <FantasyTavernMenu {text} bind:ref={templateRef} />
          {:else if selectedTemplate.id === 'gothic-journal'}
            <GothicJournalEntry {text} bind:ref={templateRef} />
          {:else if selectedTemplate.id === 'gothic-newspaper'}
            <GothicNewspaperClipping {text} bind:ref={templateRef} />
          {:else if selectedTemplate.id === 'gothic-telegram'}
            <GothicTelegram {text} bind:ref={templateRef} />
          {/if}
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
    grid-template-columns: 380px 1fr;
    gap: 0;
    overflow: hidden;
  }

  /* Controls Panel */
  .controls-panel {
    background: #120f0a;
    border-right: 1px solid #3a2c14;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    overflow-y: auto;
  }

  /* Genre Toggle */
  .genre-toggle {
    display: flex;
    gap: 0.5rem;
  }

  .genre-btn {
    flex: 1;
    padding: 0.65rem 0.5rem;
    background: #1e1810;
    color: #8a7050;
    border: 1px solid #3a2c14;
    border-radius: 4px;
    font-family: 'IM Fell English', Georgia, serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .genre-btn:hover {
    background: #2a2018;
    border-color: #5a4020;
  }

  .genre-btn.selected {
    background: #7a4f1a;
    color: #f5e6c8;
    border-color: #a06830;
  }

  /* Template Grid */
  .panel-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #8a7050;
  }

  .template-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
  }

  .template-card {
    background: #1e1810;
    border: 2px solid #3a2c14;
    border-radius: 6px;
    padding: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .template-card:hover {
    background: #2a2018;
    border-color: #5a4020;
  }

  .template-card.selected {
    background: #3a2815;
    border-color: #a06830;
  }

  .template-card-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
  }

  .template-icon {
    font-size: 1.4rem;
    opacity: 0.8;
  }

  .template-name {
    font-size: 0.7rem;
    text-align: center;
    color: #d4c090;
    line-height: 1.2;
  }

  /* Content Input */
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
    min-height: 200px;
  }

  .content-input:focus {
    outline: none;
    border-color: #7a5028;
  }

  /* Actions */
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

  /* Preview Panel */
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
    transform: scale(0.7);
  }

  /* Mobile Layout */
  @media (max-width: 900px) {
    .editor {
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
    }

    .controls-panel {
      border-right: none;
      border-bottom: 1px solid #3a2c14;
      max-height: 50vh;
    }

    .preview-panel {
      min-height: 50vh;
    }

    .preview-inner {
      transform: scale(0.5);
    }

    /* Make preview read-only on mobile by visual indication */
    .preview-panel::after {
      content: 'Preview (read-only)';
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(26, 22, 16, 0.95);
      color: #6a5030;
      text-align: center;
      padding: 0.5rem;
      font-size: 0.75rem;
      border-top: 1px solid #3a2c14;
    }
  }

  @media (max-width: 600px) {
    .template-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .app-header {
      padding: 1rem;
    }

    .app-header h1 {
      font-size: 1.4rem;
    }

    .controls-panel {
      padding: 1rem;
    }

    .preview-inner {
      transform: scale(0.4);
    }
  }
</style>
