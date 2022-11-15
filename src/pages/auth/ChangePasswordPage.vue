<template>
  <section>
    <div class="flex flex-col md:flex-row items-center justify-between -mt-20 lg:-mt-40">
      ">
      <div class="w-full md:basis-1/2 lg:basis-3/5">
        <IllustrationsSignIn />
      </div>
      <div class="w-full md:basis-1/2 lg:basis-2/5">
        <h2 class="mb-10">Новый пароль</h2>
        <div class="mb-5">
          <label for="password">Новый пароль</label>
          <input type="password" name="password" id="password" placeholder="Пароль" v-model="passwordValue" />
          <small v-if="passwordError">{{ passwordError }}</small>
        </div>
        <div class="mb-5">
          <label for="confirm">Подтвердите пароль</label>
          <input type="password" name="confirm" id="confirm" placeholder="Пароль" v-model="confirmValue" />
          <small v-if="confirmError">{{ confirmError }}</small>
        </div>
        <div class="mb-5 text-right">
          <router-link to="/auth" class="underline text-primary">Вернуться к входу</router-link>
        </div>
        <button
          class="px-10 w-full mb-10 sm:px-16 py-1 md:py-2 font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary text-white bg-primary transition-all hover:text-primary hover:bg-white"
        >
          Сохранить
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
  import IllustrationsSignIn from '~/components/illustrations/SignIn';
</script>
