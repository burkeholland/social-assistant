<template>
  <div class="columns is-vcentered">
    <div class="column is-narrow">
      <span class="icon">
        <i class="fas fa-robot is-size-4"></i>
      </span>
    </div>
    <div class="column">
      <div class="loading-dots">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
    </div>
  </div>
</template>

<style>
.loading-dots {
  display: flex;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  margin-right: 1px;
  background: #000;
  animation: jump 1s ease infinite;
}

.dot:nth-child(2) {
  animation-delay: 0.1s;
}

.dot:nth-child(3) {
  animation-delay: 0.2s;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
