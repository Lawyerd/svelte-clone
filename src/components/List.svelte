<script>
  export let title;
</script>

<div class="list">{title}</div>

<style lang="scss">
  .list {
    width: 290px;
    height: 100%;
    border: yellow 4px solid;
    box-sizing: border-box;
    display: inline-block;
    // 만약 inline이라면 가로, 세로 값을 가질 수 없고
    // block이라면 수직으로 쌓이게 된다.
    // 두 개의 장점을 합친 inline-block으로 지정한다.
    white-space: normal;
    font-size: 16px;
    margin: 0 4px;
  }
</style>
