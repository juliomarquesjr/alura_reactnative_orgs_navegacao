import React, {useEffect, useState} from 'react';
import {FlatList, Text, StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Produtor from './componentes/Produtor';
import Topo from './componentes/Topo';
import useProdutores from '../../hooks/useProdutores';
import useTextos from '../../hooks/useTextos';

const Produtores = ({melhoresProdutores}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [exibeMensagem, setExibemensage] = useState(false);

  const lista = useProdutores(melhoresProdutores);

  const {tituloProdutores, mensagemCompra} = useTextos();
  const nomeCompra = route.params?.compra.nome;
  const timestampCompra = route.params?.compra.timestamp;
  const mensagemCompleta = mensagemCompra?.replace('$NOME', nomeCompra);

  useEffect(() => {
    setExibemensage(!!nomeCompra);
    let timeout;

    if (nomeCompra) {
      timeout = setTimeout(() => {
        setExibemensage(false);
      }, 3000);
    }
  }, [timestampCompra]);

  const TopoLista = () => {
    return (
      <React.Fragment>
        <Topo melhoresProdutores={melhoresProdutores} />
        {!!exibeMensagem && (
          <Text style={estilos.compra}>{mensagemCompleta}</Text>
        )}
        <Text style={estilos.titulo}>{tituloProdutores}</Text>
      </React.Fragment>
    );
  };

  return (
    <FlatList
      data={lista}
      renderItem={({item}) => (
        <Produtor
          {...item}
          aoPressionar={() => {
            navigation.navigate('Produtor', item);
          }}
        />
      )}
      keyExtractor={({nome}) => nome}
      ListHeaderComponent={TopoLista}
      style={estilos.lista}
    />
  );
};

const estilos = StyleSheet.create({
  lista: {
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    lineHeight: 32,
    marginHorizontal: 16,
    marginTop: 16,
    fontWeight: 'bold',
    color: '#464646',
  },

  compra: {
    backgroundColor: '#EAF5F3',
    padding: 16,
    color: '#464646',
    fontSize: 16,
    lineHeight: 26,
  },
});
export default Produtores;