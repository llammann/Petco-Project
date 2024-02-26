import { Helmet } from 'react-helmet-async';

import { DogView } from 'src/sections/dogs/view';

// ----------------------------------------------------------------------

export default function DogsPage() {
  return (
    <>
      <Helmet>
        <title>Dogs</title>
      </Helmet>

      <DogView />
    </>
  );
}
