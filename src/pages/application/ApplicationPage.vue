<template>
  <section>
    <h1 class="mb-4 md:mb-10 lg:mb-0 text-center">Форма заявления на справку</h1>
    <div class="flex flex-col md:flex-row items-center justify-between">
      <div class="w-full md:basis-1/2 lg:basis-3/5 self-baseline">
        <IllustrationsForms />
      </div>
      <div class="w-full md:basis-1/2 lg:basis-2/5 self-stretch mt-0 lg:mt-32">
        <div class="inputs-wrapper md:h-96 md:pr-5 md:mb-10 md:overflow-y-auto">
          <div class="mb-4">
            <label>Ваше имя</label>
            <input
              :style="isSubmitted && !userData.name ? 'border-color: red' : ''"
              type="text"
              name="name"
              id="name"
              placeholder="Имя"
              v-model="userData.name"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.name">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label>Ваша фамилия</label>
            <input
              :style="isSubmitted && !userData.surname ? 'border-color: red' : ''"
              type="text"
              name="surname"
              id="surname"
              placeholder="Фамилия"
              v-model="userData.surname"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.surname">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label>Ваш телефон</label>
            <input
              :style="isSubmitted && !userData.phone_number ? 'border-color: red' : ''"
              type="tel"
              name="tel"
              id="tel"
              placeholder="Телафон"
              v-model="userData.phone_number"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.phone_number">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label>Ваша эл.почта</label>
            <input
              :style="isSubmitted && !userData.email ? 'border-color: red' : ''"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              v-model="userData.email"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.email">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label for="borndate">Дата вашего рождения</label>
            <input
              :style="isSubmitted && !userData.birth_date ? 'border-color: red' : ''"
              type="date"
              name="borndate"
              id="borndate"
              v-model="userData.birth_date"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.birth_date">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label>Адрес вашей прописки</label>
            <input
              :style="isSubmitted && !userData.residential_address ? 'border-color: red' : ''"
              type="text"
              name="adress"
              id="adress"
              placeholder="Адрес"
              v-model="userData.residential_address"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.residential_address">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-10">
            <label>Ваш индивидуальный номер налогоплательщика</label>x
            <input
              :style="isSubmitted && !userData.inn ? 'border-color: red' : ''"
              type="text"
              name="itn"
              id="itn"
              placeholder="ИНН"
              v-model="userData.inn"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.inn">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label class="block mb-3" for="application">
              Прикрепите фотографию заполненной анекты по
              <a href="#" class="underline text-primary">бланку</a>
            </label>
            <input
              v-if="!hideInput"
              type="file"
              accept="image/*"
              name="application"
              id="application"
              @change="onFileChange"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.application">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label class="block mb-3" for="selfie">
              Сделайте селфи с лицевой стороной вашего паспорта и прикрепите фотографию
            </label>
            <input v-if="!hideInput" type="file" accept="image/*" name="selfie" id="selfie" @change="onFileChange" />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.passport_selfie">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label class="block mb-3"> Прикрепите фотографию лицевой стороны вашего паспорта </label>
            <input
              v-if="!hideInput"
              type="file"
              accept="image/*"
              name="passport"
              id="passport"
              @change="onFileChange"
            />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.passport_front">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label class="block mb-3"> Прикрепите фотографию лицевой стороны вашего паспорта </label>
            <input v-if="!hideInput" type="file" accept="image/*" name="back" id="passport" @change="onFileChange" />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.passport_back">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-10">
            <label class="block mb-3" for="check"> Прикрепите фотографию чека оплаты справки от Амонатбонка </label>
            <input v-if="!hideInput" type="file" accept="image/*" name="check" id="check" @change="onFileChange" />
            <small class="text-red-500 block" v-if="isSubmitted && !userData.payment_receipt">
              Поле обязательно для заполнение
            </small>
          </div>
          <div class="mb-4">
            <label for="labguage">Выберите язык текста справки</label>
            <select name="language" id="language" v-model="userData.reference_language">
              <option value="tajik">На таджикском</option>
              <option value="russian">На русском</option>
            </select>
            <small class="text-red-500 block" v-if="isSubmitted && !userData.reference_language">
              Поле обязательно для заполнение
            </small>
          </div>

          <div class="mb-10 md:mb-4">
            <label for="urgency"> Выберите Cрочность получения справки (по квитанции от Амонатбонка) </label>
            <select name="urgency" id="urgency" v-model="userData.reference_tariff">
              <option value="usual">Обычный - до 10 дней (20 сомон)</option>
              <option value="urgent">Срочный - до 3 дней (40 сомон)</option>
            </select>
            <small class="text-red-500 block" v-if="isSubmitted && !userData.reference_tariff">
              Поле обязательно для заполнение
            </small>
          </div>
        </div>

        <div class="mb-3">
          <div class="flex items-center">
            <input type="checkbox" name="agreement" id="agreement" class="w-5 h-5 mr-3" v-model="agreement" />
            <label for="agreement">
              Я согласен с <a href="#" class="underline text-primary">условиями обработки</a> моих данных
            </label>
          </div>
        </div>
        <button
          @click="createApplication"
          :disabled="!agreement || loading"
          class="px-10 flex justify-center items-center w-full mb-10 sm:px-16 py-1 md:py-2 text-white font-semibold text-lg sm:text-xl border-2 rounded-xl border-primary bg-primary transition-all hover:text-primary hover:bg-white disabled:pointer-events-none disabled:opacity-50"
        >
          <img v-show="loading" class="w-8 -my-4 -ml-10 mr-2" src="../../assets/spinner.gif" alt="" />
          Отправить
        </button>
      </div>
    </div>
  </section>
