import React from 'react';
import { styled, useTheme } from '@material-ui/core';
import { createUseClassNamesFactory } from 'tss-react';

const { createUseClassNames } = createUseClassNamesFactory({ useTheme });

const Div = styled('div')({
  background: 'green',
  color: 'white',
});

const { useClassNames } = createUseClassNames()(
  () => ({
    root: {
      color: 'lightgreen'
    },
  })
);

// Maybe also support this API
// const { useClassNames } = createUseClassNames()({
//   root: {
//     color: 'lightgreen'
//   }, 
// });

export default function Home() {
  // Optional argument on `useClassNames`?
  const { classNames } = useClassNames({});

  return (
    <React.Fragment>
      <Div>This div should have white color</Div>
      <Div className={classNames.root}>This div should have lightgreen color</Div>
    </React.Fragment>
  )
}
