import React from 'react';
import Stack from '@material-ui/core/Stack';
import { styled, useTheme } from '@material-ui/core';
// This is the css util exported in @emotion/react
import { css } from '@material-ui/system';
import { createUseClassNamesFactory } from 'tss-react/createUseClassNamesFactory';

// @ts-ignore Fix me, typings are off
const { createUseClassNames } = createUseClassNamesFactory({ useTheme, css });

const Div = styled('div')({
  border: "1px solid transparent",
  padding: '10px',
  fontSize: '20px',
  borderRadius: '5px',
  background: 'darkgreen',
  color: 'white',
});

const { useClassNames } = createUseClassNames()(
  () => ({
    root: {
      background: 'darkred'
    },
  })
);

// Maybe we should in addition support this API (without callback)
// const { useClassNames } = createUseClassNames()({
//   root: {
//     background: 'red'
//   }, 
// });

export default function Home() {
  // Should we make the argument optional?
  const { classNames } = useClassNames({});

  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
      <Div>This div should have green background</Div>
      {/* @ts-ignore We should NOT use the `css` prop here. Not sure there are other options...  */}
      <Div css={classNames.root}>This div should have red background</Div>
    </Stack>
  )
}
