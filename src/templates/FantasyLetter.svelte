<script lang="ts">
  interface Props {
    text: string;
    ref?: HTMLElement;
  }

  let { text = '', ref = $bindable() }: Props = $props();
</script>

<div class="handout fantasy-letter" bind:this={ref}>
  <div class="border-frame">
    <div class="corner corner-tl">✦</div>
    <div class="corner corner-tr">✦</div>
    <div class="corner corner-bl">✦</div>
    <div class="corner corner-br">✦</div>

    <div class="content">
      <div class="ornament top-ornament">❧ ✦ ❧</div>
      <div class="divider"></div>
      <div class="body-text">{text}</div>
      <div class="divider"></div>
      <div class="ornament bottom-ornament">❧ ✦ ❧</div>
    </div>
  </div>
</div>

<style>
  .handout.fantasy-letter {
    /* html2canvas-safe parchment: CSS gradients only, no external images */
    background-color: #e8d5a0;
    background-image:
      radial-gradient(ellipse at 15% 15%, rgba(255, 248, 220, 0.55) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 20%, rgba(210, 170, 80, 0.35) 0%, transparent 45%),
      radial-gradient(ellipse at 50% 85%, rgba(180, 130, 50, 0.3) 0%, transparent 50%),
      radial-gradient(ellipse at center, rgba(248, 230, 175, 0.9) 0%, rgba(185, 135, 55, 0.95) 100%);
    /* Subtle edge aging */
    box-shadow:
      inset 0 0 60px rgba(100, 65, 10, 0.25),
      inset 0 0 120px rgba(80, 45, 5, 0.12),
      0 8px 32px rgba(0, 0, 0, 0.4);

    width: 650px;
    min-height: 900px;
    padding: 36px;
    position: relative;
    font-family: 'IM Fell English', 'Palatino Linotype', Georgia, serif;
    /* Prevent html2canvas layout issues */
    display: block;
    overflow: hidden;
  }

  .border-frame {
    border: 4px solid #3a2010;
    outline: 1.5px solid #7a5028;
    outline-offset: -10px;
    min-height: calc(900px - 72px);
    padding: 32px 40px;
    position: relative;
    display: flex;
    flex-direction: column;
  }

  /* Decorative corners */
  .corner {
    position: absolute;
    font-size: 1.1rem;
    color: #3a2010;
    line-height: 1;
  }

  .corner-tl { top: -0.7rem; left: -0.5rem; }
  .corner-tr { top: -0.7rem; right: -0.5rem; }
  .corner-bl { bottom: -0.7rem; left: -0.5rem; }
  .corner-br { bottom: -0.7rem; right: -0.5rem; }

  /* Content layout */
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0;
  }

  .ornament {
    text-align: center;
    font-size: 1.3rem;
    color: #5a3515;
    letter-spacing: 0.5em;
    padding: 0.5rem 0;
  }

  .divider {
    height: 1px;
    background: linear-gradient(to right, transparent, #7a5028 20%, #7a5028 80%, transparent);
    margin: 0.6rem 0;
  }

  .body-text {
    flex: 1;
    font-size: 1.05rem;
    line-height: 1.85;
    color: #1e0e02;
    text-align: justify;
    hyphens: auto;
    white-space: pre-wrap;
    padding: 0.5rem 0 1.5rem;
    /* Drop cap on first letter */
  }

  .body-text::first-letter {
    font-size: 3.4em;
    font-weight: normal;
    line-height: 0.8;
    float: left;
    margin: 0.05em 0.1em 0 0;
    color: #3a1a00;
  }
</style>
