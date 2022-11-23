<script setup>
  import { ChevronDoubleRightIcon } from '@heroicons/vue/solid';
  import IllustrationsLawFirm from '~/components/illustrations/LawFirm';
  import IllustrationsFillOut from '~/components/illustrations/FillOut';
  import IllustrationsProcess from '@/components/illustrations/ProcessIn';
  import { onMounted, ref } from 'vue';
  onMounted(() => {
    window.scrollTo(0, 0);
  });

  const requirePlaces = ref([
    {
      id: Date.now(),
      text: 'для трудоустройства или получения лицензии в некоторых сферах деятельности (госслужба, медицина, педагогика, операции с ценными бумагами)',
    },
    { id: Date.now(), text: 'для получения вида на жительство или иностранного гражданства' },
    { id: Date.now(), text: 'для разрешения на оружие' },
    { id: Date.now(), text: 'а также для усыновления, удочерения детей' },
  ]);

  const process = ref([
    {
      id: Date.now(),
      order: 1,
      title: 'Оплата справки в банке',
      description:
        'Оплату можно воспроизвести в Амонатбонке и далее с чеком подойти в районный МВД. Также, при оплате нужно уточнить срочность получения',
    },
    {
      id: Date.now(),
      order: 2,
      title: 'Заполнить анкеты в МВД',
      description: 'В МВД вашего района нужно предъявить чек и далее заполнить анкету. Образец можно посмотреть тут',
    },
    {
      id: Date.now(),
      order: 3,
      title: 'Дополнительные уточнения',
      description: 'К дополнительным опциям можно отнести следущее: справка по договоренности; язык документа',
    },
  ]);
</script>
<template>
  <div>
    <section class="flex flex-col-reverse md:flex-row items-center justify-between mb-20">
      <div class="w-full md:basis-1/2 lg:basis-1/3 md:mr-5 lg:mr-0">
        <h1 class="mb-3 md:mb-5">Справка не выходя из дома</h1>
        <p class="mb-7 md:mb-10">
          <strong class="text-primary">Судимости<span class="text-dark">.нет</span></strong> - это платформа с помощью
          которой вы можете получить справку об отсутствии судимости. Просто оставьте заявку заполнив форму своими
          данными!
        </p>

        <router-link to="/application">
          <button
            class="px-10 w-full mb-10 sm:px-16 py-1 md:py-2 font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary text-white bg-primary transition-all hover:text-primary hover:bg-white"
          >
            Нужна справка
          </button>
        </router-link>
      </div>
      <div class="w-full basis-1/2 mb-5 md:mb-0 lg:-mt-20">
        <IllustrationsLawFirm />
      </div>
    </section>
    <section class="mb-20">
      <h1 class="mb-10 text-center">О справке</h1>

      <div class="flex flex-col md:flex-row items-center justify-between">
        <div class="w-full md:basis-1/2 md:mr-5 lg:mr-0 mb-5 md:mb-0">
          <IllustrationsFillOut />
        </div>
        <div class="w-full md:basis-1/2 lg:basis-1/3">
          <h2 class="mb-5 md:mb-7">Что за справка?</h2>
          <p class="mb-3 md:mb-5">
            <strong>Справка об отсутствии <i>(наличии)</i> судимости</strong> — документ <i>(справка)</i>, который
            подтверждает отсутствие <i>(наличие)</i> судимости гражданина. Данный документ может потребоваться:
          </p>
          <ul>
            <li v-for="{ id, text } in requirePlaces" :key="id" class="flex items-center mb-2 md:mb-4 last:mb-0">
              <span class="inline-block mr-1 md:mr-3">
                <ChevronDoubleRightIcon class="w-6 text-dark" />
              </span>
              {{ text }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section class="mb-20">
      <h1 class="mb-10 text-center">Как получить?</h1>

      <div class="flex flex-col-reverse md:flex-row items-center justify-between">
        <div class="w-full md:basis-1/2 lg:basis-1/3 md:mr-5 lg:mr-0">
          <h2 class="mb-5 md:mb-8">Процесс выглядит так:</h2>
          <ul>
            <li v-for="{ id, order, title, description } in process" :key="id" class="flex mb-3 md:mb-6 last:mb-0">
              <span class="text-4xl lg:text-5xl mr-3 md:mr-6 font-bold text-primary">
                {{ order }}
              </span>
              <span>
                <strong class="block">{{ title }}</strong>
                <small>{{ description }}</small>
              </span>
            </li>
          </ul>
        </div>
        <div class="w-full md:basis-1/2 mb-5 md:mb-0">
          <IllustrationsProcess />
        </div>
      </div>
    </section>
    <section class="mb-20 text-center">
      <h1 class="mb-4 md:mb-8">Оставить заявку</h1>
      <div class="md:w-1/2 mx-auto">
        <p class="mb-5 md:mb-10 text-xl md:text-2xl">
          Кликните на кнопку ниже, чтобы перейти к заполнению формы для получения справки. Вы поулчите ответ в
          кратчайшие сроки!
        </p>

        <router-link to="/application" class="w-full">
          <button
            class="px-10 w-full mb-10 sm:px-16 py-1 md:py-2 font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary text-white bg-primary transition-all hover:text-primary hover:bg-white"
          >
            К форме
          </button>
        </router-link>
      </div>
    </section>
  </div>
</template>
