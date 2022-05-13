import { h } from 'vue';

const PaginationItemsCount = props => {
  return h('div', { class: 'inline-block' }, [
    h('span', { class: 'text-gray-500' }, props.itemsMeta.from),
    h('span', { class: 'text-gray-500 mx-1' }, '–'),
    h('span', { class: 'text-gray-500' }, props.itemsMeta.to),
    h('span', { class: 'text-gray-500 mx-1' }, 'из'),
    h('span', { class: 'text-gray-500' }, props.itemsMeta.total),
  ]);
};

PaginationItemsCount.props = {
  itemsMeta: { type: Object, required: true },
};

export default PaginationItemsCount;
