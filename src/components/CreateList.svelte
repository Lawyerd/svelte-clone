<script>
  import List from "./List.svelte";
</script>

<div class="create-list">Add another List</div>

<style lang="scss">
  .create-list {
    white-space: normal;
    font-size: 16px;
    width: 290px;
    display: inline-block;
    padding: 10px 8px;
    vertical-align: top;
    background-color: rgba(#ebecf0, 0.6);
    border-radius: 4px;
    margin: 0 4px;
    line-height: 20px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      // & : 현재 위치하고 있는 클래스를 의미한다.
      background-color: rgba(#ebecf0, 1);
    }
  }
</style>
