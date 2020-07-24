<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
        <router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },
  methods: {
    polifyIosXrKeybord() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      //解决ios键盘唤起后，收回页面不回滚导致错位的问题
      $(document).on("blur", "input", function() {
        if (isiOS) {
          setTimeout(function() {
            var scrollHeight =
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;

            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
          }, 100);
        }
      });
      $(document).on("blur", "textarea", function() {
        // textarea
        if (isiOS) {
          setTimeout(function() {
            var scrollHeight =
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0;

            window.scrollTo(0, Math.max(scrollHeight - 1, 0));
          }, 100);
        }
      });
    }
  },
  created() {
    this.polifyIosXrKeybord();
    console.log('2019-10-22 22:10')
  }
};
</script>

<style>
@import "../static/css/reset.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.Router {
  position: absolute;
  width: 100%;
  transition: all 0.5s ease;
  top: 0;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100% 0);
}
</style>
