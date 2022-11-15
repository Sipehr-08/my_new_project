<template>
  <section>
    <div class="flex flex-col md:flex-row items-center justify-between -mt-20 lg:-mt-40">
      <div class="w-full md:basis-1/2 lg:basis-3/5">
        <IllustrationsSignIn />
      </div>
      <div class="w-full md:basis-1/2 lg:basis-2/5">
        <h2 class="mb-10">Сброс пароля</h2>
        <div class="mb-5">
          <label for="email">Введите свой email адрес для восстановления пароля</label>
          <input type="email" name="email" id="email" placeholder="Email" v-model="emailValue" />
          <small v-if="emailError">{{ emailError }}</small>
        </div>
        <div class="mb-5 text-right">
          <router-link to="/auth" class="underline text-primary">Вернуться к входу</router-link>
        </div>
        <button
          class="px-10 w-full mb-10 sm:px-16 py-1 md:py-2 font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary text-white bg-primary transition-all hover:text-primary hover:bg-white"
        >
          Сбросить
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
  import IllustrationsSignIn from '~/components/illustrations/SignIn';
</script>
