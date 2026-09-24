<script setup>
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();
</script>

<template>
  <div :class="locale === 'kh' || locale === 'KH' ? 'font-lang-kh' : 'font-lang-default'"> -->
    <router-view />
  </div>
</template>
