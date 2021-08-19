<script>
  //   import List from "./List.svelte";
  import List from "~/components/List.svelte";
  import CreateList from "~/components/CreateList.svelte";
  import { lists } from "~/store/list";
</script>

<div class="list-container">
  <div class="lists">
    {#each $lists as { id, title, cards } (id)}
      <List {title} {id} {cards} />
    {/each}
  </div>
  <CreateList />
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
    font-size: 0;
    white-space: nowrap;
    // font와 관련된 속성은 상속된다.
    // white-space도 폰트와 관련된다. 따라서 상속된다.
    .lists {
      display: inline-block;
      // 원래는 diplay : block이라 일정한 width를 가졌었다.
      height: 100%;
      border: 5px solid blue;
      box-sizing: border-box;
    }
  }
</style>
