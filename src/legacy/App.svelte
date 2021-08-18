<div class="list-container">
  <div class="lists">
    <div class="list" />
    <div class="list" />
    <div class="list" />
    <div class="list" />
  </div>

  <div class="create-list" />
</div>

<style>
  .list-container {
    width: 100vw;
    height: 100vh;
    border: 2px red solid;
    box-sizing: border-box;
    font-size: 0;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 30px;
    white-space: nowrap;
  }
  .list-container .lists {
    display: inline-block;
    height: 100%;
    border: 4px orange solid;
    box-sizing: border-box;
    white-space: nowrap;
    /* white-space 줄바꿈 없애는 요소 */
  }

  .list-container .lists .list {
    display: inline-block;
    width: 300px;
    height: 100%;
    border: 6px blue solid;
    font-size: 16px;

    box-sizing: border-box;
  }

  .list-container .create-list {
    display: inline-block;
    height: 50px;
    width: 300px;
    border: 4px yellow solid;
    box-sizing: border-box;
    font-size: 16px;
    vertical-align: top;
  }
</style>
