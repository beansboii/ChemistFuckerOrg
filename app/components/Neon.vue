<template>
    <div class="chemist">Chemist</div>
    <div class="fucker">Fucker™ </div>
    <div class="org">.org</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Audiowide&family=Monoton&family=Vampiro+One&display=swap');

.chemist {
  font-family: Monoton;
  color: #FB4264;
  font-size: 12vw;
  line-height: 9vw;
  text-shadow: 0 0 3vw #F40A35;
}

.fucker {
  font-family: Audiowide;
  color: #426DFB;
  font-size: 12vw;
  line-height: 12vw;
  text-shadow: 0 0 3vw #2356FF;
}
.org {
  font-family: Vampiro One;
  color: #b043fc;
  font-size: 7vw;
  line-height: 7vw;
  text-shadow: 0 0 3vw #b242fd;
  text-align: center;
}

.chemist {
  animation: chemist 1s ease infinite;
  -moz-animation: chemist 1s ease infinite;
  -webkit-animation: chemist 1s ease infinite;
}

@keyframes chemist {
  0%,
  100% {
    text-shadow: 0 0 1vw #FA1C16, 0 0 3vw #FA1C16, 0 0 10vw #FA1C16, 0 0 10vw #FA1C16, 0 0 .4vw #FED128, .5vw .5vw .1vw #806914;
    color: #FED128;
  }
  50% {
    text-shadow: 0 0 .5vw #800E0B, 0 0 1.5vw #800E0B, 0 0 5vw #800E0B, 0 0 5vw #800E0B, 0 0 .2vw #800E0B, .5vw .5vw .1vw #40340A;
    color: #806914;
  }
}

.fucker {
  animation: fucker 2s linear infinite;
  -moz-animation: fucker 2s linear infinite;
  -webkit-animation: fucker 2s linear infinite;
  -o-animation: fucker 2s linear infinite;
}

@keyframes fucker {
  0%,
  100% {
    text-shadow: 0 0 1vw #2356FF, 0 0 3vw #2356FF, 0 0 10vw #2356FF, 0 0 10vw #2356FF, 0 0 .4vw #2356FF, .5vw .5vw .1vw #147280;
    color: #28D7FE;
  }
  50% {
    text-shadow: 0 0 .5vw #2356FF, 0 0 1.5vw #082180, 0 0 5vw #082180, 0 0 5vw #082180, 0 0 .2vw #082180, .5vw .5vw .1vw #0A3940;
    color: #146C80;
  }
}

@keyframes org {
  0%,
  100% {
    text-shadow: 0 0 1vw #b242fd, 0 0 3vw #b242fd, 0 0 10vw #b242fd, 0 0 10vw #b242fd, 0 0 .4vw #b242fd, .5vw .5vw .1vw #b242fd;
    color: #d785e0;
  }
  50% {
    text-shadow: 0 0 .5vw #5b0198, 0 0 1.5vw #5b0198, 0 0 5vw #5b0198, 0 0 5vw #5b0198, 0 0 .2vw #5b0198, .5vw .5vw .1vw #0A3940;
    color: #5e3465;
  }
}
.org {
  animation: org 2s linear infinite;
  -moz-animation: org 2s linear infinite;
  -webkit-animation: org 2s linear infinite;
  -o-animation: org 2s linear infinite;
}


</style>