import { Directive, DirectiveBinding } from 'vue';

/**
 * Custom directive
 * @param {object} - { textValue: text, query: searchtext}
 * @example - v-highlight-text="{ textValue:text, query: searchText"
 */
export function searchFilter(): { bind(el: HTMLElement, binding: DirectiveBinding): void } {
  return {
    bind(el: HTMLElement, binding: DirectiveBinding) {
      if (!binding.value.query) {
        el.innerHTML = binding.value.textValue;
      }
      el.innerHTML = binding.value.textValue
        .toString()
        .replace(new RegExp(binding.value.query, 'gi'), (match: string): string => {
          return '<span class="text-indigo-500">' + match + '</span>';
        });
    },
  };
}
