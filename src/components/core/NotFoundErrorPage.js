import { h } from 'vue';

import AtNotFoundPage from '~/plugins/aliftech-ui/components/AtNotFoundPage/AtNotFoundPage';

const NotFoundError = () => {
  return h(AtNotFoundPage, {
    title: 'Айни хол Сипехр аз пайи сохтани ин сахифа аст',
    description: 'То сохта шуданша дига ба ин сахифа нагузаред',
    color: 'primary',
  });
};

export default NotFoundError;