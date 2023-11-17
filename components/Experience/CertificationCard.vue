<template>
  <div class="jobs">
    <img
      v-lazy-load
      :data-src="blok.badge.filename"
      src="/images/default-image.jpg"
      :alt="$t('education.certification.logoTitle', { certification: blok.title })"
      width="128"
      height="228"
    />
    <strong class="item__title">
      <a
        :title="$t('education.certification.linkTitle', { certification: blok.title })"
        :href="blok.certification_url.url"
        target="_blank"
        rel="noopener"
      >
        {{ $t('education.certification.title', { certification: blok.title }) }}
      </a>
    </strong>
    {{ $t('misc.at') }}
    <em itemscope itemtype="http://schema.org/Organization">
      <span itemprop="name">
        <a :href="blok.institution_url.url" target="_blank" :title="blok.institution" rel="noopener">{{ blok.institution }}</a> </span
      >, <span itemprop="address">{{ blok.city }}</span> - {{ releasedAt }}{{ expiredAt }}
    </em>
  </div>
</template>

<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true,
    },
  },
  computed: {
    releasedAt() {
      return new Date(this.blok.released_at).getFullYear()
    },
    expiredAt() {
      return this.blok.expired_at ? `/${new Date(this.blok.expired_at).getFullYear()}` : ''
    },
  },
}
</script>
