<script lang="ts">
  interface Props {
    text: string;
    ref?: HTMLElement;
  }

  let { text = '', ref = $bindable() }: Props = $props();
</script>

<div class="handout fantasy-tavern" bind:this={ref}>
  <div class="tavern-header">
    <div class="tavern-ornament">🍺 ⚜ 🍺</div>
    <h2 class="tavern-title">The Salted Boar</h2>
    <p class="tavern-subtitle">Tavern & Inn • Est. 1247</p>
    <div class="tavern-divider"></div>
  </div>

  <div class="menu-content">
    <div class="menu-intro">
      <em>Welcome, traveler! Rest thy weary bones and fill thy belly.</em>
    </div>

    <div class="body-text">{text}</div>
  </div>

  <div class="tavern-footer">
    <div class="footer-ornament">✦ ❧ ✦</div>
    <p class="footer-text">Mead & Ale Always Available • Travelers Welcome</p>
  </div>
</div>

<style>
  .handout.fantasy-tavern {
    background-color: #c9a85c;
    background-image:
      radial-gradient(ellipse at 30% 20%, rgba(255, 250, 220, 0.4) 0%, transparent 50%),
      radial-gradient(ellipse at 70% 30%, rgba(160, 110, 40, 0.35) 0%, transparent 45%),
      radial-gradient(ellipse at center, rgba(220, 180, 110, 0.95) 0%, rgba(175, 125, 50, 0.9) 100%);
    box-shadow:
      inset 0 0 60px rgba(80, 50, 15, 0.2),
      inset 0 0 120px rgba(50, 30, 10, 0.1),
      0 8px 32px rgba(0, 0, 0, 0.4);

    width: 650px;
    min-height: 900px;
    padding: 32px;
    position: relative;
    font-family: 'MedievalSharp', 'Georgia', serif;
    display: block;
    overflow: hidden;
  }

  .tavern-header {
    text-align: center;
    border: 3px solid #3d2510;
    border-radius: 4px;
    padding: 1.5rem 1rem 1rem;
    margin-bottom: 1.5rem;
    background: rgba(90, 50, 20, 0.1);
  }

  .tavern-ornament {
    font-size: 1.5rem;
    color: #4a2a10;
    letter-spacing: 0.3em;
    margin-bottom: 0.5rem;
  }

  .tavern-title {
    font-size: 2.5rem;
    color: #2a1505;
    font-weight: normal;
    letter-spacing: 0.08em;
    margin: 0;
    line-height: 1.1;
  }

  .tavern-subtitle {
    font-size: 0.95rem;
    color: #5a3520;
    font-style: italic;
    margin: 0.3rem 0 0.8rem;
    letter-spacing: 0.15em;
  }

  .tavern-divider {
    height: 2px;
    background: linear-gradient(to right, transparent, #5a3520 20%, #5a3520 80%, transparent);
  }

  .menu-content {
    border: 2px solid #4a3020;
    padding: 1.5rem 2rem;
    min-height: 500px;
    background: rgba(255, 255, 240, 0.08);
  }

  .menu-intro {
    text-align: center;
    font-size: 1.1rem;
    color: #3a2010;
    font-style: italic;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px dashed #7a5030;
  }

  .body-text {
    font-size: 1.05rem;
    line-height: 1.85;
    color: #1e0d02;
    white-space: pre-wrap;
  }

  .tavern-footer {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1rem;
  }

  .footer-ornament {
    font-size: 1.2rem;
    color: #4a2a10;
    letter-spacing: 0.4em;
  }

  .footer-text {
    font-size: 0.85rem;
    color: #5a3520;
    margin-top: 0.5rem;
    letter-spacing: 0.08em;
  }
</style>
