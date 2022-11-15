import { h } from 'vue';

const BaseSpinner = (props, context) => {
  const classList = [
    context?.data?.class ?? '',
    context?.data?.staticClass ?? '',
    'absolute',
    'z-50',
    'left-0',
    'top-0',
    'right-0',
    'bottom-0',
  ];
  return h(
    'div',
    {
      ...context.data,
      class: classList,
      style: 'background-color:rgba(255,255,255,0.75)',
    },
    [
      h(
        'svg',
        {
          attrs: {
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            width: '200px',
            height: '200px',
            viewBox: '0 0 100 100',
            preserveAspectRatio: 'xMidYMid',
          },
          class: 'absolute',
          style: 'top:50%;left:50%;transform:translate(-50%,-50%)',
        },
        [
          h(
            'circle',
            {
              attrs: {
                cx: '50',
                cy: '50',
                fill: 'none',
                stroke: '#3182ce',
                'stroke-width': '2',
                r: '10',
                'stroke-dasharray': '47.12388980384689 17.707963267948966',
              },
            },
            [
              h('animateTransform', {
                attrs: {
                  attributeName: 'transform',
                  type: 'rotate',
                  repeatCount: 'indefinite',
                  dur: '1s',
                  values: '0 50 50;360 50 50',
                  keyTimes: '0;1',
                },
              }),
            ]
          ),
        ]
      ),
    ]
  );
};

export default BaseSpinner;
