import Head from 'next/head';
import React, { useEffect, useState } from 'react';

const useFetch = url => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchHandler = async () => {
    const res = await fetch(url).then(res => res.json());
    setValue(res);
    setLoading(false);
  };
  useEffect(() => {
    fetchHandler();
  }, []);

  return { value, loading };
};

const GruposDropdown = () => {
  const { value: grupos = [] } = useFetch('/api/grupos');
  const [selectedGrupo, setSelectedGrupo] = useState('');
  const distinctGrupos: string[] = Array.from(new Set(grupos?.map(grupo => grupo.grupo)));
  // Cria as opções com JS -> JSX
  const options = distinctGrupos.map(grupo => {
    // `key` is an internal prop used by React when you have an array of components, think of it as the component's unique id within the array
    // The rest is plain JS and JSX
    return (
      <option key={grupo} value={grupo}>
        {grupo}
      </option>
    );
  });

  const osOptions = grupos
    ?.filter(grupo => grupo.grupo === selectedGrupo)
    .map(grupo => {
      return (
        <option key={grupo.os} value={grupo.os}>
          {grupo.os}
        </option>
      );
    });

  return (
    <>
      <p>Grupos</p>
      <select
        value={selectedGrupo}
        onChange={event => {
          setSelectedGrupo(event.target.value);
        }}
        name="grupos"
      >
        <option value="" disabled>
          - please select -
        </option>
        {options}
      </select>
      {osOptions?.length > 0 ? (
        <>
          <p>OS</p>
          <select name="OS" id="OS">
            {osOptions}
          </select>
        </>
      ) : null}
    </>
  );
};

const Home: React.FC = () => {
  const { value: produtos = [] } = useFetch('/api/produtos');
  const { value: cadastros = [] } = useFetch('/api/cadastros');

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Welcome to our App!</h1>
        <p>Please see some of the data we load below</p>
        <GruposDropdown />
        <p>Produtos</p>
        <pre>{JSON.stringify(produtos, null, 2)}</pre>

        <p>Cadastros</p>
        <pre>{JSON.stringify(cadastros, null, 2)}</pre>
      </main>
    </div>
  );
};

export default Home;
