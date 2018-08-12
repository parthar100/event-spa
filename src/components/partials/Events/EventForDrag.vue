<template>
  <div style="float:left; width: 130px;">
    Drag
  </div>
</template>

<script>
export default {
  name: 'EventForDrag',
  props: {
    index: {required: true, type: Number, default: 0},
    events: {required: true, type: Object, default: () => {}}
  }
}
</script>
