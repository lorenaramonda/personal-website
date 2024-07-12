<template>
  <div class="flip-box">
    <div class="flip-box-inner">
      <div class="flip-box-front">
        <slot name="front" />
      </div>
      <div class="flip-box-back">
        <slot name="back" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.flip-box {
  width: 100px;
  height: 100px;
  perspective: 1000px;
  border-radius: 100%;
  padding: 5px;
  border: dashed 2px color('main');
  margin: 0 auto;
}

.flip-box-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-box:hover .flip-box-inner {
  transform: rotateY(180deg);
}

.flip-box-front,
.flip-box-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-box-front {
  img {
    border-radius: 100%;
  }
}
.flip-box-back {
  transform: rotateY(180deg);
}
</style>
