<script lang="ts">
  interface Props {
    text: string;
    ref?: HTMLElement;
  }

  let { text = '', ref = $bindable() }: Props = $props();
</script>

<div class="handout fantasy-wanted" bind:this={ref}>
  <div class="wanted-header">
    <div class="wanted-title">WANTED</div>
    <div class="wanted-subtitle">DEAD OR ALIVE</div>
  </div>

  <div class="portrait-frame">
    <div class="portrait-placeholder">⚖</div>
  </div>

  <div class="reward-section">
    <span class="reward-label">REWARD</span>
    <span class="reward-amount">500 GOLD</span>
  </div>

  <div class="divider-vertical"></div>

  <div class="description">
    <div class="description-header">DESCRIPTION</div>
    <div class="body-text">{text}</div>
  </div>

  <div class="wanted-footer">
    <span>Issued by the Sheriff of Thornwood</span>
  </div>
</div>

<style>
  .handout.fantasy-wanted {
    background-color: #d4c495;
    background-image:
      radial-gradient(ellipse at 20% 10%, rgba(255, 250, 230, 0.5) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 25%, rgba(180, 140, 60, 0.35) 0%, transparent 45%),
      radial-gradient(ellipse at center, rgba(230, 200, 140, 0.95) 0%, rgba(195, 155, 85, 0.9) 100%);
    box-shadow:
      inset 0 0 50px rgba(90, 55, 20, 0.2),
      inset 0 0 100px rgba(60, 35, 10, 0.1),
      0 6px 24px rgba(0, 0, 0, 0.35);

    width: 650px;
    min-height: 900px;
    padding: 28px;
    position: relative;
    font-family: 'Rye', 'Georgia', serif;
    display: block;
    overflow: hidden;
  }

  .wanted-header {
    text-align: center;
    border: 5px double #2a1505;
    padding: 1.2rem 0 0.8rem;
    margin-bottom: 1.5rem;
    background: rgba(180, 130, 50, 0.15);
  }

  .wanted-title {
    font-size: 3.2rem;
    color: #1a0800;
    letter-spacing: 0.15em;
    text-shadow: 2px 2px 0 rgba(255, 255, 255, 0.3);
    line-height: 1;
  }

  .wanted-subtitle {
    font-size: 1.4rem;
    color: #3a1a05;
    letter-spacing: 0.4em;
    margin-top: 0.2rem;
  }

  .portrait-frame {
    width: 220px;
    height: 220px;
    border: 6px solid #2a1505;
    margin: 0 auto 1.5rem;
    background: rgba(60, 30, 10, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .portrait-placeholder {
    font-size: 4rem;
    color: #4a2a10;
    opacity: 0.6;
  }

  .reward-section {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;
    padding: 0.8rem;
    border: 3px solid #2a1505;
    margin-bottom: 1.5rem;
    background: rgba(180, 80, 20, 0.1);
  }

  .reward-label {
    font-size: 1.1rem;
    color: #2a1505;
    letter-spacing: 0.2em;
  }

  .reward-amount {
    font-size: 2rem;
    color: #5a2010;
    font-weight: bold;
  }

  .divider-vertical {
    height: 2px;
    background: linear-gradient(to right, transparent, #3a2010 15%, #3a2010 85%, transparent);
    margin: 0 2rem 1.5rem;
  }

  .description {
    padding: 0 2rem;
  }

  .description-header {
    font-size: 1.2rem;
    color: #2a1505;
    letter-spacing: 0.25em;
    text-align: center;
    margin-bottom: 1rem;
    border-bottom: 1px solid #6a4020;
    padding-bottom: 0.5rem;
  }

  .body-text {
    font-size: 1rem;
    line-height: 1.8;
    color: #1e0d02;
    text-align: justify;
    white-space: pre-wrap;
    hyphens: auto;
  }

  .wanted-footer {
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    text-align: center;
    font-size: 0.85rem;
    color: #3a2010;
    letter-spacing: 0.1em;
    opacity: 0.8;
  }
</style>
