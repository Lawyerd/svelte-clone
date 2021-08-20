<script>
  import { tick } from "svelte";

  import { autoFocusout } from "~/actions/autoFocusout";
  export let card;
  let isEditMode = false;
  let textareaEl;
  let title = card.title;

  function saveCard() {
    offEditMode();
  }

  function removeCard() {
    offEditMode();
  }
  async function onEditMode() {
    isEditMode = true;
    await tick();
    textareaEl && textareaEl.focus();
  }
  function offEditMode() {
    isEditMode = false;
  }
</script>

<div class="card" use:autoFocusout={offEditMode}>
  {#if isEditMode}
    <div
      class="edit-mode"
      on:keydown={e => {
        e.key === "Enter" && saveCard();
        e.key === "Escape" && offEditMode();
        e.key === "Esc" && offEditMode();
      }}
    >
      <textarea
        bind:this={textareaEl}
        bind:value={title}
        placeholder="Enter title..."
      />
      <div class="action">
        <div class="btn success" on:click={saveCard}>Rename</div>
        <div class="btn" on:click={offEditMode}>Cancel</div>
        <div class="btn danger" on:click={removeCard}>Delete</div>
      </div>
    </div>
  {:else}
    <div class="title">
      {card.title}
      <div class="btn small" on:click={onEditMode}>Edit</div>
    </div>
  {/if}
</div>

<style lang="scss">
  .card {
    // font-weight: 400;
    // line-height: 2px;
    margin-bottom: 8px;
    &:last-child {
      margin-bottom: 1px;
    }

    .title {
      padding: 6px 8px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      line-height: 20px;
      position: relative;
      &:hover {
        background: #f5f5f5;
      }
      .btn {
        position: absolute;
        display: none;
        top: 6px;
        right: 8px;
      }
      &:hover .btn {
        display: block;
      }
    }
  }
</style>
