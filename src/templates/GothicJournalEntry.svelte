<script lang="ts">
  interface Props {
    text: string;
    ref?: HTMLElement;
  }

  let { text = '', ref = $bindable() }: Props = $props();

  // Generate a date in gothic style
  const today = new Date();
  const months = ['Januarius', 'Februarius', 'Martius', 'Aprilis', 'Maius', 'Junius',
                  'Julius', 'Augustus', 'September', 'October', 'November', 'December'];
  const dateStr = `${today.getDate()} of ${months[today.getMonth()]}, Anno Domini ${today.getFullYear()}`;
</script>

<div class="handout gothic-journal" bind:this={ref}>
  <div class="journal-cover">
    <div class="journal-emblem">🕯</div>
    <h2 class="journal-title">Private Journal</h2>
    <p class="journal-subtitle">— Personal Observations —</p>
  </div>

  <div class="journal-date">
    <span class="date-text">{dateStr}</span>
  </div>

  <div class="journal-content">
    <div class="body-text">{text}</div>
  </div>

  <div class="journal-footer">
    <span class="footer-symbol">⊗</span>
    <span class="footer-text">Entered by my own hand</span>
  </div>
</div>

<style>
  .handout.gothic-journal {
    background-color: #e8e0d0;
    background-image:
      radial-gradient(ellipse at 15% 15%, rgba(255, 250, 240, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 85% 85%, rgba(100, 90, 80, 0.2) 0%, transparent 45%),
      radial-gradient(ellipse at center, rgba(240, 230, 210, 0.95) 0%, rgba(200, 185, 165, 0.9) 100%);
    box-shadow:
      inset 0 0 50px rgba(40, 35, 30, 0.15),
      inset 0 0 100px rgba(30, 25, 20, 0.08),
      0 6px 28px rgba(0, 0, 0, 0.35);

    width: 650px;
    min-height: 900px;
    padding: 36px;
    position: relative;
    font-family: 'Caveat', 'Georgia', serif;
    display: block;
    overflow: hidden;
  }

  /* Aged paper effects */
  .handout.gothic-journal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 60%, rgba(80, 60, 40, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 80% 30%, rgba(60, 40, 20, 0.04) 0%, transparent 25%);
    pointer-events: none;
  }

  .journal-cover {
    text-align: center;
    border-bottom: 2px solid #3a3530;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
  }

  .journal-emblem {
    font-size: 2rem;
    color: #2a2520;
    opacity: 0.7;
    margin-bottom: 0.5rem;
  }

  .journal-title {
    font-size: 2rem;
    color: #1a1510;
    font-weight: normal;
    letter-spacing: 0.15em;
    margin: 0;
    text-transform: uppercase;
  }

  .journal-subtitle {
    font-size: 0.9rem;
    color: #4a4540;
    font-style: italic;
    margin: 0.3rem 0 0;
    letter-spacing: 0.1em;
  }

  .journal-date {
    text-align: center;
    margin-bottom: 1.5rem;
    padding: 0.5rem;
    border: 1px solid #6a6560;
    border-radius: 2px;
    background: rgba(50, 45, 40, 0.05);
  }

  .date-text {
    font-size: 1.15rem;
    color: #2a2520;
    letter-spacing: 0.12em;
  }

  .journal-content {
    padding: 1rem 1.5rem;
    min-height: 500px;
    position: relative;
  }

  /* Ink stain effect */
  .journal-content::before {
    content: '';
    position: absolute;
    top: 20px;
    right: 40px;
    width: 80px;
    height: 80px;
    background: radial-gradient(ellipse, rgba(40, 30, 20, 0.08) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
  }

  .body-text {
    font-size: 1.4rem;
    line-height: 2;
    color: #1a1510;
    white-space: pre-wrap;
    position: relative;
    z-index: 1;
  }

  .journal-footer {
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid #5a5550;
    margin: 0 2rem;
  }

  .footer-symbol {
    font-size: 1rem;
    color: #3a3530;
    margin-right: 0.5rem;
  }

  .footer-text {
    font-size: 0.9rem;
    color: #4a4540;
    font-style: italic;
    letter-spacing: 0.05em;
  }
</style>
