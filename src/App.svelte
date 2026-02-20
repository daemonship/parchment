<script lang="ts">
  let count = $state(0);

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }
</script>

<div class="container">
  <h1>TTRPG Handout Generator</h1>
  <p>Project scaffolded successfully!</p>
  
  <div class="counter">
    <button onclick={decrement}>-</button>
    <span>{count}</span>
    <button onclick={increment}>+</button>
  </div>
</div>

<style>
  .container {
    text-align: center;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 2rem;
    color: #666;
  }

  .counter {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    border: 2px solid #333;
    background: #fff;
    border-radius: 0.25rem;
  }

  button:hover {
    background: #f0f0f0;
  }

  span {
    font-size: 2rem;
    min-width: 3rem;
  }
</style>
