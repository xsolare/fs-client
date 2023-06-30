import type { Options } from 'unplugin-auto-import/types'

export const configAutoImport = {
  include: [/\.(store\.)?[tj]sx?$/],
  imports: [
    'react',
    'react-router-dom',
    'mobx',
    'mobx-react-lite',
    {
      uuid: ['v4']
    },
    {
      '@nord-clan/loc-track-ui-kit': [
        'generateTransform',
        'errorValueResult',
        'clampValue',
        'deepCopy',
        'shadeColor',
        'arePointsEqual',
        'isSuccess',
        'isBoolean',
        'isError',
        'setController',
        'useNewStore',
        'successValueResult',
        'addPoints',
        'subtractPoints',
        'multiplyPoint',
        'useEventListener',
        'useOutsideClick',
        'useResizeAction',
        'useIsomorphicLayoutEffect',
        'useStyling',
        'useNotifyRef',
        'Tooltip',
        'Modal'
      ],
      axios: [['default', 'axios']],
      '@emotion/styled': [['default', 'styled']]
    },
    {
      from: 'axios',
      imports: ['AxiosInstance', 'AxiosResponse'],
      type: true
    }
  ],
  dirs: ['./src/store/', './src/store/common', './src/utils/', './src/utils/graphql/'],
  dts: './src/types/auto-imports.d.ts'
} as Options
