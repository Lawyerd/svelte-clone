<script>
  import { tick } from "svelte";

  import { lists } from "~/store/list";
  // lists.add({
  //   title: "Heropy!",
  // });
  let isEditMode = false;
  let title = "";
  let textareaEl;

  function addList() {
    if (title.trim()) {
      lists.add({
        // 우리가 만든 커스텀 스토어를 사용한다.

        title,
      });
    }
    offEditMode();
  }

  async function onEditMode() {
    isEditMode = true;
    // 데이터가 바뀐다고 화면이 갱신되는 것을 보장하는 것은 아니다.
    // 갱신될 때까지 기다리자
    await tick();
    textareaEl && textareaEl.focus();
    // textareaEl가 있으면 focus한다.
  }

  function offEditMode() {
    isEditMode = false;
    title = "";
  }
</script>

<div class="create-list">
  {#if isEditMode}
    <div class="edit-mode">
      <textarea
        bind:value={title}
        bind:this={textareaEl}
        placeholder="Enter a title for this list..."
        on:keydown={e => {
          e.key === "Enter" && addList();
          e.key === "Escape" && offEditMode();
          e.key === "Esc" && offEditMode();
          // 브라우저마다 esc나 Escape가 혼용된다.
        }}
      />
      <div class="actions">
        <div class="btn success" on:click={addList}>Add List</div>
        <div class="btn" on:click={offEditMode}>Cancel</div>
      </div>
    </div>
  {:else}
    <div class="add-another-list" on:click={onEditMode}>+ Add another List</div>
  {/if}
</div>

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
