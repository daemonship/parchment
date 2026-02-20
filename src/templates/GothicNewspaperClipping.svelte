<script lang="ts">
  interface Props {
    text: string;
    ref?: HTMLElement;
  }

  let { text = '', ref = $bindable() }: Props = $props();

  const today = new Date();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];
  const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
</script>

<div class="handout gothic-newspaper" bind:this={ref}>
  <div class="newspaper-header">
    <div class="header-line"></div>
    <h1 class="paper-title">The Evening Courier</h1>
    <p class="paper-tagline">"London's Premier Source for News & Tidings"</p>
    <div class="header-details">
      <span>VOL. XCII</span>
      <span class="separator">•</span>
      <span>{dateStr}</span>
      <span class="separator">•</span>
      <span>PRICE: ONE PENNY</span>
    </div>
    <div class="header-line double"></div>
  </div>

  <div class="newspaper-content">
    <div class="article-header">
      <span class="section-tag">Special Dispatch</span>
      <h2 class="article-title">IMPORTANT ANNOUNCEMENT</h2>
    </div>

    <div class="article-body">
      <div class="body-text">{text}</div>
    </div>
  </div>

  <div class="newspaper-footer">
    <div class="footer-line"></div>
    <p class="footer-text">— Advertisements —</p>
    <p class="footer-contact">Correspondence may be directed to 14 Fleet Street, London</p>
  </div>
</div>

<style>
  .handout.gothic-newspaper {
    background-color: #e8e0cc;
    background-image:
      radial-gradient(ellipse at 10% 10%, rgba(255, 255, 250, 0.5) 0%, transparent 50%),
      radial-gradient(ellipse at 90% 90%, rgba(120, 110, 90, 0.15) 0%, transparent 40%),
      radial-gradient(ellipse at center, rgba(245, 238, 220, 0.95) 0%, rgba(215, 205, 180, 0.9) 100%);
    box-shadow:
      inset 0 0 40px rgba(50, 45, 35, 0.12),
      inset 0 0 80px rgba(30, 25, 20, 0.06),
      0 6px 28px rgba(0, 0, 0, 0.3);

    width: 650px;
    min-height: 900px;
    padding: 28px;
    position: relative;
    font-family: 'Old Standard TT', 'Georgia', serif;
    display: block;
    overflow: hidden;
  }

  /* Newspaper aging */
  .handout.gothic-newspaper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      linear-gradient(90deg, rgba(30, 20, 10, 0.02) 0%, transparent 5%, transparent 95%, rgba(30, 20, 10, 0.02) 100%);
    pointer-events: none;
  }

  .newspaper-header {
    text-align: center;
    border-bottom: 3px solid #1a1510;
    padding-bottom: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .header-line {
    height: 2px;
    background: #1a1510;
    margin-bottom: 0.6rem;
  }

  .header-line.double {
    margin-top: 0.6rem;
    margin-bottom: 0;
  }

  .paper-title {
    font-size: 2.8rem;
    color: #0a0805;
    font-weight: normal;
    letter-spacing: 0.2em;
    margin: 0;
    line-height: 1.2;
  }

  .paper-tagline {
    font-size: 0.8rem;
    color: #3a3530;
    font-style: italic;
    margin: 0.2rem 0 0.6rem;
    letter-spacing: 0.08em;
  }

  .header-details {
    font-size: 0.75rem;
    color: #2a2520;
    letter-spacing: 0.1em;
  }

  .separator {
    margin: 0 0.5rem;
    opacity: 0.5;
  }

  .newspaper-content {
    padding: 0 1rem;
  }

  .article-header {
    text-align: center;
    margin-bottom: 1.2rem;
  }

  .section-tag {
    font-size: 0.7rem;
    color: #5a5045;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.4rem;
  }

  .article-title {
    font-size: 1.8rem;
    color: #0a0805;
    font-weight: normal;
    letter-spacing: 0.08em;
    margin: 0;
    line-height: 1.2;
    border-bottom: 1px solid #3a3530;
    padding-bottom: 0.6rem;
  }

  .article-body {
    column-count: 2;
    column-gap: 1.5rem;
    column-rule: 1px solid #6a6560;
    padding: 0 0.5rem;
  }

  .body-text {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #1a1510;
    text-align: justify;
    white-space: pre-wrap;
    hyphens: auto;
  }

  .newspaper-footer {
    position: absolute;
    bottom: 1.5rem;
    left: 0;
    right: 0;
    text-align: center;
    padding: 1rem;
    margin: 0 1.5rem;
    border-top: 2px double #3a3530;
  }

  .footer-line {
    height: 1px;
    background: #3a3530;
    margin-bottom: 0.6rem;
  }

  .footer-text {
    font-size: 0.8rem;
    color: #4a4540;
    letter-spacing: 0.15em;
    margin: 0;
  }

  .footer-contact {
    font-size: 0.7rem;
    color: #5a5550;
    margin: 0.4rem 0 0;
    font-style: italic;
  }
</style>
