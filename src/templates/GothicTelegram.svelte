<script lang="ts">
  interface Props {
    text: string;
    ref?: HTMLElement;
  }

  let { text = '', ref = $bindable() }: Props = $props();

  const today = new Date();
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
                      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const timeStr = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}`;
  const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
  const msgNum = Math.floor(Math.random() * 9000) + 1000;
</script>

<div class="handout gothic-telegram" bind:this={ref}>
  <div class="telegram-header">
    <div class="header-ornament">✦ ✦ ✦</div>
    <div class="telegram-badge">
      <span class="badge-text">WESTERN UNION TELEGRAM</span>
    </div>
    <div class="header-ornament">✦ ✦ ✦</div>
  </div>

  <div class="telegram-meta">
    <div class="meta-row">
      <span class="meta-label">MSG NO</span>
      <span class="meta-value">{msgNum}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">DATE</span>
      <span class="meta-value">{dateStr}</span>
    </div>
    <div class="meta-row">
      <span class="meta-label">TIME</span>
      <span class="meta-value">{timeStr}</span>
    </div>
  </div>

  <div class="telegram-divider"></div>

  <div class="telegram-content">
    <div class="body-text">{text}</div>
  </div>

  <div class="telegram-divider"></div>

  <div class="telegram-footer">
    <p class="footer-service">SEND REPLY PAID • WIRE OR PHONE</p>
    <p class="footer-code">☞ TRANSMISSION END ☜</p>
  </div>
</div>

<style>
  .handout.gothic-telegram {
    background-color: #f0ebe0;
    background-image:
      radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.6) 0%, transparent 60%),
      radial-gradient(ellipse at center, rgba(250, 245, 235, 0.95) 0%, rgba(235, 228, 215, 0.9) 100%);
    box-shadow:
      inset 0 0 30px rgba(40, 38, 35, 0.08),
      0 6px 28px rgba(0, 0, 0, 0.25);

    width: 650px;
    min-height: 900px;
    padding: 32px;
    position: relative;
    font-family: 'Special Elite', 'Courier New', monospace;
    display: block;
    overflow: hidden;
  }

  /* Paper texture */
  .handout.gothic-telegram::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 28px,
        rgba(100, 95, 85, 0.03) 28px,
        rgba(100, 95, 85, 0.03) 29px
      );
    pointer-events: none;
  }

  .telegram-header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .header-ornament {
    font-size: 1rem;
    color: #2a2520;
    letter-spacing: 0.3em;
    opacity: 0.6;
  }

  .telegram-badge {
    border: 3px double #1a1510;
    padding: 0.6rem 1.5rem;
    background: rgba(30, 28, 25, 0.05);
  }

  .badge-text {
    font-size: 1.1rem;
    color: #0a0805;
    letter-spacing: 0.15em;
    font-weight: bold;
  }

  .telegram-meta {
    display: flex;
    justify-content: center;
    gap: 3rem;
    padding: 1rem;
    background: rgba(40, 38, 35, 0.05);
    border: 1px solid #5a5550;
    margin-bottom: 1rem;
  }

  .meta-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }

  .meta-label {
    font-size: 0.65rem;
    color: #4a4540;
    letter-spacing: 0.15em;
  }

  .meta-value {
    font-size: 1rem;
    color: #1a1510;
    letter-spacing: 0.08em;
  }

  .telegram-divider {
    height: 2px;
    background: linear-gradient(to right, transparent, #3a3530 10%, #3a3530 90%, transparent);
    margin: 0.8rem 0;
  }

  .telegram-content {
    padding: 1.5rem 2rem;
    min-height: 450px;
    position: relative;
  }

  /* Typewriter effect */
  .telegram-content::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      rgba(30, 28, 25, 0.1) 0px,
      rgba(30, 28, 25, 0.1) 1px,
      transparent 1px,
      transparent 28px
    );
  }

  .body-text {
    font-size: 1.1rem;
    line-height: 1.9;
    color: #1a1510;
    white-space: pre-wrap;
    position: relative;
    z-index: 1;
  }

  .telegram-footer {
    text-align: center;
    padding-top: 1rem;
  }

  .footer-service {
    font-size: 0.75rem;
    color: #3a3530;
    letter-spacing: 0.12em;
    margin: 0;
  }

  .footer-code {
    font-size: 1.2rem;
    color: #1a1510;
    letter-spacing: 0.2em;
    margin: 0.8rem 0 0;
    font-weight: bold;
  }
</style>
