<script>
  import Card from "~/components/Card.svelte";
  import CreateCard from "~/components/CreateCard.svelte";
  import ListTitle from "~/components/ListTitle.svelte";

  export let list;
</script>

<div class="list">
  <div class="list__inner">
    <div class="list__heading">
      <ListTitle {list} />
      <p>{list.cards.length}cards</p>
    </div>
    <div class="list__cards">
      {#each list.cards as card (card.id)}
        <Card {card} />
      {/each}
    </div>
    <CreateCard />
  </div>
</div>

<style lang="scss">
  .list {
    width: 290px;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    // 만약 inline이라면 가로, 세로 값을 가질 수 없고
    // block이라면 수직으로 쌓이게 된다.
    // 두 개의 장점을 합친 inline-block으로 지정한다.
    white-space: normal;
    font-size: 16px;
    margin: 0 4px;
    line-height: 20px;

    :global(&.sortable-ghost) {
      position: relative;
      opacity: 0.2;

      &::after {
        // after를 통해 ghost class위에 새로운 무명 클래스를 추가한다.
        // 무명 클래스는 content는 없고 일단, 스타일만 추가한다.
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: black;

        border-radius: 4px;
      }
    }

    :global(&.sortable-chosen) {
      // cursor: move;
      cursor: move;
    }

    .list__inner {
      display: flex;
      flex-direction: column;
      max-height: 100%;
      padding: 10px 8px;
      background-color: #ebecf0;
      border-radius: 4px;
      box-sizing: border-box;
      .list__heading {
        margin-bottom: 10px;
        p {
          color: #5e6c84;
          padding: 0 8px;
        }
      }
      .list__cards {
        border: solid 5px lime;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        margin-bottom: 10px;
      }
    }
  }
</style>
