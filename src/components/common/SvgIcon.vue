<template>
  <svg>
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      require: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    }
  }
}
</script>
