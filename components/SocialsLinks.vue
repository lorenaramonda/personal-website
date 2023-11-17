<template>
  <div class="socials row">
    <div class="tw-follow">
      <p>
        <a
          href="https://twitter.com/loreenaramonda?ref_src=twsrc%5Etfw"
          class="twitter-follow-button"
          data-size="large"
          data-dnt="true"
          data-show-count="true"
          :data-lang="currentLocale"
          rel="noopener"
        >
          {{ $t('site.follow') }} @loreenaramonda
        </a>
      </p>
    </div>
    <div class="socials__list">
      <ul>
        <li class="gh">
          <a v-tooltip="$t('social.github')" href="https://github.com/lorenaramonda" target="_blank" rel="noopener" :title="$t('social.github')">
            GitHub
          </a>
        </li>
        <li class="tw">
          <a v-tooltip="$t('social.twitter')" href="https://twitter.com/loreenaramonda" target="_blank" rel="noopener" :title="$t('social.twitter')">
            Twitter
          </a>
        </li>
        <li class="li">
          <a
            v-tooltip="$t('social.linkedin')"
            href="http://it.linkedin.com/in/lorenaramonda"
            target="_blank"
            rel="noopener"
            :title="$t('social.linkedin')"
          >
            LinkedIn
          </a>
        </li>
        <li class="sk">
          <a v-tooltip="$t('social.skype')" href="skype:lorena.ramonda?call" target="_blank" rel="noopener" :title="$t('social.skype')">Skype</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n()
const currentLocale = computed(() => {
  const lang = locales.value.find(lang => lang.code === locale.value)
  return lang.code || locale.value
})
</script>

<style lang="scss">
.socials {
  margin-top: 2em;
  margin-bottom: 2em;
  text-shadow: none !important;
  @include mq($from: tablet) {
    margin-bottom: 0;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 10px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .twitter-follow-button:not(.twitter-follow-button-rendered) {
    background: var(--color-main)
      url(data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2072%2072%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h72v72H0z%22%2F%3E%3Cpath%20class%3D%22icon%22%20fill%3D%22%23fff%22%20d%3D%22M68.812%2015.14c-2.348%201.04-4.87%201.744-7.52%202.06%202.704-1.62%204.78-4.186%205.757-7.243-2.53%201.5-5.33%202.592-8.314%203.176C56.35%2010.59%2052.948%209%2049.182%209c-7.23%200-13.092%205.86-13.092%2013.093%200%201.026.118%202.02.338%202.98C25.543%2024.527%2015.9%2019.318%209.44%2011.396c-1.125%201.936-1.77%204.184-1.77%206.58%200%204.543%202.312%208.552%205.824%2010.9-2.146-.07-4.165-.658-5.93-1.64-.002.056-.002.11-.002.163%200%206.345%204.513%2011.638%2010.504%2012.84-1.1.298-2.256.457-3.45.457-.845%200-1.666-.078-2.464-.23%201.667%205.2%206.5%208.985%2012.23%209.09-4.482%203.51-10.13%205.605-16.26%205.605-1.055%200-2.096-.06-3.122-.184%205.794%203.717%2012.676%205.882%2020.067%205.882%2024.083%200%2037.25-19.95%2037.25-37.25%200-.565-.013-1.133-.038-1.693%202.558-1.847%204.778-4.15%206.532-6.774z%22%2F%3E%3C%2Fsvg%3E)
      no-repeat left 5px center;
    background-size: 20px;
    display: inline-block;
    padding: 7px 10px 7px 30px;
    border-radius: 5px;
    color: var(--color-bg);
    font-size: 0.8em;
    text-decoration: none;
  }
  @include mq($from: tablet) {
    &__list {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
  ul {
    display: table;
    margin: 1em auto;
    @include mq($from: tablet) {
      float: right;
      margin: 0;
    }
    li {
      float: left;
      font-size: 0;
      margin-left: 10px;
      @include mq($from: tablet) {
        margin-left: 5px;
      }
      a {
        background: url($path__img + 'sprite_socials.png') no-repeat top left;
        background-repeat: no-repeat;
        background-position: top left;
        width: 37px;
        height: 37px;
        display: block;
        overflow: hidden;
        border: none;
        text-indent: -100%;
        transition: all ease 0.3s;
        &:hover {
          background-position: left bottom;
        }
      }
      &.fb a {
        background-position: left top;
      }
      &.tw a {
        background-position: -37px top;
        &:hover {
          background-position: -37px bottom;
        }
      }
      &.li a {
        background-position: -(37px * 2) top;
        &:hover {
          background-position: -(37px * 2) bottom;
        }
      }
      &.sk a {
        background-position: -(37px * 4) top;
        &:hover {
          background-position: -(37px * 4) bottom;
        }
      }
      &.rss a {
        background-position: -(37px * 5) top;
        &:hover {
          background-position: -(37px * 5) bottom;
        }
      }
      &.gh a {
        background-position: -(37px * 6) top;
        &:hover {
          background-position: -(37px * 6) bottom;
        }
      }
    }
  }
  .tw-follow {
    p {
      margin: 0.7em 0;
    }
    @include mq($until: tablet) {
      text-align: center;
    }
  }
}
</style>