</template>
<script setup>
  import IllustrationsForms from '@/components/illustrations/ApplicationForms';
  import { createApplicationRequest } from '@/services/app.api';
  import { useRouter } from 'vue-router';
  import { onMounted, ref } from 'vue';
  import { useToast } from 'vue-toastification';
  const toast = useToast();
  const router = useRouter();
  const agreement = ref(false);
  const loading = ref(false);
  const hideInput = ref(false);
  const isSubmitted = ref(false);
  onMounted(() => {
    window.scrollTo(0, 0);
  });
  let userData = ref({
    name: '',
    surname: '',
    phone_number: '',
    email: '',
    birth_date: '',
    residential_address: '',
    inn: '',
    reference_language: '',
    reference_tariff: '',
    passport_front: '',
    passport_back: '',
    application: '',
    passport_selfie: '',
    payment_receipt: '',
  });

  const checkValues = () => {
    for (let i in userData.value) {
      if (!userData.value[i]) return false;
    }
    return true;
  };

  const createApplication = () => {
    isSubmitted.value = true;
    if (!checkValues()) {
      return;
    }
    const json = {
      name: userData.value.name,
      surname: userData.value.surname,
      phone_number: userData.value.phone_number,
      email: userData.value.email,
      birth_date: userData.value.birth_date,
      residential_address: userData.value.residential_address,
      inn: userData.value.inn,
      reference_language: userData.value.reference_language,
      reference_tariff: userData.value.reference_tariff,
    };
    const user = {
      json: JSON.stringify(json),
      passport_front: userData.value.passport_front,
      passport_back: userData.value.passport_back,
      application: userData.value.application,
      passport_selfie: userData.value.passport_selfie,
      payment_receipt: userData.value.payment_receipt,
    };
    loading.value = true;
    const formData = new FormData();
    for (let i in user) {
      formData.append(i, user[i]);
    }
    createApplicationRequest(formData)
      .then(() => {
        toast.success('Ваша заявка успешно принято', {
          timeout: 3000,
        });
        clear();
      })
      .finally(() => {
        loading.value = false;
      });
  };

  const onFileChange = event => {
    const inputName = event.target.name;
    if (!event.target.files?.length) {
      return;
    }
    const inputValue = event.target?.files[event.target?.files?.length - 1];

    switch (inputName) {
      case 'application':
        userData.value.application = inputValue;
        break;
      case 'passport':
        userData.value.passport_front = inputValue;
        break;
      case 'selfie':
        userData.value.passport_selfie = inputValue;
        break;
      case 'back':
        userData.value.passport_back = inputValue;
        break;
      case 'check':
        userData.value.payment_receipt = inputValue;
        break;
      default:
        break;
    }
  };
  const clear = () => {
    router.push({ name: 'home' });
    isSubmitted.value = false;
    userData.value = {
      name: '',
      surname: '',
      phone_number: '',
      email: '',
      birth_date: '',
      residential_address: '',
      inn: '',
      reference_language: '',
      reference_tariff: '',
      passport_front: '',
      passport_back: '',
      application: '',
      passport_selfie: '',
      payment_receipt: '',
    };
  };
</script>
