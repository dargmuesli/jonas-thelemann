<template>
  <div
    style="
      /* stylelint-disable plugin/no-unsupported-browser-features */
      background: linear-gradient(to bottom, #dbf4ff, #fff1f1);
      display: flex;
      height: 100%;
      width: 100%;
    "
  >
    <img
      alt="Jonas in Tutzing."
      src="/assets/static/images/tutzing.jpg"
      width="436"
      height="630"
    />
    <span
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 64px;
      "
    >
      <h1 style="font-size: 72px; line-height: 1">{{ title }}</h1>
      <div
        style="
          color: rgb(75 85 99);
          font-size: 30px;
          line-height: 36px;
          margin-top: 64px;
        "
      >
        {{ description }}
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  description: string
  title: string
}
withDefaults(defineProps<Props>(), {})
</script>

<script lang="ts">
export default {
  name: 'OgImage',
}
</script>
