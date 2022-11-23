<script>
  export default {
    props: {
      show: Boolean,
    },
  };
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div @click.self="$emit('close')" class="modal-wrapper">
        <div class="modal-container lg:w-1/3">
          <div class="modal-header -mt-3 -ml-2 flex justify-between">
            <slot name="header"></slot>
            <h4 class="ml-2 cursor-pointer" @click="$emit('close')">&#10006;</h4>
          </div>

          <div class="modal-body">
            <slot name="body"></slot>
          </div>

          <div class="modal-footer h-8">
            <slot name="footer">
              <button
                @click="$emit('close')"
                class="modal-default-button px-4 w-full md:w-auto text-white font-semibold text-lg sm:text-xl rounded-xl border border-primary bg-primary transition-all hover:text-primary hover:bg-white"
              >
                Понятно
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
  }

  .modal-header h3 {
    margin-top: 0;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

  .modal-enter-from {
    opacity: 0;
  }

  .modal-leave-to {
    opacity: 0;
  }

  .modal-enter-from .modal-container,
  .modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
