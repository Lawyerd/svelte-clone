<script>
  //   import List from "./List.svelte";
  import List from "~/components/List.svelte";
</script>

<div class="list-container">
  <div class="lists">
    <!-- <div class="list"></div> -->
    <List />
  </div>
  <!-- <div class="create-list"></div> -->
</div>

<style lang="scss">
  .list-container {
    width: 100vw;
    height: calc(100vh - 40px);
    border: 10px solid red;
    padding: 30px;
    box-sizing: border-box;
    overflow-x: auto;
    overflow-y: hidden;
    .lists {
      height: 100%;
      border: 5px solid blue;
      box-sizing: border-box;
    }
  }
</style>
